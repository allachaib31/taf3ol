const axios = require("axios");
const { File } = require("../../models/file/file");
const { Readable } = require('stream');
const httpStatus = require('http-status')
const { bucket } = require('../../server');
const { saveFile } = require('../../utils/saveFile');
const { Notification, validateNotification } = require('../../models/notifucation/notifucation');
const { Admin } = require('../../models/admin/admin');
const { Categorie, validationCategorie } = require("../../models/categorie/categorie");
const { validationTypeCategorie, TypeCategorie } = require("../../models/categorie/typeCategorie");
const APIKEYSMMCPAN = process.env.API_KEY_SMMSCPAN;
const LINKSMMCPAN = process.env.LINK_SMMCPAN;
const APIKEYNUMBERSAPP = process.env.API_KEY_NUMBERSAPP;
const LINKNUMBERSAPP = process.env.LINK_NUMBERSAPP;

exports.addCategorie = async (req, res) => {
    const admin = req.admin;
    const { file } = req;
    const { nameAr, nameEn, type } = req.body;
    try{
        let newFile
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket);
        }
        const { error } = validationCategorie(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message
            });
        }
        const categorie = new Categorie({
            nameAr: nameAr,
            nameEn: nameEn,
            type: type,
            image: newFile ? newFile._id : null,
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

exports.addService = async (req, res) => {
    const admin = req.admin;
    const { category, service, nameAr, nameEn, type, country, rate, quantity, min, max,provider, price, discount, dripfeed, refill, cancel } = req.body;
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
            service: service == ""  ? uniqueNumber :service, 
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

exports.addTypeCategorie = async (req, res) => {
    const admin = req.admin;
    const { file } = req;
    const { nameAr, nameEn } = req.body;

    try{
        let newFile
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket);
        }
        const { error } = validationTypeCategorie(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message
            });
        }
        const typeCategorie = new TypeCategorie({
            nameAr: nameAr,
            nameEn: nameEn,
            image: newFile ? newFile._id : null,
            createdBy: admin._id,
        });
        await typeCategorie.save()
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
            typeCategorie,
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

exports.getCategories = async (req, res) => {
    const { type } = req.query;
    try{
        const categories = await Categorie.find({
            type: type
        }).sort({
            ranking: 1
        });
        res.status(httpStatus.OK).send(categories);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب الفئات" });
    }
}

exports.getServices = async (req, res) => {
    const { name, type } = req.query;
    try{
        var liste = [];
        if(type == "smmcpan.com") {
            const { data }  = await axios.get(`${LINKSMMCPAN}?key=${APIKEYSMMCPAN}&action=services`);
            for (let i = 0; i < data.length; i++) {
                if(data[i].category == name){
                    liste.push({
                        service: data[i].service,
                        nameAr: data[i].name,
                        nameEn: data[i].name,
                        type: data[i].type,
                        country: "All",
                        rate: data[i].rate,
                        quantity: Infinity,
                        min: data[i].min,
                        max: data[i].max,
                        provider: type,
                        status: "مفعل",
                        price: 0,
                        discount: 0,
                        dripfeed: data[i].dripfeed,
                        refill: data[i].refill,
                        cancel: data[i].cancel,
                    })
                }
            }
        } else if (type == "numbersapp.online") {
            const { data }  = await axios.get(`${LINKNUMBERSAPP}getLiveSections?api_key=${APIKEYNUMBERSAPP}`);
            for (let i = 0; i < data.length; i++) {
                if(data[i].Title == name){
                    const dataService = await axios.get(`${LINKNUMBERSAPP}getServiceCountries?api_key=${APIKEYNUMBERSAPP}&service=${data[i].Service}`);
                    for (let j = 0; j < dataService.data.length; j++) {
                        liste.push({
                            service: data[i].Service,
                            nameAr: dataService.data[j].Title,
                            nameEn: dataService.data[j].Title,
                            type: data[i].Type,
                            country: "All",
                            rate: 0,
                            quantity: Infinity,
                            min: Infinity,
                            max: Infinity,
                            provider: type,
                            status: "مفعل",
                            price: dataService.data[j].Price,
                            discount: 0,
                            dripfeed: null,
                            refill: null,
                            cancel: null,
                        })
                    }
                    break;
                }
            }
        }
        res.status(httpStatus.OK).send(liste);
    } catch (err) {
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب الخدمات" });
    }
}

exports.getTypeCategories = async (req, res) => {
    try{
        const typeCategories = await TypeCategorie.find()
        res.status(httpStatus.OK).send(typeCategories);
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