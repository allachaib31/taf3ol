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
const { saveNotification, defaultsGroupsMoney } = require("../../utils/constants");
const { Api } = require("../../models/api/api");
const { ProductsPrice } = require("../../models/productsPrice/productsPrice");
const { validationOrderRequirements, OrderRequirements } = require("../../models/orderRequirements/orderRequirements");
const { LevelUserGroup } = require("../../models/levelUserGroup/levelUserGroup");
const { User } = require("../../models/user/user");
const { generateNextId } = require("../../utils/generateNextId");


exports.addCategorie = async (req, res) => {
    const admin = req.admin;
    const { file } = req;
    const { nameAr, nameEn, idService, show } = req.body;

    const session = await mongoose.startSession(); // Start a session for transactions

    try {
        await session.startTransaction(); // Start the transaction

        let newFile;
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket);
        }

        const { error } = validationCategorie({ ...req.body, image: newFile?._id?.toString() });
        if (error) {
            await session.abortTransaction(); // Rollback transaction if validation fails
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message
            });
        }

        const categorie = new Categorie({
            nameAr,
            nameEn,
            idService,
            show,
            image: newFile?._id,
            createdBy: admin._id,
        });
        await categorie.save({ session }); // Save within the transaction

        const adminData = await Admin.findById(admin._id).session(session); // Fetch within the transaction
        let content = `${adminData.username} قام بانشاء فئة جديدة (${nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Save within the transaction

        await session.commitTransaction(); // Commit all changes

        res.status(httpStatus.OK).send({
            msg: "تم انشاء الفئة بنجاح",
            categorie,
            contentNotification: content
        });
    } catch (err) {
        console.log(err);
        await session.abortTransaction(); // Rollback all changes on error
        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذه الفئة موجودة بالفعل",
                error: err.message
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};


exports.updateCategorie = async (req, res) => {
    const admin = req.admin;
    const { _id, nameAr, nameEn, idService, show } = req.body;
    const { file } = req;

    const session = await mongoose.startSession(); // Start a session for transactions

    try {
        await session.startTransaction(); // Start the transaction

        let newFile;
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket);
        }

        const categorie = await Categorie.findById(_id).session(session); // Fetch within the transaction
        if (!categorie) {
            await session.abortTransaction(); // Rollback transaction if category not found
            return res.status(httpStatus.NOT_FOUND).json({
                msg: "الفئة غير موجودة"
            });
        }

        // Update the category details
        categorie.nameAr = nameAr;
        categorie.nameEn = nameEn;
        categorie.idService = idService;
        categorie.show = show;

        // Handle the file replacement and deletion if a new file is uploaded
        if (newFile && categorie.image) {
            try {
                const findFile = await File.findById(categorie.image).session(session);
                await bucket.delete(findFile.id); // Delete the old file from GridFS
            } catch (deleteError) {
                console.log(deleteError);
                console.error('Error while deleting file from GridFS:', deleteError.message);
            }
        }

        if (newFile) categorie.image = newFile._id;

        await categorie.save({ session }); // Save category within the transaction

        const adminData = await Admin.findById(admin._id).session(session); // Fetch within the transaction
        let content = `${adminData.username} قام بتحديث فئة (${nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Save notification within the transaction

        await session.commitTransaction(); // Commit all changes

        res.status(httpStatus.OK).send({
            msg: "تم تحديث الفئة بنجاح",
            categorie,
            contentNotification: content
        });

    } catch (err) {
        console.log(err);
        await session.abortTransaction(); // Rollback all changes on error
        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذه نوع الفئة موجودة بالفعل",
                error: err.message
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};


exports.deleteCategorie = async (req, res) => {
    const admin = req.admin;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.BAD_REQUEST).json({ msg: "Invalid service ID" });
    }

    const session = await mongoose.startSession(); // Start a session for transactions

    try {
        await session.startTransaction(); // Start the transaction

        // Mark the Categorie as deleted
        const categorie = await Categorie.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!categorie) {
            await session.abortTransaction(); // Rollback transaction if category not found
            return res.status(httpStatus.NOT_FOUND).json({ msg: "Categorie not found" });
        }

        // Mark related products as deleted
        await Product.updateMany({ idCategorie: id }, { isDeleted: true }, { session });

        const adminData = await Admin.findById(admin._id).session(session); // Fetch admin within the transaction
        let content = `${adminData.username} قام بحذف فئة (${categorie.nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Save notification within the transaction

        await session.commitTransaction(); // Commit all changes

        res.status(httpStatus.OK).json({
            msg: "تم الحذف بنجاح",
            contentNotification: content
        });

    } catch (err) {
        console.error(err);
        await session.abortTransaction(); // Rollback all changes on error
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};

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
    const { apiId } = req.query;
    try {
        var liste = [];
        const findApi = await Api.findById(apiId)
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

    const session = await mongoose.startSession(); // Start a session for transactions

    try {
        await session.startTransaction(); // Start the transaction

        let newFile;
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket);
        }

        const { error } = validationTypeService({ ...req.body, image: newFile?._id?.toString() });
        if (error) {
            await session.abortTransaction(); // Rollback transaction if validation fails
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message,
            });
        }

        const id = await generateNextId("TypeServices", "TS", session);
        const lastTypeServices = await mongoose.model('TypeServices').findOne().sort('-ranking').exec();

        const typeService = new TypeService({
            id,
            nameAr,
            nameEn,
            typeProduct,
            show,
            image: newFile?._id,
            ranking: lastTypeServices ? lastTypeServices.ranking + 1 : 1,
            createdBy: admin._id,
        });
        await typeService.save({ session }); // Save within the transaction

        // Sequential execution using for loop for generating unique IDs for each GroupMoney
        const users = await User.find().populate("idExpenses").session(session);
        let groupes = [];

        for (let i = 0; i < defaultsGroupsMoney.length; i++) {
            const group = defaultsGroupsMoney[i];
            const id = await generateNextId("GroupMoney", "GM", session);
            const groupMoney = new GroupMoney({
                ...group,
                idService: typeService._id,
                createdBy: admin._id,
                id
            });
            await groupMoney.save({ session });
            groupes.push(groupMoney);
        }
        for (let i = 0; i < users.length; i++) {
            const totalPurchases = users[i].idExpenses?.totalPurchases || 0;
            const id = await generateNextId("LevelUserGroup", "LG", session);
            let query = {
                id,
                idUser: users[i]._id,
                idService: typeService._id,
                points: totalPurchases
            }
            if (totalPurchases >= 0 & totalPurchases < 700) {
                query.levelGroup = groupes[0]._id;
            } else if (totalPurchases >= 700 && totalPurchases < 1400) {
                query.levelGroup = groupes[1]._id
            } else if (totalPurchases >= 1400) {
                query.levelGroup = groupes[2]._id
            }
            const levelUserGroup = new LevelUserGroup(query);
            // Save levelUserGroup within the session
            await levelUserGroup.save({ session });
        }

        const adminData = await Admin.findById(admin._id).session(session); // Fetch within the transaction
        const content = `${adminData.username} قام بانشاء نوع فئة جديدة (${nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Save within the transaction

        await session.commitTransaction(); // Commit all changes
        res.status(httpStatus.OK).send({
            msg: "تم انشاء نوع الفئة بنجاح",
            typeService,
            contentNotification: content,
        });
    } catch (err) {
        console.error(err);
        await session.abortTransaction(); // Rollback all changes on error
        if (err.code === 11000 && err.keyPattern?.id) {
            return res.status(httpStatus.CONFLICT).json({
                msg: "خطأ: معرف مكرر في مجموعة المال",
                error: err.message,
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};



exports.updateTypeService = async (req, res) => {
    const admin = req.admin;
    const { _id, nameAr, nameEn, typeProduct, show } = req.body;
    const { file } = req;

    const session = await mongoose.startSession(); // Start a session for transactions

    try {
        await session.startTransaction(); // Start the transaction

        let newFile;
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket);
        }

        const typeService = await TypeService.findById(_id).session(session); // Fetch within the transaction
        if (!typeService) {
            await session.abortTransaction(); // Rollback transaction if typeService not found
            return res.status(httpStatus.NOT_FOUND).json({ msg: "نوع الفئة غير موجود" });
        }

        // Update the TypeService details
        typeService.nameAr = nameAr;
        typeService.nameEn = nameEn;
        typeService.typeProduct = typeProduct;
        typeService.show = show;

        // Handle file replacement and deletion if a new file is uploaded
        if (newFile && typeService.image) {
            try {
                const findFile = await File.findById(typeService.image).session(session);
                await bucket.delete(findFile.id); // Delete the old file from GridFS
            } catch (deleteError) {
                console.log(deleteError);
                console.error('Error while deleting file from GridFS:', deleteError.message);
            }
        }

        if (newFile) typeService.image = newFile._id;

        await typeService.save({ session }); // Save typeService within the transaction

        const adminData = await Admin.findById(admin._id).session(session); // Fetch admin within the transaction
        let content = `${adminData.username} قام بتحديث نوع فئة (${nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Save notification within the transaction

        await session.commitTransaction(); // Commit all changes

        res.status(httpStatus.OK).send({
            msg: "تم تحديث نوع الفئة بنجاح",
            typeService,
            contentNotification: content
        });

    } catch (err) {
        console.error(err);
        await session.abortTransaction(); // Rollback all changes on error
        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذه نوع الفئة موجودة بالفعل",
                error: err.message
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};

exports.updateTypeServiceRanking = async (req, res) => {
    const admin = req.admin;
    const newTypeService = req.body;

    if (!Array.isArray(newTypeService)) {
        return res.status(httpStatus.BAD_REQUEST).json({ msg: "Invalid input format" });
    }

    const session = await mongoose.startSession(); // Start a session for transactions

    try {
        await session.startTransaction(); // Start the transaction

        // Process updates sequentially to avoid duplicate ranking conflicts
        for (let i = 0; i < newTypeService.length; i++) {
            const item = newTypeService[i];
            if (i + 1 !== item.ranking) {
                await TypeService.updateOne(
                    { _id: item._id },
                    { ranking: i + 1 },
                    { session } // Pass the session to ensure the operation is part of the transaction
                );
            }
        }

        // Notification Logic
        const adminData = await Admin.findById(admin._id).session(session); // Fetch admin within the transaction
        let content = `${adminData.username} قام بتحديث ترتيب قائمة نوع الخدمة `;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Save notification within the transaction

        await session.commitTransaction(); // Commit all changes

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
        await session.abortTransaction(); // Rollback all changes on error
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};

exports.deleteTypeService = async (req, res) => {
    const admin = req.admin;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.BAD_REQUEST).json({ msg: "Invalid service ID" });
    }

    const session = await mongoose.startSession(); // Start a session for transactions

    try {
        await session.startTransaction(); // Start the transaction

        // Mark the TypeService as deleted
        const typeService = await TypeService.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session }); // Use session
        if (!typeService) {
            await session.abortTransaction(); // Rollback transaction if TypeService not found
            return res.status(httpStatus.NOT_FOUND).json({ msg: "TypeService not found" });
        }

        // Mark related categories as deleted
        await Categorie.updateMany({ idService: id }, { isDeleted: true }, { session }); // Use session

        // Mark related products as deleted
        await Product.updateMany({ idService: id }, { isDeleted: true }, { session }); // Use session

        // Prepare and validate notification
        const adminData = await Admin.findById(admin._id).session(session); // Use session to fetch admin data
        let content = `${adminData.username} قام بحذف نوع فئة (${typeService.nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Use session for notification

        await session.commitTransaction(); // Commit all changes

        res.status(httpStatus.OK).json({
            msg: "تم الحذف بنجاح",
            contentNotification: content
        });
    } catch (err) {
        console.error(err);
        await session.abortTransaction(); // Rollback all changes on error
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
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
    const { apiId, categorieName } = req.query;
    try {
        var liste = [];
        const findApi = await Api.findById(apiId)
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

    const session = await mongoose.startSession(); // Start a session for transaction

    try {
        await session.startTransaction(); // Start the transaction

        const groupMoney = await GroupMoney.find({ idService: idService }).session(session); // Pass session explicitly
        if (groupMoney.length === 0) {
            await session.abortTransaction(); // Rollback transaction if no group money found
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "يرجى اضافة مجموعة الى نوع الخدمة"
            });
        }

        const findApi = await Api.findById(provider).session(session); // Pass session explicitly
        if (!findApi) {
            await session.abortTransaction(); // Rollback transaction if API not found
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "API غير موجود"
            });
        }

        let listeProducts = [];
        for (let i = 0; i < liste.length; i++) {
            const currentProduct = liste[i];

            // Check if the product already exists based on unique fields (e.g., nameAr and service)
            const existingProduct = await Product.findOne({
                nameAr: currentProduct.name || currentProduct.Title,
                service: currentProduct.id || currentProduct.service || categorieSelected
            }).session(session); // Pass session explicitly

            if (existingProduct) {
                console.log(`المنتج "${currentProduct.name || currentProduct.Title}" موجود بالفعل`);
                await session.abortTransaction(); // Rollback transaction if product exists
                return res.status(httpStatus.CONFLICT).json({
                    msg: `المنتج "${currentProduct.name || currentProduct.Title}" موجود بالفعل`,
                });
            }
            const id = await generateNextId("Product", "P", session);
            const lastCategory = await mongoose.model('Product').findOne().sort('-ranking').session(session).exec();
            // Create new product
            const product = new Product({
                id,
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
                        idProvider: findApi._id,
                        name: findApi.name,
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
                ranking: lastCategory ? lastCategory.ranking + 1 : 1,
                createdBy: admin._id
            }) // Pass session explicitly

            listeProducts.push(product);
            await product.save({ session }); // Save product within the transaction

            for (let j = 0; j < groupMoney.length; j++) {
                const id = await generateNextId("ProductsPrice", "PP", session);
                const productPrice = new ProductsPrice({
                    id,
                    idProducts: product._id,
                    idGroupMoney: groupMoney[j]._id,
                    value: groupMoney[j].value,
                    negativeBalance: groupMoney[j].negativeBalance,
                    agentRatio: groupMoney[j].agentRatio,
                    meritValue: groupMoney[j].meritValue,
                    createdBy: admin._id
                });

                await productPrice.save({ session }); // Save product price within the transaction
            }
        }

        // Admin data and notification
        const adminData = await Admin.findById(admin._id).session(session); // Pass session explicitly
        let content = `${adminData.username} قام باضافة مجموعة من المنتجات`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Pass session explicitly

        await session.commitTransaction(); // Commit the transaction

        res.status(httpStatus.OK).send({
            msg: "تم اضافة المنتجات بنجاح",
            contentNotification: content,
            listeProducts
        });
    } catch (err) {
        console.error(err);
        await session.abortTransaction(); // Rollback the transaction in case of error
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};

exports.addLinkApiProduct = async (req, res) => {
    const admin = req.admin;
    const { idProduct, idProvider, nameProduct, costPrice, service, country, serverNumber, isAvailable } = req.body;

    const session = await mongoose.startSession(); // Start a session for transaction

    try {
        await session.startTransaction(); // Start the transaction

        const product = await Product.findById(idProduct).session(session); // Pass session explicitly
        if (!product) {
            await session.abortTransaction(); // Rollback transaction if product is not found
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "المنتج غير موجود"
            });
        }

        const findApi = await Api.findById(idProvider).session(session); // Pass session explicitly
        if (!findApi) {
            await session.abortTransaction(); // Rollback transaction if API is not found
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "API غير موجود"
            });
        }

        // Check if the API is already linked to the product
        for (let i = 0; i < product.provider.length; i++) {
            if (product.provider[i].idProvider.toString() === idProvider.toString()) {
                await session.abortTransaction(); // Rollback transaction if API is already linked
                return res.status(httpStatus.CONFLICT).send({
                    msg: "هذا API سبق ربطه بالمنتج"
                });
            }
        }

        // Add the new provider to the product
        product.provider.push({
            idProvider, name: findApi.name, nameProduct, costPrice, service, country, serverNumber, isAvailable, isActive: false
        });

        await product.save({ session }); // Save product within the transaction

        // Admin data and notification
        const adminData = await Admin.findById(admin._id).session(session); // Pass session explicitly
        let content = `${adminData.username} قام بربط API بي ${product.nameAr}`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Pass session explicitly

        await session.commitTransaction(); // Commit the transaction

        res.status(httpStatus.OK).send({
            msg: "تم اضافة ربط بنجاح",
            contentNotification: content,
            provider: product.provider
        });
    } catch (err) {
        console.log(err);
        await session.abortTransaction(); // Rollback the transaction in case of error
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};



