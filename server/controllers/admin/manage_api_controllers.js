const httpStatus = require('http-status');
const { Admin } = require("../../models/admin/admin");
const { validateApi, Api } = require("../../models/api/api");
const { saveNotification } = require('../../utils/constants');
const { default: mongoose } = require('mongoose');

exports.addApi = async (req, res) => {
    const admin = req.admin;
    const { name, link, token, groupesApi, idCoin } = req.body;
    const session = await mongoose.startSession();

    try {
        // Validate the input data
        const { error } = validateApi(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message
            });
        }

        await session.startTransaction(); // Begin the transaction

        // Create a new API
        const api = new Api({
            name, link, token, groupesApi, idCoin, createdBy: admin._id,
        });
        await api.save({ session });

        // Save the admin action as a notification
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام باضافة API جديد (${name})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        const apiPopulated = await Api.findById(api._id).populate("idCoin").session(session);

        await session.commitTransaction(); // Commit the transaction

        res.status(httpStatus.OK).send({
            msg: "تم اضافة API جديد بنجاح",
            api: apiPopulated,
            contentNotification: content
        });

    } catch (err) {
        await session.abortTransaction(); // Rollback the transaction if an error occurs
        session.endSession();

        if (err.code === 11000 && err.keyPattern && err.keyPattern.nameAr) {
            return res.status(httpStatus.CONFLICT).json({
                msg: "هذا API موجود بالفعل",
                error: err.message
            });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // Ensure the session is ended
    }
};

exports.updateApi = async (req, res) => {
    const { _id, name, link, token, groupesApi, idCoin } = req.body;
    const session = await mongoose.startSession();

    try {
        // Validate the input data
        const { error } = validateApi({
            name, link, token, groupesApi, idCoin
        });
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message,
            });
        }

        await session.startTransaction(); // Begin the transaction

        // Update the API
        const api = await Api.findOneAndUpdate(
            { _id },
            { name, link, token, groupesApi, idCoin },
            { new: true, session }
        );

        if (!api) {
            await session.abortTransaction(); // Rollback if API is not found
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).json({
                msg: "لم يتم العثور على API لتحديثه",
            });
        }

        // Save the admin action as a notification
        const adminData = await Admin.findById(req.admin._id).session(session);
        const content = `${adminData.username} قام بتحديث API (${api.name})`;
        await saveNotification(req.admin, "Admin", "Admin", "reminder", content, true, null, null, session);

        await session.commitTransaction(); // Commit the transaction

        res.status(httpStatus.OK).send({
            msg: "تم تحديث API بنجاح",
            api,
            contentNotification: content,
        });

    } catch (err) {
        await session.abortTransaction(); // Rollback if an error occurs
        session.endSession();

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم أثناء تحديث API",
            error: err.message,
        });
    } finally {
        session.endSession(); // Ensure the session is ended
    }
};

exports.deleteApi = async (req, res) => {
    const { _id } = req.body;
    const session = await mongoose.startSession();

    try {
        await session.startTransaction(); // Begin the transaction

        // Find and "soft delete" the API
        const api = await Api.findOneAndUpdate(
            { _id },
            { isDeleted: true },
            { new: true, session }
        );

        if (!api) {
            await session.abortTransaction(); // Rollback if API is not found
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).send({
                msg: "لم يتم العثور على API لحذفه",
            });
        }

        // Save the admin action as a notification
        const adminData = await Admin.findById(req.admin._id).session(session);
        const content = `${adminData.username} قام بحذف API (${api.name})`;
        await saveNotification(req.admin, "Admin", "Admin", "reminder", content, true, null, null, session);

        await session.commitTransaction(); // Commit the transaction

        res.status(httpStatus.OK).send({
            msg: "تم حذف API بنجاح",
            api,
            contentNotification: content,
        });

    } catch (err) {
        await session.abortTransaction(); // Rollback if an error occurs
        session.endSession();

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم أثناء حذف API",
            error: err.message,
        });
    } finally {
        session.endSession(); // Ensure the session is ended
    }
};


exports.getApi = async (req, res) => {
    try {
        const apis = await Api.find({
            isDeleted: false
        }).populate("idCoin");
        res.status(httpStatus.OK).send(apis);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب API" });
    }
}