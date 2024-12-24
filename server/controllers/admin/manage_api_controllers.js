const httpStatus = require('http-status');
const { Admin } = require("../../models/admin/admin");
const { validateApi, Api } = require("../../models/api/api");
const { saveNotification } = require('../../utils/constants');

exports.addApi = async (req, res) => {
    const admin = req.admin;
    const { name, link, token, groupesApi } = req.body;
    try {
        const { error } = validateApi(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message
            });
        }
        const api = new Api({
            name, link, token, groupesApi, createdBy: admin._id,
        });
        await api.save();

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام باضافة API جديد (${name})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true)

        res.status(httpStatus.OK).send({
            msg: "تم اضافة API جديد بنجاح",
            api,
            contentNotification: content
        })
    } catch (err) {
        console.log(err)
        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            // Handle duplicate key error specifically for nameAr field
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذا API موجود بالفعل",
                error: err.message
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
}

exports.updateApi = async (req, res) => {
    const { _id ,name, link, token, groupesApi } = req.body;
    try {
        const { error } = validateApi({
            name, link, token, groupesApi
        });
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message,
            });
        }

        const api = await Api.findOneAndUpdate(
            { _id },
            { name, link, token, groupesApi },
            { new: true }
        );

        if (!api) {
            return res.status(httpStatus.NOT_FOUND).json({
                msg: "لم يتم العثور على API لتحديثه",
            });
        }

        const adminData = await Admin.findById(req.admin._id);
        const content = `${adminData.username} قام بتحديث API (${api.name})`;
        await saveNotification(req.admin, "Admin", "Admin", "reminder", content, true);

        res.status(httpStatus.OK).send({
            msg: "تم تحديث API بنجاح",
            api,
            contentNotification: content,
        });
    } catch (err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم أثناء تحديث API",
            error: err.message,
        });
    }
};

exports.deleteApi = async (req, res) => {
    const { _id } = req.body;
    try {
        const api = await Api.findOneAndUpdate(
            { _id },
            { isDeleted: true },
            { new: true }
        );

        if (!api) {
            return res.status(httpStatus.NOT_FOUND).send({
                msg: "لم يتم العثور على API لحذفه",
            });
        }

        const adminData = await Admin.findById(req.admin._id);
        const content = `${adminData.username} قام بحذف API (${api.name})`;
        await saveNotification(req.admin, "Admin", "Admin", "reminder", content, true);

        res.status(httpStatus.OK).send({
            msg: "تم حذف API بنجاح",
            api,
            contentNotification: content,
        });
    } catch (err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم أثناء حذف API",
            error: err.message,
        });
    }
};

exports.getApi = async (req, res) => {
    try {
        const apis = await Api.find({
            isDeleted: false
        });
        res.status(httpStatus.OK).send(apis);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب API" });
    }
}