exports.activeLinkApiProduct = async (req, res) => {
    const admin = req.admin;
    const { idProduct, idProvider } = req.body;

    const session = await mongoose.startSession(); // Start a session for transaction

    try {
        await session.startTransaction(); // Start the transaction

        const product = await Product.findById(idProduct).session(session); // Pass session explicitly
        if (!product) {
            await session.abortTransaction(); // Rollback transaction if product is not found
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "المنتج غير موجود"
            });
        }

        const provider = product.provider.find(provider => provider.idProvider.toString() === idProvider.toString());
        if (!provider) {
            await session.abortTransaction(); // Rollback transaction if API is not linked
            return res.status(httpStatus.NOT_FOUND).send({
                msg: "API غير مرتبط بالمنتج"
            });
        }

        // Deactivate all other providers
        product.provider.forEach(p => {
            if (p.idProvider.toString() !== idProvider.toString()) {
                p.isActive = false;
            }
        });

        // Activate the selected provider
        provider.isActive = true;
        product.costPrice = provider.costPrice;
        product.service = provider.service;
        product.country = provider.country;
        product.serverNumber = provider.serverNumber;
        product.isAvailable = provider.isAvailable;

        await product.save({ session }); // Save the product with the session

        // Admin data and notification
        const adminData = await Admin.findById(admin._id).session(session); // Pass session explicitly
        let content = `${adminData.username} قام بتفعيل ربط API للمنتج ${product.nameAr}`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Pass session explicitly

        await session.commitTransaction(); // Commit the transaction

        res.status(httpStatus.OK).send({
            msg: "تم تفعيل الربط بنجاح",
            contentNotification: content,
            provider: product.provider
        });

    } catch (err) {
        console.log(err);
        await session.abortTransaction(); // Rollback the transaction in case of error
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};

