const axios = require("axios");
const { File } = require("../../models/file/file");
const { Readable } = require('stream');
const httpStatus = require('http-status')
const { bucket } = require('../../server');
const { saveFile } = require('../../utils/saveFile');
const { Notification, validateNotification } = require('../../models/notifucation/notifucation');
const { Admin } = require('../../models/admin/admin');
const { Categorie, validationCategorie } = require("../../models/categorie/categorie");
const { validationTypeService, TypeService } = require("../../models/typeService/typeService");
const { countriesGiveSms, platformsGiveSms } = require("../../utils/countryGiveSms");
const { validationProduct, Product } = require("../../models/products/product");
const { default: mongoose } = require("mongoose");
const { validationGroupMoney, GroupMoney } = require("../../models/groupMoney/groupMoney");
const APIKEYSMMCPAN = process.env.API_KEY_SMMSCPAN;
const LINKSMMCPAN = process.env.LINK_SMMCPAN;
const APIKEYJUSTANOTHERPANEL = process.env.API_KEY_JUSTANOTHERPANEL;
const LINKJUSTANOTHERPANEL = process.env.LINK_JUSTANOTHERPANEL;
const APIKEYDRD3M = process.env.API_KEY_DRD3M;
const LINKDRD3M = process.env.LINK_DRD3M;
const APIKEYNUMBERSAPP = process.env.API_KEY_NUMBERSAPP;
const LINKNUMBERSAPP = process.env.LINK_NUMBERSAPP;
const APIKEYKASEM = process.env.API_KEY_KASEM;
const LINKKASEM = process.env.LINK_KASEM;
const LINKGIVESMS = process.env.LINK_GIVESMS;
const APIKEYGIVESMS = process.env.API_KEY_GIVESMS;

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
        await categorie.save()
        const adminData = await Admin.findById(admin._id);
        const notificationData = {
            senderId: admin._id,
            senderModel: 'Admin',
            receiverModel: 'Admin',
            type: 'reminder',
            content: `${adminData.username} قام بانشاء فئة جديدة (${nameAr})`,
            isGlobal: true
        };
        const { errorNotification } = validateNotification(notificationData);
        if (errorNotification) {
            throw new Error(errorNotification.details[0].message);
        } else {
            const notification = new Notification(notificationData);
            await notification.save();
        }
        res.status(httpStatus.OK).send({
            msg: "تم انشاء الفئة بنجاح",
            categorie,
            contentNotification: notificationData.content
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
        const notificationData = {
            senderId: admin._id,
            senderModel: 'Admin',
            receiverModel: 'Admin',
            type: 'reminder',
            content: `${adminData.username} قام بتحديث  فئة  (${nameAr})`,
            isGlobal: true
        };
        const { errorNotification } = validateNotification(notificationData);
        if (errorNotification) {
            throw new Error(errorNotification.details[0].message);
        } else {
            const notification = new Notification(notificationData);
            await notification.save();
        }
        res.status(httpStatus.OK).send({
            msg: "تم تحديث الفئة بنجاح",
            categorie,
            contentNotification: notificationData.content
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

        // Prepare and validate notification
        const adminData = await Admin.findById(admin._id);
        if (!adminData) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: "Admin not found" });
        }

        const notificationData = {
            senderId: admin._id,
            senderModel: 'Admin',
            receiverModel: 'Admin',
            type: 'reminder',
            content: `${adminData.username} قام بحذف فئة (${categorie.nameAr})`,
            isGlobal: true
        };

        const { errorNotification } = validateNotification(notificationData);
        if (errorNotification) {
            throw new Error(errorNotification.details[0].message);
        }

        const notification = new Notification(notificationData);
        await notification.save();

        res.status(httpStatus.OK).json({
            msg: "تم الحذف بنجاح",
            contentNotification: notificationData.content
        });
    } catch (err) {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.addService = async (req, res) => {
    const admin = req.admin;
    const { category, service, nameAr, nameEn, type, country, rate, quantity, min, max, provider, price, discount, dripfeed, refill, cancel } = req.body;
    try {
        console.log(req.body)
        const findCategory = await Categorie.findOne({ nameAr: category });

        if (!findCategory) {
            return res.status(httpStatus.NOT_FOUND).send({
                msg: "هذه الفئة غير موجودة"
            });
        }

        // Ensure findCategory.items is initialized
        if (!findCategory.items) {
            findCategory.items = [];
        }

        let result = findCategory.items.findIndex(item => item.nameAr === nameAr);
        if (result >= 0) {
            return res.status(httpStatus.CONFLICT).send({
                msg: "تم اضافة هذه الخدمة في هذه الفئة من قبل"
            });
        }
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

        // Generate a random number and pad to 4 digits
        const randomPart = String(Math.floor(Math.random() * 10000)).padStart(4, '0');

        // Concatenate the date, time, and random part
        const uniqueNumber = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${randomPart}`;
        findCategory.items.push({
            service: service == "" ? uniqueNumber : service,
            nameAr,
            nameEn,
            type,
            country,
            rate,
            quantity,
            min,
            max,
            provider,
            status: "مفعل",
            price,
            discount,
            dripfeed,
            refill,
            cancel,
            ranking: findCategory.items.length ? findCategory.items.length + 1 : 1
        });

        await findCategory.save();
        const adminData = await Admin.findById(admin._id);
        const notificationData = {
            senderId: admin._id,
            senderModel: 'Admin',
            receiverModel: 'Admin',
            type: 'reminder',
            content: `${adminData.username} قام بانشاء خدمة جديدة (${nameAr})`,
            isGlobal: true
        };
        const { errorNotification } = validateNotification(notificationData);
        if (errorNotification) {
            throw new Error(errorNotification.details[0].message);
        } else {
            const notification = new Notification(notificationData);
            await notification.save();
        }
        return res.status(httpStatus.OK).send({
            msg: "تمت اضافتها بنجاح",
            findCategory,
            contentNotification: notificationData.content
        });
    } catch (err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
};

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
        await typeService.save()
        const adminData = await Admin.findById(admin._id);
        const notificationData = {
            senderId: admin._id,
            senderModel: 'Admin',
            receiverModel: 'Admin',
            type: 'reminder',
            content: `${adminData.username} قام بانشاء نوع فئة جديدة (${nameAr})`,
            isGlobal: true
        };
        const { errorNotification } = validateNotification(notificationData);
        if (errorNotification) {
            throw new Error(errorNotification.details[0].message);
        } else {
            const notification = new Notification(notificationData);
            await notification.save();
        }
        res.status(httpStatus.OK).send({
            msg: "تم انشاء نوع الفئة بنجاح",
            typeService,
            contentNotification: notificationData.content
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
        const notificationData = {
            senderId: admin._id,
            senderModel: 'Admin',
            receiverModel: 'Admin',
            type: 'reminder',
            content: `${adminData.username} قام بتحديث نوع فئة  (${nameAr})`,
            isGlobal: true
        };
        const { errorNotification } = validateNotification(notificationData);
        if (errorNotification) {
            throw new Error(errorNotification.details[0].message);
        } else {
            const notification = new Notification(notificationData);
            await notification.save();
        }
        res.status(httpStatus.OK).send({
            msg: "تم تحديث نوع الفئة بنجاح",
            typeService,
            contentNotification: notificationData.content
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
        if (!adminData) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: "Admin not found" });
        }

        const notificationData = {
            senderId: admin._id,
            senderModel: 'Admin',
            receiverModel: 'Admin',
            type: 'reminder',
            content: `${adminData.username} قام بتحديث ترتيب قائمة نوع الخدمة `,
            isGlobal: true,
        };

        const { errorNotification } = validateNotification(notificationData);
        if (errorNotification) {
            throw new Error(errorNotification.details[0].message);
        }

        const notification = new Notification(notificationData);
        await notification.save();

        res.status(httpStatus.OK).json({
            msg: "تم تحديث الترتيب بنجاح",
            newTypeService,
            contentNotification: notificationData.content,
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
        if (!adminData) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: "Admin not found" });
        }

        const notificationData = {
            senderId: admin._id,
            senderModel: 'Admin',
            receiverModel: 'Admin',
            type: 'reminder',
            content: `${adminData.username} قام بحذف نوع فئة (${typeService.nameAr})`,
            isGlobal: true
        };

        const { errorNotification } = validateNotification(notificationData);
        if (errorNotification) {
            throw new Error(errorNotification.details[0].message);
        }

        const notification = new Notification(notificationData);
        await notification.save();

        res.status(httpStatus.OK).json({
            msg: "تم الحذف بنجاح",
            contentNotification: notificationData.content
        });
    } catch (err) {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
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
            : {isDeleted: false,};
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
    const { type } = req.query;
    try {
        var liste = [];
        if (type == "https://smmcpan.com" || type == "https://justanotherpanel.com" || type == "https://drd3m.me") {
            let apiKey = type == "https://smmcpan.com" ? APIKEYSMMCPAN : type == "https://justanotherpanel.com" ? APIKEYJUSTANOTHERPANEL : type == "https://drd3m.me" ? APIKEYDRD3M : ""
            const { data } = await axios.get(`${type}/api/v2?key=${apiKey}&action=services`);
            const uniqueListe = [];
            for (let i = 0; i < data.length; i++) {
                if (uniqueListe.indexOf(data[i].category) == -1) liste.push({
                    title: data[i].category,
                    Service: data[i].category
                });

                uniqueListe.push(data[i].category)
            }
        } else if (type == "https://api.numbersapp.online/api") {
            const { data } = await axios.get(`${LINKNUMBERSAPP}getLiveSections?api_key=${APIKEYNUMBERSAPP}`);
            for (let i = 0; i < data.length; i++) {
                liste.push({
                    title: data[i].Title,
                    Service: data[i].Service
                });

            }
        } else if (type == "https://give-sms.com/api/v1") {
            liste = countriesGiveSms;
        } else if (type == "https://api.kasim-store.com") {
            const { data } = await axios.get('https://api.kasim-store.com/client/api/content/0', {
                headers: {
                    'api-token': '93eedafddc374ffd69f59f671c8757a85a51008e5f069773',
                },
            });
            console.log(data);

            for (let i = 0; i < data.categories.length; i++) {
                liste.push({
                    Service: data.categories[i].id,
                    title: data.categories[i].name
                })
            }
        }
        return res.status(httpStatus.OK).send(liste);
    } catch (err) {
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب الخدمات" });
    }
}

exports.getServicesApi = async (req, res) => {
    const { type, categorieName } = req.query;
    try {
        var liste = [];
        if (type == "https://smmcpan.com" || type == "https://justanotherpanel.com" || type == "https://drd3m.me") {
            let apiKey = type == "https://smmcpan.com" ? APIKEYSMMCPAN : type == "https://justanotherpanel.com" ? APIKEYJUSTANOTHERPANEL : type == "https://drd3m.me" ? APIKEYDRD3M : ""
            const { data } = await axios.get(`${type}/api/v2?key=${apiKey}&action=services`);
            for (let i = 0; i < data.length; i++) {
                if (data[i].category == categorieName) {
                    liste.push(data[i]);
                }
            }
        } else if (type == "https://api.numbersapp.online/api") {
            const { data } = await axios.get(`${LINKNUMBERSAPP}getServiceCountries?api_key=${APIKEYNUMBERSAPP}&service=${categorieName}`);
            liste = data;
        } else if (type == "https://give-sms.com/api/v1") {
            const { data } = await axios.get(`${LINKGIVESMS}?method=getcount&userkey=${APIKEYGIVESMS}&country=${categorieName}`);
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
        } else if (type == "https://api.kasim-store.com") {
            const { data } = await axios.get(`${LINKKASEM}/client/api/products`, {
                headers: {
                    'api-token': APIKEYKASEM,
                }
            });
            for (let i = 0; i < data.length; i++) {
                liste.push(data[i]);
            }
        }
        console.log(liste[1])
        return res.status(httpStatus.OK).send(liste);
    } catch (err) {
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب الخدمات" });
    }
}

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

exports.searchService = async (req, res) => {
    const { query } = req.query; // Search term passed as a query parameter
    try {
        // If query is empty, return all admins
        const searchCondition = query
            ? {
                $or: [
                    { nameAr: { $regex: query, $options: "i" } }, // Case-insensitive search
                    { nameEn: { $regex: query, $options: "i" } },
                    { id: { $regex: query, $options: "i" } },
                    { 'items.nameAr': { $regex: query, $options: "i" } },
                    { 'items.nameEn': { $regex: query, $options: "i" } },
                    { 'items.service': { $regex: query, $options: "i" } },
                ],
            }
            : {}; // If no query, return all admins by setting empty filter

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

exports.addProduct = async (req, res) => {
    const admin = req.admin;
    const { file } = req;
    const { idService, idCategorie, nameAr, nameEn, service, country, serverNumber, price, forQuantity, descriptionAr, descriptionEn, quantityQuality, minimumQuantity, maximumQuantity, availableQuantity, provider, show } = req.body;
    try {
        let newFile
        if (!file) {
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "يرجى رفع صورة للمنتج"
            })
        }
        newFile = await saveFile(file, File, Readable, bucket);
        const { error } = validationProduct({ ...req.body, price: JSON.parse(price), image: newFile._id.toString() });
        if (error) {
            console.log(error)
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message
            });
        }
        const product = new Product({
            idService, idCategorie, nameAr, nameEn, service, country, serverNumber, price: JSON.parse(price), forQuantity, descriptionAr, descriptionEn, quantityQuality, minimumQuantity, maximumQuantity, availableQuantity, provider, image: newFile._id, show
        });
        await product.save()
        const adminData = await Admin.findById(admin._id);
        const notificationData = {
            senderId: admin._id,
            senderModel: 'Admin',
            receiverModel: 'Admin',
            type: 'reminder',
            content: `${adminData.username}قام بانشاء منتج جديدة (${nameAr})`,
            isGlobal: true
        };
        const { errorNotification } = validateNotification(notificationData);
        if (errorNotification) {
            throw new Error(errorNotification.details[0].message);
        } else {
            const notification = new Notification(notificationData);
            await notification.save();
        }
        res.status(httpStatus.OK).send({
            msg: "تم انشاء الفئة بنجاح",
            product,
            contentNotification: notificationData.content
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

exports.getProducts = async (req, res) => {
    const { idCategorie } = req.query;
    try{
        const products = await Product.find({
            idCategorie
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
        const notificationData = {
            senderId: admin._id,
            senderModel: 'Admin',
            receiverModel: 'Admin',
            type: 'reminder',
            content: `${adminData.username} قام بانشاء مجموعة مالية جديدة (${name})`,
            isGlobal: true
        };
        const { errorNotification } = validateNotification(notificationData);
        if (errorNotification) {
            throw new Error(errorNotification.details[0].message);
        } else {
            const notification = new Notification(notificationData);
            await notification.save();
        }
        res.status(httpStatus.OK).send({
            msg: "تم انشاء نوع الفئة بنجاح",
            groupMoney: populatedGroupMoney,
            contentNotification: notificationData.content
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
        const notificationData = {
            senderId: admin._id,
            senderModel: 'Admin',
            receiverModel: 'Admin',
            type: 'reminder',
            content: `${adminData.username} قام بتحديث  مجموعة  (${name})`,
            isGlobal: true
        };
        const { errorNotification } = validateNotification(notificationData);
        if (errorNotification) {
            throw new Error(errorNotification.details[0].message);
        } else {
            const notification = new Notification(notificationData);
            await notification.save();
        }
        res.status(httpStatus.OK).send({
            msg: "تم تحديث الفئة بنجاح",
            groupMoney: populatedGroupMoney,
            contentNotification: notificationData.content
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

        // Return success response
        return res.status(httpStatus.OK).json({
            msg: "تم حذف المجموعات بنجاح",
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
    try{
        let query = idService == "الكل" ? {} : {
            idService
        }
        const groupMoney = await GroupMoney.find({...query, isDeleted: false}).populate("idService createdBy");
        return res.status(httpStatus.OK).send(groupMoney);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}