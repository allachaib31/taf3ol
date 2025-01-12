const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { PaymentGateway, validatePaymentGateway } = require("../../models/paymentGateway/paymentGateway");
const { saveFile } = require("../../utils/saveFile");
const { File } = require("../../models/file/file");
const { Readable } = require("stream");
const { bucket } = require('../../server');
const { Admin } = require("../../models/admin/admin");
const { saveNotification } = require("../../utils/constants");

exports.addPaymentGateway = async (req, res) => {
    const admin = req.admin;
    let { body, file } = req;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let newFile;
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket); // Assuming saveFile doesn't require session
        }
        if(body.requirement)  body.requirement = body.requirement.split(",")
        // Validate the Payment Gateway data using Joi
        const { error } = validatePaymentGateway({...body, image: newFile._id.toString()});
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message,
            });
        }

        // Check if a Payment Gateway with the same name already exists
        const existingPaymentGateway = await PaymentGateway.findOne({ name: body.name }).session(session);
        if (existingPaymentGateway) {
            return res.status(httpStatus.CONFLICT).json({
                msg: "بوابة الدفع بهذا الاسم موجودة بالفعل",
            });
        }

        // Create a new Payment Gateway
        const paymentGateway = new PaymentGateway({...body, image: newFile._id});

        // Save the Payment Gateway
        await paymentGateway.save({ session });

        // Add admin notification
        const adminData = await Admin.findById(admin._id).session(session);
        const content = `${adminData.username} قام بإضافة بوابة دفع جديدة (${paymentGateway.name})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();

        // Send response
        res.status(httpStatus.CREATED).json({
            msg: "تمت إضافة بوابة الدفع بنجاح",
            notificationMsg: content,
            paymentGateway,
        });
    } catch (err) {
        // Abort the transaction on error
        await session.abortTransaction();
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        // End the session
        session.endSession();
    }
};

exports.updatePaymentGateway = async (req, res) => {
    const admin = req.admin;
    const { id } = req.query;
    let { body, file } = req;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let newFile;
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket); // Assuming saveFile doesn't require session
            body.image = newFile._id.toString();
        }
        if(body.requirement)  body.requirement = body.requirement.split(",")
        // Validate the Payment Gateway data using Joi
        const { error } = validatePaymentGateway(body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message,
            });
        }

        // Update the Payment Gateway
        const updatedPaymentGateway = await PaymentGateway.findByIdAndUpdate(id, body, {
            new: true,
        }).session(session);

        if (!updatedPaymentGateway) {
            return res.status(httpStatus.NOT_FOUND).json({
                msg: "لم يتم العثور على بوابة الدفع",
            });
        }

        // Add admin notification
        const adminData = await Admin.findById(admin._id).session(session);
        const content = `${adminData.username} قام بتحديث بوابة الدفع (${updatedPaymentGateway.name})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();

        // Send response
        res.status(httpStatus.OK).json({
            msg: "تم تحديث بوابة الدفع بنجاح",
            notificationMsg: content,
            paymentGateway: updatedPaymentGateway,
        });
    } catch (err) {
        // Abort the transaction on error
        await session.abortTransaction();
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        // End the session
        session.endSession();
    }
};

exports.deletePaymentGateway = async (req, res) => {
    const admin = req.admin;
    const { id } = req.query;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find and delete the Payment Gateway
        const deletedPaymentGateway = await PaymentGateway.findByIdAndUpdate(id, {
            isDeleted: true
        }).session(session);

        if (!deletedPaymentGateway) {
            return res.status(httpStatus.NOT_FOUND).json({
                msg: "لم يتم العثور على بوابة الدفع",
            });
        }

        // Add admin notification
        const adminData = await Admin.findById(admin._id).session(session);
        const content = `${adminData.username} قام بحذف بوابة الدفع (${deletedPaymentGateway.name})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();

        // Send response
        res.status(httpStatus.OK).json({
            msg: "تم حذف بوابة الدفع بنجاح",
            notificationMsg: content,
        });
    } catch (err) {
        // Abort the transaction on error
        await session.abortTransaction();
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        // End the session
        session.endSession();
    }
};

exports.getPaymentGateway = async (req, res) => {
    try {
        const paymentGateways = await PaymentGateway.find({
            isDeleted: false
        });

        res.status(httpStatus.OK).json({
            msg: "تم استرجاع بوابات الدفع بنجاح",
            paymentGateways,
        });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
};