exports.deleteLinkApiProduct = async (req, res) => {
    const admin = req.admin;
    const { idProduct, idProvider } = req.body;

    const session = await mongoose.startSession(); // Start a session for transaction

    try {
        await session.startTransaction(); // Start the transaction

        const product = await Product.findById(idProduct).session(session); // Pass session explicitly
        if (!product) {
            await session.abortTransaction(); // Rollback transaction if product is not found
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "المنتج غير موجود"
            });
        }

        const providerIndex = product.provider.findIndex(provider => provider.idProvider.toString() === idProvider.toString());
        if (providerIndex === -1) {
            await session.abortTransaction(); // Rollback transaction if API is not linked
            return res.status(httpStatus.NOT_FOUND).send({
                msg: "API غير مرتبط بالمنتج"
            });
        }

        // Remove the provider from the product
        if (product.provider.isActive) {
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "انه مفعل"
            });
        }
        product.provider.splice(providerIndex, 1);
        await product.save({ session }); // Save the product with the session

        // Admin data and notification
        const adminData = await Admin.findById(admin._id).session(session); // Pass session explicitly
        let content = `${adminData.username} قام بحذف ربط API من ${product.nameAr}`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Pass session explicitly

        await session.commitTransaction(); // Commit the transaction

        res.status(httpStatus.OK).send({
            msg: "تم حذف ربط بنجاح",
            contentNotification: content,
            provider: product.provider
        });

    } catch (err) {
        console.log(err);
        await session.abortTransaction(); // Rollback the transaction in case of error
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};


