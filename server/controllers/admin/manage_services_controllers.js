const axios = require("axios");
const { File } = require("../../models/file/file");
const { Readable } = require('stream');
const httpStatus = require('http-status')
const { bucket } = require('../../server');
const { saveFile } = require('../../utils/saveFile');
const { Admin } = require('../../models/admin/admin');
const { Categorie, validationCategorie } = require("../../models/categorie/categorie");
const { validationTypeService, TypeService } = require("../../models/typeService/typeService");
const { countriesGiveSms, platformsGiveSms } = require("../../utils/countryGiveSms");
const { validationProduct, Product } = require("../../models/products/product");
const { default: mongoose } = require("mongoose");
const { validationGroupMoney, GroupMoney } = require("../../models/groupMoney/groupMoney");
const { saveNotification } = require("../../utils/constants");
const { Api } = require("../../models/api/api");

exports.addCategorie = async (req, res) => {
    const admin = req.admin;
    const { file } = req;
    const { nameAr, nameEn, idService, show } = req.body;
    try {
        let newFile
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket);
        }
        const { error } = validationCategorie({ ...req.body, image: newFile._id.toString() });
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message
            });
        }
        const categorie = new Categorie({
            nameAr: nameAr,
            nameEn: nameEn,
            idService,
            show,
            image: newFile._id,
            createdBy: admin._id,
        });
        await categorie.save();

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بانشاء فئة جديدة (${nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true)

        res.status(httpStatus.OK).send({
            msg: "تم انشاء الفئة بنجاح",
            categorie,
            contentNotification: content
        })
    } catch (err) {
        console.log(err)
        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            // Handle duplicate key error specifically for nameAr field
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذه الفئة موجودة بالفعل",
                error: err.message
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.updateCategorie = async (req, res) => {
    const admin = req.admin;
    const { _id, nameAr, nameEn, idService, show } = req.body;
    const { file } = req;
    try {
        let newFile
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket);
        }
        const categorie = await Categorie.findById(_id);
        categorie.nameAr = nameAr;
        categorie.nameEn = nameEn;
        categorie.idService = idService;
        categorie.show = show;
        if (newFile && categorie.image) {
            try {
                // Ensure the bucket targets the correct collection
                const findFile = await File.findById(categorie.image);
                await bucket.delete(findFile.id);
            } catch (deleteError) {
                console.log(deleteError)
                console.error('Error while deleting file from GridFS:', deleteError.message);
            }
        }

        if (newFile) categorie.image = newFile._id;

        await categorie.save()

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بتحديث  فئة  (${nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true)

        res.status(httpStatus.OK).send({
            msg: "تم تحديث الفئة بنجاح",
            categorie,
            contentNotification: content
        })
    } catch (err) {
        console.log(err)
        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            // Handle duplicate key error specifically for nameAr field
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذه نوع الفئة موجودة بالفعل",
                error: err.message
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.deleteCategorie = async (req, res) => {
    const admin = req.admin;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.BAD_REQUEST).json({ msg: "Invalid service ID" });
    }

    try {
        // Mark the TypeService as deleted
        const categorie = await Categorie.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!categorie) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: "categorie not found" });
        }

        // Mark related products as deleted
        await Product.updateMany({ idCategorie: id }, { isDeleted: true });

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بحذف فئة (${categorie.nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true)


        res.status(httpStatus.OK).json({
            msg: "تم الحذف بنجاح",
            contentNotification: content
        });
    } catch (err) {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.getCategories = async (req, res) => {
    const { type, query } = req.query;
    console.log(query)
    try {
        const searchCondition = query
            ? {
                isDeleted: false,
                $or: [
                    { nameAr: { $regex: query, $options: "i" } }, // Case-insensitive search
                    { nameEn: { $regex: query, $options: "i" } },
                    { id: { $regex: query, $options: "i" } },
                ],
            }
            : { isDeleted: false, };
        let categories;
        if (type == "الكل") {
            categories = await Categorie.find(searchCondition).sort({
                ranking: 1
            });
        } else {
            categories = await Categorie.find({
                idService: type,
                ...searchCondition
            }).sort({
                ranking: 1
            });
        }
        res.status(httpStatus.OK).send(categories);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب الفئات" });
    }
}

exports.getCategorieServicesApiRoute = async (req, res) => {
    const { apiName } = req.query;
    try {
        var liste = [];
        const findApi = await Api.findOne({
            name: apiName
        })
        if (findApi.groupesApi == "مزودي خدمات السوشل ميديا") {
            let apiKey = findApi.token;
            const { data } = await axios.get(`${findApi.link}?key=${apiKey}&action=services`);
            const uniqueListe = [];
            for (let i = 0; i < data.length; i++) {
                if (uniqueListe.indexOf(data[i].category) == -1) liste.push({
                    title: data[i].category,
                    Service: data[i].category
                });

                uniqueListe.push(data[i].category)
            }
        } else if (findApi.groupesApi == "مواقع تكود ارقام مؤقته") {
            let apiKey = findApi.token;
            const { data } = await axios.get(`${findApi.link}/getLiveSections?api_key=${apiKey}`);
            for (let i = 0; i < data.length; i++) {
                liste.push({
                    title: data[i].Title,
                    Service: data[i].Service
                });

            }
        } else if (findApi.groupesApi == "مزودي بطاقات الهدايا") {
            let apiKey = findApi.token;
            const { data } = await axios.get(`${findApi.link}/client/api/content/0`, {
                headers: {
                    'api-token': apiKey,
                },
            });

            for (let i = 0; i < data.categories.length; i++) {
                liste.push({
                    Service: data.categories[i].id,
                    title: data.categories[i].name
                })
            }
        } else if (findApi.groupesApi == "برمجة خاصة") {
            if (findApi.link == "https://give-sms.com/api/v1") {
                liste = countriesGiveSms;
            }
        }
        return res.status(httpStatus.OK).send(liste);
    } catch (err) {
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب الخدمات" });
    }
}

exports.addTypeService = async (req, res) => {
    const admin = req.admin;
    const { file } = req;
    const { nameAr, nameEn, typeProduct, show } = req.body;

    try {
        let newFile
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket);
        }
        const { error } = validationTypeService({ ...req.body, image: newFile._id.toString() });
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message
            });
        }
        const typeService = new TypeService({
            nameAr: nameAr,
            nameEn: nameEn,
            typeProduct,
            show,
            image: newFile._id,
            createdBy: admin._id,
        });
        await typeService.save();

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بانشاء نوع فئة جديدة (${nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);

        res.status(httpStatus.OK).send({
            msg: "تم انشاء نوع الفئة بنجاح",
            typeService,
            contentNotification: content
        })
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            // Handle duplicate key error specifically for nameAr field
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذه الفئة موجودة بالفعل",
                error: err.message
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.updateTypeService = async (req, res) => {
    const admin = req.admin;
    const { _id, nameAr, nameEn, typeProduct, show } = req.body;
    const { file } = req;

    try {
        let newFile
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket);
        }
        const typeService = await TypeService.findById(_id);
        typeService.nameAr = nameAr;
        typeService.nameEn = nameEn;
        typeService.typeProduct = typeProduct;
        typeService.show = show;
        if (newFile && typeService.image) {
            try {
                // Ensure the bucket targets the correct collection
                const findFile = await File.findById(typeService.image);
                await bucket.delete(findFile.id);
            } catch (deleteError) {
                console.log(deleteError)
                console.error('Error while deleting file from GridFS:', deleteError.message);
            }
        }

        if (newFile) typeService.image = newFile._id;

        await typeService.save()

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بتحديث نوع فئة  (${nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);

        res.status(httpStatus.OK).send({
            msg: "تم تحديث نوع الفئة بنجاح",
            typeService,
            contentNotification: content
        })
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            // Handle duplicate key error specifically for nameAr field
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذه نوع الفئة موجودة بالفعل",
                error: err.message
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.updateTypeServiceRanking = async (req, res) => {
    const admin = req.admin;
    const newTypeService = req.body;

    if (!Array.isArray(newTypeService)) {
        return res.status(httpStatus.BAD_REQUEST).json({ msg: "Invalid input format" });
    }

    try {
        // Process updates sequentially to avoid duplicate ranking conflicts
        for (let i = 0; i < newTypeService.length; i++) {
            const item = newTypeService[i];
            if (i + 1 !== item.ranking) {
                await TypeService.updateOne(
                    { _id: item._id },
                    { ranking: i + 1 }
                );
            }
        }

        // Notification Logic
        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بتحديث ترتيب قائمة نوع الخدمة `;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);

        res.status(httpStatus.OK).json({
            msg: "تم تحديث الترتيب بنجاح",
            newTypeService,
            contentNotification: content,
        });
    } catch (err) {
        console.error("Error updating type service ranking:", {
            error: err.message,
            stack: err.stack,
        });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
};

exports.deleteTypeService = async (req, res) => {
    const admin = req.admin;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.BAD_REQUEST).json({ msg: "Invalid service ID" });
    }

    try {
        // Mark the TypeService as deleted
        const typeService = await TypeService.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!typeService) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: "TypeService not found" });
        }

        // Mark related categories as deleted
        await Categorie.updateMany({ idService: id }, { isDeleted: true });

        // Mark related products as deleted
        await Product.updateMany({ idService: id }, { isDeleted: true });

        // Prepare and validate notification
        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بحذف نوع فئة (${typeService.nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);

        res.status(httpStatus.OK).json({
            msg: "تم الحذف بنجاح",
            contentNotification: content
        });
    } catch (err) {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
};

exports.getTypeServices = async (req, res) => {
    try {
        const typeService = await TypeService.find(
            { isDeleted: false }
        ).sort({
            ranking: 1
        });
        res.status(httpStatus.OK).send(typeService);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب الفئات" });
    }
}

exports.getServicesApi = async (req, res) => {
    const { apiName, categorieName } = req.query;
    try {
        var liste = [];
        const findApi = await Api.findOne({
            name: apiName
        })
        if (findApi.groupesApi == "مزودي خدمات السوشل ميديا") {
            let apiKey = findApi.token;
            const { data } = await axios.get(`${findApi.link}?key=${apiKey}&action=services`);
            for (let i = 0; i < data.length; i++) {
                if (data[i].category == categorieName) {
                    liste.push(data[i]);
                }
            }
        } else if (findApi.groupesApi == "مواقع تكود ارقام مؤقته") {
            let apiKey = findApi.token;
            const { data } = await axios.get(`${findApi.link}/getServiceCountries?api_key=${apiKey}&service=${categorieName}`);
            liste = data;
        } else if (findApi.groupesApi == "مزودي بطاقات الهدايا") {
            let apiKey = findApi.token;
            const { data } = await axios.get(`${findApi.link}/client/api/products`, {
                headers: {
                    'api-token': apiKey,
                }
            });
            for (let i = 0; i < data.length; i++) {
                liste.push(data[i]);
            }
        } else if (findApi.groupesApi == "برمجة خاصة") {
            if (findApi.link == "https://give-sms.com/api/v1") {
                let apiKey = findApi.token;
                const { data } = await axios.get(`${findApi.link}?method=getcount&userkey=${apiKey}&country=${categorieName}`);
                let arr = data.data.ANY;
                Object.keys(arr).forEach(key => {
                    liste.push({
                        name: platformsGiveSms[key] || key,
                        service: key,
                        CountryCode: categorieName,
                        price: arr[key].price,
                        min: 1
                    })
                });
            }
        }
        return res.status(httpStatus.OK).send(liste);
    } catch (err) {
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب الخدمات" });
    }
}


exports.searchService = async (req, res) => {
    const { query } = req.query; // Search term passed as a query parameter
    try {
        // If query is empty, return all admins
        const searchCondition = query
            ? {
                isDeleted: false,
                $or: [
                    { nameAr: { $regex: query, $options: "i" } }, // Case-insensitive search
                    { nameEn: { $regex: query, $options: "i" } },
                    { id: { $regex: query, $options: "i" } },
                    { 'items.nameAr': { $regex: query, $options: "i" } },
                    { 'items.nameEn': { $regex: query, $options: "i" } },
                    { 'items.service': { $regex: query, $options: "i" } },
                ],
            }
            : {
                isDeleted: false,
            }; // If no query, return all admins by setting empty filter

        const categories = await Categorie.find(searchCondition);
        if (categories.length === 0) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على أي نتائج" });
        }

        res.status(httpStatus.OK).send(categories);
    } catch (err) {
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في البحث عن نتائج" });
    }
}

exports.addProductsApi = async (req, res) => {
    const admin = req.admin;
    const { liste, idService, idCategorie, provider, categorieSelected } = req.body;

    // Input validation
    if (!liste || !Array.isArray(liste) || liste.length === 0) {
        return res.status(httpStatus.BAD_REQUEST).json({
            msg: "قائمة المنتجات مطلوبة ويجب أن تحتوي على عناصر"
        });
    }
    if (!idService || !idCategorie || !provider || !categorieSelected) {
        return res.status(httpStatus.BAD_REQUEST).json({
            msg: "جميع الحقول المطلوبة (idService, idCategorie, provider, categorieSelected) يجب ملؤها"
        });
    }

    try {
        let listeProducts = [];
        for (let i = 0; i < liste.length; i++) {
            const currentProduct = liste[i];

            // Check if the product already exists based on unique fields (e.g., nameAr and service)
            const existingProduct = await Product.findOne({
                nameAr: currentProduct.name || currentProduct.Title,
                service: currentProduct.id || currentProduct.service || categorieSelected
            });

            if (existingProduct) {
                console.log(`المنتج "${currentProduct.name || currentProduct.Title}" موجود بالفعل`);
                return res.status(httpStatus.CONFLICT).json({
                    msg: `المنتج "${currentProduct.name || currentProduct.Title}" موجود بالفعل`,
                });
            }

            // Create new product
            const product = new Product({
                idService,
                idCategorie,
                nameAr: currentProduct.name || currentProduct.Title,
                nameEn: currentProduct.name || currentProduct.Title,
                service: currentProduct.id || currentProduct.service || categorieSelected,
                country: currentProduct.CountryCode || "",
                serverNumber: currentProduct.ServerNumber || "",
                costPrice: currentProduct.Price || currentProduct.price || currentProduct.rate,
                descriptionAr: "<div></div>",
                descriptionEn: "<div></div>",
                forQuantity: (currentProduct.qty_values && currentProduct.qty_values.min) || currentProduct.min || 1,
                quantityQuality: ((currentProduct.min && currentProduct.max) || currentProduct.qty_values) ? "كمية" : "بدون",
                minimumQuantity: currentProduct.min || (currentProduct.qty_values && currentProduct.qty_values.min) || "",
                maximumQuantity: currentProduct.max || (currentProduct.qty_values && currentProduct.qty_values.max) || "",
                availableQuantity: true,
                provider: [
                    {
                        name: provider,
                        nameProduct: currentProduct.name || currentProduct.Title,
                        isAvailable: true,
                        isActive: true,
                        costPrice: currentProduct.Price || currentProduct.price || currentProduct.rate,
                        service: currentProduct.id || currentProduct.service || categorieSelected,
                        country: currentProduct.CountryCode || "",
                        serverNumber: currentProduct.ServerNumber || "",
                    }
                ],
                show: false,
                createdBy: admin._id
            });
            listeProducts.push(product);
            await product.save();
        }

        // Admin data and notification
        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام باضافة مجموعة من المنتجات`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);


        res.status(httpStatus.OK).send({
            msg: "تم اضافة المنتجات بنجاح",
            contentNotification: content,
            listeProducts
        });
    } catch (err) {
        console.error(err);
        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            // Handle duplicate key error specifically for nameAr field
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذا منتج موجود بالفعل",
                error: err.message
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
};


exports.addProduct = async (req, res) => {
    const admin = req.admin;
    const { file } = req;
    let { idService, idCategorie, nameAr, nameEn, service, country, serverNumber, costPrice, forQuantity, descriptionAr, descriptionEn, quantityQuality, minimumQuantity, maximumQuantity, availableQuantity, provider, show } = req.body;
    provider = [
        {
            ...JSON.parse(provider),
            costPrice,
            service,
            country,
            serverNumber
        }
    ]
    console.log(provider)
    try {
        let newFile
        if (!file) {
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "يرجى رفع صورة للمنتج"
            })
        }
        newFile = await saveFile(file, File, Readable, bucket);
        const { error } = validationProduct({ ...req.body, provider, image: newFile._id.toString() });
        if (error) {
            console.log(error)
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message
            });
        }
        const product = new Product({
            idService, idCategorie, nameAr, nameEn, service, country, serverNumber, costPrice, forQuantity, descriptionAr, descriptionEn, quantityQuality, minimumQuantity, maximumQuantity, availableQuantity, provider, image: newFile._id, show, createdBy: admin._id
        });
        await product.save();

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username}قام بانشاء منتج جديدة (${nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);

        res.status(httpStatus.OK).send({
            msg: "تم انشاء الفئة بنجاح",
            product,
            contentNotification: content
        })
    } catch (err) {
        console.log(err)
        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            // Handle duplicate key error specifically for nameAr field
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذا منتج موجود بالفعل",
                error: err.message
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.updateProductRanking = async (req, res) => {
    const admin = req.admin;
    const newProducts = req.body;

    if (!Array.isArray(newProducts)) {
        return res.status(httpStatus.BAD_REQUEST).json({ msg: "Invalid input format" });
    }

    try {
        // Process updates sequentially to avoid duplicate ranking conflicts
        for (let i = 0; i < newProducts.length; i++) {
            const item = newProducts[i];
            if (i + 1 !== item.ranking) {
                await Product.updateOne(
                    { _id: item._id },
                    { ranking: i + 1 }
                );
            }
        }

        // Notification Logic
        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بتحديث ترتيب قائمة المنتجات `;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);

        res.status(httpStatus.OK).json({
            msg: "تم تحديث الترتيب بنجاح",
            newProducts,
            contentNotification: content,
        });
    } catch (err) {
        console.error("Error updating type service ranking:", {
            error: err.message,
            stack: err.stack,
        });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.updateProductsShow = async (req, res) => {
    const admin = req.admin;
    const { productIds, idCategorie } = req.body;

    if (!productIds || !Array.isArray(productIds)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            msg: "يرجى إرسال معرفات المنتجات للتحديث",
        });
    }

    try {
        await Product.updateMany(
            {
                _id: { $in: productIds },
                idCategorie: idCategorie,
            },
            { show: true } // Set `show` to `true` for matching products
        );

        // Optionally, reset `show` to `false` for products in the same category not in `productIds`
        await Product.updateMany(
            {
                _id: { $nin: productIds }, // Exclude selected productIds
                idCategorie: idCategorie,
            },
            { show: false } // Set `show` to `false` for non-matching products
        );

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username}قام بتحديث المنتجات`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);

        // Return success response
        return res.status(httpStatus.OK).json({
            msg: "تم تحديث المنتجات بنجاح",
            contentNotification: content
        });
    } catch (err) {
        // Handle any errors
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.deleteProducts = async (req, res) => {
    const admin = req.admin;
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            msg: "يرجى إرسال معرفات المنتجات للحذف",
        });
    }

    try {
        // Mark the selected group money as deleted
        await Product.updateMany(
            { _id: { $in: productIds } },
            { isDeleted: true }
        );

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username}قام بحذف المنتجات`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);

        // Return success response
        return res.status(httpStatus.OK).json({
            msg: "تم حذف المنتجات بنجاح",
            contentNotification: content
        });
    } catch (err) {
        // Handle any errors
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.getProducts = async (req, res) => {
    const { idCategorie } = req.query;
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;
    try {
        let products;
        if (limit == "ALL") {
            products = await Product.find({
                idCategorie,
                isDeleted: false,
            }).sort({
                ranking: 1
            })
        } else {
            products = await Product.find({
                idCategorie,
                isDeleted: false,
            }).sort({
                ranking: 1
            })
                .skip(skip)
                .limit(limit);
        }
        const groupMoney = await GroupMoney.find({
            idService: products[0].idService,
            isDeleted: false
        });
        const totalDocuments = await Product.countDocuments();
        return res.status(httpStatus.OK).send({
            total: totalDocuments,
            page,
            limit,
            totalPages: Math.ceil(totalDocuments / limit),
            products,
            groupMoney
        });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.getProductDetails = async (req, res) => {
    const { id } = req.query;
    try{
        const product = await Product.findById(id).populate("idService idCategorie");
        return res.status(httpStatus.OK).send(product);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.getProductsStock = async (req, res) => {
    try {
        const products = await Product.find({
            warehouse: true,
            isDeleted: false,
        }).sort({
            ranking: 1
        });
        return res.status(httpStatus.OK).send(products);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.addGroupMoney = async (req, res) => {
    const admin = req.admin;
    const { file } = req;
    const { name, idService, pricingType, value, negativeBalance, agentRatio, meritValue } = req.body;

    try {
        let newFile
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket);
        }
        const { error } = validationGroupMoney({ ...req.body, image: newFile._id.toString() });
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message
            });
        }
        const groupMoney = new GroupMoney({
            name: name,
            idService: idService,
            pricingType,
            value,
            negativeBalance,
            agentRatio,
            meritValue,
            image: newFile._id,
            createdBy: admin._id,
        });
        await groupMoney.save();

        const populatedGroupMoney = await groupMoney.populate("idService createdBy");

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بانشاء مجموعة مالية جديدة (${name})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);

        res.status(httpStatus.OK).send({
            msg: "تم انشاء نوع الفئة بنجاح",
            groupMoney: populatedGroupMoney,
            contentNotification: content
        })
    } catch (err) {
        console.log(err)
        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            // Handle duplicate key error specifically for nameAr field
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذه الفئة موجودة بالفعل",
                error: err.message
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.updateGroupMoney = async (req, res) => {
    const admin = req.admin;
    const { _id, name, idService, pricingType, value, negativeBalance, agentRatio, meritValue } = req.body;
    const { file } = req;
    try {
        let newFile
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket);
        }
        const groupMoney = await GroupMoney.findById(_id);
        groupMoney.name = name;
        groupMoney.idService = idService;
        groupMoney.pricingType = pricingType;
        groupMoney.value = value;
        groupMoney.negativeBalance = negativeBalance;
        groupMoney.agentRatio = agentRatio;
        groupMoney.meritValue = meritValue;
        if (newFile && groupMoney.image) {
            try {
                // Ensure the bucket targets the correct collection
                const findFile = await File.findById(groupMoney.image);
                await bucket.delete(findFile.id);
            } catch (deleteError) {
                console.log(deleteError)
                console.error('Error while deleting file from GridFS:', deleteError.message);
            }
        }

        if (newFile) groupMoney.image = newFile._id;

        await groupMoney.save()
        const populatedGroupMoney = await groupMoney.populate("idService createdBy");

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بتحديث  مجموعة  (${name})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);

        res.status(httpStatus.OK).send({
            msg: "تم تحديث الفئة بنجاح",
            groupMoney: populatedGroupMoney,
            contentNotification: content
        })
    } catch (err) {
        console.log(err)
        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            // Handle duplicate key error specifically for nameAr field
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذه نوع الفئة موجودة بالفعل",
                error: err.message
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.deleteGroupMoney = async (req, res) => {
    const admin = req.admin;
    const { groupMoneyIds } = req.body;

    if (!groupMoneyIds || !Array.isArray(groupMoneyIds)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            msg: "يرجى إرسال معرفات المجموعات للحذف",
        });
    }

    try {
        // Mark the selected group money as deleted
        await GroupMoney.updateMany(
            { _id: { $in: groupMoneyIds } },
            { isDeleted: true }
        );

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username}قام بحذف المجموعات`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);

        // Return success response
        return res.status(httpStatus.OK).json({
            msg: "تم حذف المجموعات بنجاح",
            contentNotification: content
        });
    } catch (err) {
        // Handle any errors
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
};


exports.getGroupMoney = async (req, res) => {
    const { idService } = req.query;
    try {
        let query = idService == "الكل" ? {} : {
            idService
        }
        const groupMoney = await GroupMoney.find({ ...query, isDeleted: false }).populate("idService createdBy");
        return res.status(httpStatus.OK).send(groupMoney);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}