exports.addProduct = async (req, res) => {
    const admin = req.admin;
    const { file } = req;
    let { idService, idCategorie, nameAr, nameEn, service, country, serverNumber, costPrice, forQuantity, descriptionAr, descriptionEn, quantityQuality, minimumQuantity, maximumQuantity, availableQuantity, provider, show } = req.body;
    provider = [
        {
            ...JSON.parse(provider),
        }
    ];

    const session = await mongoose.startSession(); // Start a session for transaction

    try {
        await session.startTransaction(); // Start the transaction

        const findApi = await Api.findById(provider[0].idProvider).session(session);
        if (!findApi) {
            await session.abortTransaction(); // Rollback transaction if API is not found
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "API غير موجود"
            });
        }
        provider[0].name = findApi.name;

        const groupMoney = await GroupMoney.find({ idService }).session(session);
        if (groupMoney.length == 0) {
            await session.abortTransaction(); // Rollback transaction if no group found
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "يرجى اضافة مجموعة الى نوع الخدمة"
            });
        }

        if (!file) {
            await session.abortTransaction(); // Rollback if no file is uploaded
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "يرجى رفع صورة للمنتج"
            });
        }

        const newFile = await saveFile(file, File, Readable, bucket);
        const { error } = validationProduct({ ...req.body, provider, image: newFile._id.toString() });
        if (error) {
            await session.abortTransaction(); // Rollback transaction if validation fails
            console.log(error);
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message
            });
        }
        const id = await generateNextId("Product", "P", session);
        const lastCategory = await mongoose.model('Product').findOne().sort('-ranking').session(session).exec();
        const product = new Product({
            id, idService, idCategorie, nameAr, nameEn, service, country, serverNumber, costPrice, forQuantity, descriptionAr, descriptionEn, quantityQuality, minimumQuantity, maximumQuantity, availableQuantity, provider, image: newFile._id, show, ranking: lastCategory ? lastCategory.ranking + 1 : 1, createdBy: admin._id
        });
        await product.save({ session }); // Save product with session

        for (let i = 0; i < groupMoney.length; i++) {
            const id = await generateNextId("ProductsPrice", "PP", session);
            const productPrice = new ProductsPrice({
                idProducts: product._id,
                idGroupMoney: groupMoney[i]._id,
                value: groupMoney[i].value,
                negativeBalance: groupMoney[i].negativeBalance,
                agentRatio: groupMoney[i].agentRatio,
                meritValue: groupMoney[i].meritValue,
                id,
                createdBy: admin._id
            });
            await productPrice.save({ session }); // Save product price with session
        }

        // Admin data and notification
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بانشاء منتج جديدة (${nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Save notification with session

        await session.commitTransaction(); // Commit the transaction if everything is successful

        res.status(httpStatus.OK).send({
            msg: "تم اضافة المنتج بنجاح",
            product,
            contentNotification: content
        });

    } catch (err) {
        console.log(err);
        await session.abortTransaction(); // Rollback the transaction in case of error
        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذا منتج موجود بالفعل",
                error: err.message
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};

exports.updateProductGeneral = async (req, res) => {
    const admin = req.admin;
    const { file } = req;
    const { _id, idService, idCategorie, nameAr, nameEn, service, country, serverNumber, costPrice, forQuantity, descriptionAr, descriptionEn, availableQuantity, show } = req.body;

    const session = await mongoose.startSession(); // Start a session for transaction

    try {
        await session.startTransaction(); // Start the transaction

        const product = await Product.findById(_id).session(session);
        if (!product) {
            await session.abortTransaction(); // Rollback if product is not found
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "المنتج غير موجود"
            });
        }

        let newFile;
        if (file && product.image) {
            try {
                // Ensure the bucket targets the correct collection
                newFile = await saveFile(file, File, Readable, bucket);
                const findFile = await File.findById(product.image).session(session);
                await bucket.delete(findFile.id);
            } catch (deleteError) {
                console.log(deleteError)
                console.error('Error while deleting file from GridFS:', deleteError.message);
            }
        }

        // Update product general fields
        product.idCategorie = idCategorie;
        product.nameAr = nameAr;
        product.nameEn = nameEn;
        product.service = service;
        product.country = country;
        product.serverNumber = serverNumber;
        product.costPrice = costPrice;
        product.forQuantity = forQuantity;
        product.descriptionAr = descriptionAr;
        product.descriptionEn = descriptionEn;
        product.image = newFile ? newFile._id.toString() : product.image;
        product.availableQuantity = availableQuantity;
        product.show = show;

        // Update idService and associated fields if changed
        if (product.idService.toString() !== idService.toString()) {
            const groupMoney = await GroupMoney.find({ idService }).session(session);
            await ProductsPrice.deleteMany({ idProducts: product._id }).session(session);
            for (let i = 0; i < groupMoney.length; i++) {
                const id = await generateNextId("ProductsPrice", "PP", session);
                const productPrice = new ProductsPrice({
                    id,
                    idProducts: product._id,
                    idGroupMoney: groupMoney[i]._id,
                    value: groupMoney[i].value,
                    negativeBalance: groupMoney[i].negativeBalance,
                    agentRatio: groupMoney[i].agentRatio,
                    meritValue: groupMoney[i].meritValue,
                    createdBy: admin._id
                });
                await productPrice.save({ session }); // Save product price with session
            }
        }

        product.idService = idService;

        // Save updated product with session
        await product.save({ session });

        // Admin data and notification
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بتحديث المنتج (${nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Save notification with session

        await session.commitTransaction(); // Commit the transaction if everything is successful

        const productDetails = await Product.findById(_id).populate("idService idCategorie").session(session);

        return res.status(httpStatus.OK).send({
            msg: "تم تحديث المنتج بنجاح",
            product: productDetails,
            contentNotification: content
        });

    } catch (err) {
        console.error(err);
        await session.abortTransaction(); // Rollback the transaction in case of error
        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذا منتج موجود بالفعل",
                error: err.message
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message
        });
    } finally {
        session.endSession(); // End the session
    }
};


exports.updateProductQuantityQuality = async (req, res) => {
    const admin = req.admin;
    const session = await mongoose.startSession(); // Start a session for transaction

    try {
        await session.startTransaction(); // Start the transaction

        const product = await Product.findById(req.body._id).populate("idService idCategorie").session(session);
        if (!product) {
            await session.abortTransaction(); // Rollback the transaction if the product is not found
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "المنتج غير موجود"
            });
        }

        product.quantityQuality = req.body.quantityQuality;
        product.minimumQuantity = (req.body.quantityQuality == 'بدون') ? null : req.body.minimumQuantity;
        product.maximumQuantity = (req.body.quantityQuality == 'بدون') ? null : req.body.maximumQuantity;

        // Save product with session
        await product.save({ session });

        // Notification Logic
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بتحديث نوعية الكمية للمنتج ${req.body.nameAr}`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Save notification with session

        await session.commitTransaction(); // Commit the transaction if everything is successful

        res.status(httpStatus.OK).json({
            msg: "تم تحديث نوعية الكمية بنجاح",
            product,
            contentNotification: content,
        });

    } catch (err) {
        console.error("Error updating type service ranking:", {
            error: err.message,
            stack: err.stack,
        });
        await session.abortTransaction(); // Rollback the transaction in case of error
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};

exports.updateProductRanking = async (req, res) => {
    const admin = req.admin;
    const newProducts = req.body;

    if (!Array.isArray(newProducts)) {
        return res.status(httpStatus.BAD_REQUEST).json({ msg: "Invalid input format" });
    }

    const session = await mongoose.startSession(); // Start a session for transaction

    try {
        await session.startTransaction(); // Start the transaction

        // Process updates sequentially to avoid duplicate ranking conflicts
        for (let i = 0; i < newProducts.length; i++) {
            const item = newProducts[i];
            if (i + 1 !== item.ranking) {
                // Update the ranking within the transaction
                await Product.updateOne(
                    { _id: item._id },
                    { ranking: i + 1 },
                    { session } // Pass the session to the update operation
                );
            }
        }

        // Notification Logic
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بتحديث ترتيب قائمة المنتجات `;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Pass the session to the notification saving

        await session.commitTransaction(); // Commit the transaction if everything is successful

        res.status(httpStatus.OK).json({
            msg: "تم تحديث الترتيب بنجاح",
            newProducts,
            contentNotification: content,
        });

    } catch (err) {
        console.error("Error updating product ranking:", {
            error: err.message,
            stack: err.stack,
        });
        await session.abortTransaction(); // Rollback the transaction in case of error
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};

exports.updateProductsShowAvailable = async (req, res) => {
    const admin = req.admin;
    const { productIdsShow, productIdsAvailable, idCategorie } = req.body;

    if ((!productIdsShow || !Array.isArray(productIdsShow)) &&
        (!productIdsAvailable || !Array.isArray(productIdsAvailable))) {
        return res.status(httpStatus.BAD_REQUEST).json({
            msg: "يرجى إرسال معرفات المنتجات للتحديث",
        });
    }

    const session = await mongoose.startSession(); // Start a session for transaction

    try {
        await session.startTransaction(); // Begin transaction

        // Update products to set `show` to true for productIdsShow
        await Product.updateMany(
            {
                _id: { $in: productIdsShow },
                idCategorie: idCategorie,
            },
            { show: true },
            { session } // Pass the session to the update operation
        );

        // Reset `show` to false for products in the same category not in productIdsShow
        await Product.updateMany(
            {
                _id: { $nin: productIdsShow },
                idCategorie: idCategorie,
            },
            { show: false },
            { session } // Pass the session to the update operation
        );

        // Update products to set `availableQuantity` to true for productIdsAvailable
        await Product.updateMany(
            {
                _id: { $in: productIdsAvailable },
                idCategorie: idCategorie,
            },
            { availableQuantity: true },
            { session } // Pass the session to the update operation
        );

        // Reset `availableQuantity` to false for products in the same category not in productIdsAvailable
        await Product.updateMany(
            {
                _id: { $nin: productIdsAvailable },
                idCategorie: idCategorie,
            },
            { availableQuantity: false },
            { session } // Pass the session to the update operation
        );

        // Save admin notification
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بتحديث المنتجات`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();

        // Return success response
        return res.status(httpStatus.OK).json({
            msg: "تم تحديث المنتجات بنجاح",
            contentNotification: content
        });

    } catch (err) {
        // Rollback the transaction if an error occurs
        await session.abortTransaction();

        // Handle any errors
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};

exports.updatePriceCategorie = async (req, res) => {
    const admin = req.admin;
    let { value, products, groupMoney } = req.body;

    // Start a session for atomic operations
    const session = await mongoose.startSession();

    try {
        await session.startTransaction(); // Begin transaction

        for (let i = 0; i < products.length; i++) {
            // Update product price in a transaction
            await ProductsPrice.updateOne(
                {
                    idGroupMoney: groupMoney._id,
                    idProducts: products[i]._id,
                },
                { value: value },
                { session } // Pass session for atomicity
            );

            for (let j = 0; j < products[i].productsPrice.length; j++) {
                if (products[i].productsPrice[j].idGroupMoney.toString() == groupMoney._id.toString()) {
                    // Fetch the updated product within the transaction
                    products[i].productsPrice[j] = await ProductsPrice.findOne({
                        idGroupMoney: groupMoney._id,
                        idProducts: products[i]._id,
                    }).session(session); // Pass session for atomicity
                    break;
                }
            }
        }

        // Save admin notification within the transaction
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بتحديث المنتجات`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();

        // Return success response
        return res.status(httpStatus.OK).json({
            msg: "تم تحديث المنتجات بنجاح",
            products,
            contentNotification: content,
        });

    } catch (err) {
        // Rollback the transaction if an error occurs
        await session.abortTransaction();

        // Handle any errors
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        // End the session
        session.endSession();
    }
};


exports.updateProductPrice = async (req, res) => {
    const admin = req.admin;
    const productsPrice = req.body;

    // Start a session for atomic operations
    const session = await mongoose.startSession();

    try {
        await session.startTransaction(); // Begin transaction

        // Fetch the GroupMoney and ProductsPrice documents
        const groupMoney = await GroupMoney.findById(productsPrice.idGroupMoney).session(session);
        if (!groupMoney) {
            return res.status(httpStatus.NOT_FOUND).json({
                msg: "مجموعة المال غير موجودة"
            });
        }

        const updateProductPrice = await ProductsPrice.findById(productsPrice._id).session(session);
        if (!updateProductPrice) {
            return res.status(httpStatus.NOT_FOUND).json({
                msg: "التسعير غير موجود"
            });
        }

        // Update product price
        updateProductPrice.value = productsPrice.value;
        updateProductPrice.negativeBalance = productsPrice.negativeBalance;
        updateProductPrice.agentRatio = productsPrice.agentRatio;
        await updateProductPrice.save();

        // Notification content
        let content = `تم تحديث التسعير بنجاح لي ${updateProductPrice.idProducts.nameAr} مجموعة ${groupMoney.name}`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();

        // Return success response
        res.status(httpStatus.OK).send({
            msg: content,
        });

    } catch (err) {
        // Rollback the transaction if an error occurs
        await session.abortTransaction();

        // Handle any errors
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        // End the session
        session.endSession();
    }
};


exports.updateIdServiceProducts = async (req, res) => {
    const admin = req.admin;
    const { idService, idCategorie, productIds } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find all products by the provided productIds
        const products = await Product.find({ '_id': { $in: productIds } }).session(session);

        if (!products.length) {
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "لا توجد منتجات لتحديثها"
            });
        }

        if (products[0].idService.toString() == idService.toString()) {
            return res.status(httpStatus.CONFLICT).send({
                msg: "لم تختر قسم جديد"
            })
        }

        // Loop through products and update the idService for each
        for (let product of products) {
            // Update the idService field
            product.idService = idService;
            product.idCategorie = idCategorie;

            // Update associated prices if idService is changed
            const groupMoney = await GroupMoney.find({ idService }).session(session);

            // Delete the old product prices
            await ProductsPrice.deleteMany({ idProducts: product._id }).session(session);

            // Add new product prices based on the new idService

            for (let i = 0; i < groupMoney.length; i++) {
                const id = await generateNextId("ProductsPrice", "PP", session);
                const productPrice = new ProductsPrice({
                    id,
                    idProducts: product._id,
                    idGroupMoney: groupMoney[i]._id,
                    value: groupMoney[i].value,
                    negativeBalance: groupMoney[i].negativeBalance,
                    agentRatio: groupMoney[i].agentRatio,
                    meritValue: groupMoney[i].meritValue,
                    createdBy: admin._id
                });
                await productPrice.save({ session });
            }

            // Save the product with the updated idService
            await product.save({ session });
        }

        // Commit the transaction
        await session.commitTransaction();

        // Send notification to admin
        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بتحديث خدمات المنتجات `;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        res.status(httpStatus.OK).send({
            msg: "تم تحديث خدمات المنتجات بنجاح",
            contentNotification: content
        });

    } catch (err) {
        // Rollback the transaction if any error occurs
        await session.abortTransaction();

        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message
        });
    } finally {
        // End the session
        session.endSession();
    }
};

exports.deleteProducts = async (req, res) => {
    const admin = req.admin;
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            msg: "يرجى إرسال معرفات المنتجات للحذف",
        });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Mark the selected products as deleted using the session
        await Product.updateMany(
            { _id: { $in: productIds } },
            { isDeleted: true },
            { session }  // Use the session for transaction
        );

        // Send admin notification
        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بحذف المنتجات`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();

        // Return success response
        return res.status(httpStatus.OK).json({
            msg: "تم حذف المنتجات بنجاح",
            contentNotification: content
        });

    } catch (err) {
        // Rollback the transaction if any error occurs
        await session.abortTransaction();

        console.error(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        // End the session
        session.endSession();
    }
};

exports.getProducts = async (req, res) => {
    const { idCategorie, searchText } = req.query;
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = (req.query.limit == "ALL") ? "ALL" : (parseInt(req.query.limit, 10) || 10); // Default to 10 items per page
    const skip = (page - 1) * limit;
    try {
        let products;
        let query = {
            idCategorie,
            isDeleted: false,
        };

        if (searchText) {
            const searchRegex = { $regex: searchText, $options: "i" };
            query.$or = [
                { id: searchRegex },
                { nameAr: searchRegex },
                { nameEn: searchRegex },
                { service: searchRegex },
                { country: searchRegex },
            ];
        }

        if (limit == "ALL") {
            products = await Product.find(query).sort({
                ranking: 1
            })
        } else {
            products = await Product.find(query).sort({
                ranking: 1
            })
                .skip(skip)
                .limit(limit);
        }

        const idServices = products.map(product => product.idService);
        const productsPrice = await ProductsPrice.find({
            isDeleted: false,
        })
            .populate({
                path: 'idProducts',
                match: { idService: { $in: idServices } },
            });

        // Map groupMoney entries to their corresponding products
        const productsWithGroupMoney = products.map(product => ({
            ...product.toObject(),
            productsPrice: productsPrice.filter(
                productPrice =>
                    productPrice.idProducts && // Ensure idProducts is populated
                    productPrice.idProducts._id.toString() === product._id.toString()
            ),
        }));

        const groupMoney = await GroupMoney.find({
            idService: products[0].idService,
            isDeleted: false
        });
        const totalDocuments = await Product.countDocuments();
        //console.dir(productsWithGroupMoney)
        return res.status(httpStatus.OK).send({
            total: totalDocuments,
            page,
            limit,
            totalPages: Math.ceil(totalDocuments / limit),
            products: productsWithGroupMoney,
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
    try {
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

exports.addOrderRequirements = async (req, res) => {
    const admin = req.admin;

    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Validate the request body using Joi
        const { error } = validationOrderRequirements(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({ msg: error.details[0].message });
        }

        // Create a new OrderRequirements document
        const newOrderRequirement = new OrderRequirements({
            idProducts: req.body.idProducts,
            nameAr: req.body.nameAr,
            nameEn: req.body.nameEn,
            descriptionAr: req.body.descriptionAr,
            descriptionEn: req.body.descriptionEn,
            verification: req.body.verification,
            createdBy: admin._id,
        });

        // Save the document to the database within the transaction
        const savedOrderRequirement = await newOrderRequirement.save({ session });

        // Send admin notification (ensure the session is used here as well)
        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بإضافة متطلبات الطلب (${req.body.nameAr})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction if everything is successful
        await session.commitTransaction();

        res.status(httpStatus.CREATED).json({
            msg: "تمت إضافة متطلبات الطلب بنجاح",
            contentNotification: content,
            savedOrderRequirement
        });
    } catch (err) {
        // If any error occurs, abort the transaction
        await session.abortTransaction();
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message
        });
    } finally {
        // End the session after the transaction
        session.endSession();
    }
};

exports.deleteOrderRequirements = async (req, res) => {
    const admin = req.admin;

    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;

        // Find and delete the OrderRequirement document within the session
        const deletedOrderRequirement = await OrderRequirements.findByIdAndDelete(id, { session });
        if (!deletedOrderRequirement) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: "Order requirement not found" });
        }

        // Send admin notification (ensure the session is used here as well)
        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بحذف متطلبات الطلب`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction if everything is successful
        await session.commitTransaction();

        res.status(httpStatus.OK).json({
            msg: "تم حذف متطلبات الطلب بنجاح",
            contentNotification: content
        });
    } catch (err) {
        // If any error occurs, abort the transaction
        await session.abortTransaction();
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message
        });
    } finally {
        // End the session after the transaction
        session.endSession();
    }
};


exports.getOrderRequirements = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the order requirement document by its ID
        const orderRequirement = await OrderRequirements.find({
            idProducts: id
        });


        // Return the found document
        res.status(httpStatus.OK).json({
            orderRequirement
        });
    } catch (err) {
        // Handle unexpected errors
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message
        });
    }
};


exports.addGroupMoney = async (req, res) => {
    const admin = req.admin;
    const { name, idService, pricingType, value, negativeBalance, agentRatio, meritValue } = req.body;

    const session = await mongoose.startSession(); // Start a session for transaction

    try {
        await session.startTransaction(); // Begin the transaction

        // Validate input
        const { error } = validationGroupMoney({ ...req.body });
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message
            });
        }
        const id = await generateNextId("GroupMoney", "GM", session);
        // Create the new group money
        const groupMoney = new GroupMoney({
            id,
            name: name,
            idService: idService,
            pricingType,
            value,
            negativeBalance,
            agentRatio,
            meritValue,
            createdBy: admin._id,
        });
        await groupMoney.save({ session });

        // Find products and create associated product prices
        const products = await Product.find({ idService }).session(session);
        for (let i = 0; i < products.length; i++) {
            const id = await generateNextId("ProductsPrice", "PP", session);
            const productPrice = new ProductsPrice({
                id,
                idProducts: products[i]._id,
                idGroupMoney: groupMoney._id,
                value: groupMoney.value,
                negativeBalance: groupMoney.negativeBalance,
                agentRatio: groupMoney.agentRatio,
                meritValue: groupMoney.meritValue,
                createdBy: admin._id,
            });
            await productPrice.save({ session });
        }

        // Update LevelUserGroup for users with matching meritValue
        const users = await User.find().populate("idExpenses").session(session);
        for (let i = 0; i < users.length; i++) {
            if (users[i].idExpenses.totalPurchases >= groupMoney.meritValue) {
                await LevelUserGroup.findOneAndUpdate(
                    { idService: idService, idUser: users[i]._id },
                    { levelGroup: groupMoney._id },
                    { session }
                );
            }
        }

        const populatedGroupMoney = await groupMoney.populate("idService createdBy");

        // Create notification
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بانشاء مجموعة مالية جديدة (${name})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        await session.commitTransaction(); // Commit the transaction

        res.status(httpStatus.OK).send({
            msg: "تم انشاء نوع الفئة بنجاح",
            groupMoney: populatedGroupMoney,
            contentNotification: content,
        });
    } catch (err) {
        console.error(err);
        await session.abortTransaction(); // Rollback the transaction on error

        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            // Handle duplicate key error specifically for nameAr field
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذه الفئة موجودة بالفعل",
                error: err.message,
            });
        }

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};


exports.updateGroupMoney = async (req, res) => {
    const admin = req.admin;
    const { _id, name, idService, pricingType, value, negativeBalance, agentRatio, meritValue } = req.body;

    const session = await mongoose.startSession(); // Start a session for transaction

    try {
        await session.startTransaction(); // Begin the transaction

        // Find and update the group money
        const groupMoney = await GroupMoney.findById(_id).session(session);
        if (!groupMoney) {
            return res.status(httpStatus.NOT_FOUND).json({
                msg: "الفئة غير موجودة"
            });
        }
        groupMoney.name = name;
        groupMoney.idService = idService;
        groupMoney.pricingType = pricingType;
        groupMoney.value = value;
        groupMoney.negativeBalance = negativeBalance;
        groupMoney.agentRatio = agentRatio;
        groupMoney.meritValue = meritValue;

        await groupMoney.save({ session });

        // Populate the updated group money
        const populatedGroupMoney = await groupMoney.populate("idService createdBy");

        // Create a notification
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بتحديث مجموعة (${name})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session); // Pass the session to notification saving

        await session.commitTransaction(); // Commit the transaction

        res.status(httpStatus.OK).send({
            msg: "تم تحديث الفئة بنجاح",
            groupMoney: populatedGroupMoney,
            contentNotification: content,
        });
    } catch (err) {
        console.error(err);
        await session.abortTransaction(); // Rollback the transaction on error

        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            // Handle duplicate key error specifically for nameAr field
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذه نوع الفئة موجودة بالفعل",
                error: err.message,
            });
        }

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // End the session
    }
};


exports.deleteGroupMoney = async (req, res) => {
    const admin = req.admin;
    const { groupMoneyIds } = req.body;

    if (!groupMoneyIds || !Array.isArray(groupMoneyIds) || groupMoneyIds.length === 0) {
        return res.status(httpStatus.BAD_REQUEST).json({
            msg: "يرجى إرسال معرفات المجموعات للحذف",
        });
    }

    const session = await mongoose.startSession();

    try {
        await session.startTransaction(); // Begin the transaction

        // Retrieve the group money documents to be deleted
        const deletedGroupMoneyList = await GroupMoney.find({ _id: { $in: groupMoneyIds } }).session(session);

        // Check if any group has defaultGroup set to true
        const hasDefaultGroup = deletedGroupMoneyList.some(group => group.defaultGroup);

        if (hasDefaultGroup) {
            await session.abortTransaction(); // Abort the transaction
            session.endSession(); // End the session
            return res.status(httpStatus.NOT_ACCEPTABLE).send({
                msg: "لا يمكن حذف المجموعات الافتراضية",
            });
        }

        // Mark the selected group money as deleted
        await GroupMoney.deleteMany({ _id: { $in: groupMoneyIds } }, { session });
        await ProductsPrice.deleteMany({ idGroupMoney: { $in: groupMoneyIds } }, { session });

        const users = await User.find().populate("idExpenses").session(session);

        for (const user of users) {
            for (const groupMoneyId of groupMoneyIds) {
                const levelUserGroup = await LevelUserGroup.findOne({
                    idUser: user._id,
                    levelGroup: groupMoneyId,
                }).session(session);

                if (levelUserGroup) {
                    const groupesMoney = await GroupMoney.find({
                        idService: levelUserGroup.idService,
                    }).session(session);

                    for (const group of groupesMoney) {
                        if (levelUserGroup.points >= group.meritValue) {
                            levelUserGroup.levelGroup = group._id;
                        }
                    }
                    await levelUserGroup.save({ session });
                }
            }
        }

        // Create an admin notification
        const adminData = await Admin.findById(admin._id).session(session);
        const content = `${adminData.username} قام بحذف المجموعات`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        await session.commitTransaction(); // Commit the transaction
        session.endSession();

        return res.status(httpStatus.OK).json({
            msg: "تم حذف المجموعات بنجاح",
            deletedGroups: deletedGroupMoneyList,
            contentNotification: content,
        });
    } catch (err) {
        await session.abortTransaction(); // Rollback the transaction in case of an error
        session.endSession();

        console.error(err);
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