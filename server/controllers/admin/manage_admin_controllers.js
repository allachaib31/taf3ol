const { Admin, validateAdmin } = require('../../models/admin/admin');
const { File } = require("../../models/file/file");
const { Readable } = require('stream');
const bcrypt = require("bcrypt");
const httpStatus = require('http-status'); // Importing http-status package
const SALTROUNDS = Number(process.env.SALTROUNDS);
const { bucket } = require('../../server');
const { saveFile } = require('../../utils/saveFile');
const { saveNotification } = require('../../utils/constants');
const { default: mongoose } = require('mongoose');

exports.addAdmin = async (req, res) => {
    const admin = req.admin;
    const { file } = req;
    let { email, username, name, password, permission} = req.body;
    req.body.permission = JSON.parse(req.body.permission)
    const session = await mongoose.startSession();

    try {
        await session.startTransaction(); // Begin transaction

        let newFile;
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket); // File save remains outside the session
        }

        // Validate the admin data using Joi
        const { error } = validateAdmin(req.body);
        if (error) {
            await session.abortTransaction(); // Rollback on validation error
            session.endSession();
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message,
            });
        }

        // Check if an admin with the same email or username already exists
        let existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] }).session(session);
        if (existingAdmin) {
            await session.abortTransaction(); // Rollback if admin already exists
            session.endSession();
            return res.status(httpStatus.CONFLICT).json({
                msg: "البريد الإلكتروني أو اسم المستخدم موجود بالفعل",
            });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, SALTROUNDS);

        // Create a new Admin
        const newAdmin = new Admin({
            email,
            username,
            name,
            password: hashedPassword,
            image: newFile ? newFile._id : null,
            permission: JSON.parse(permission),
            createdBy: admin._id,
        });

        // Save the new admin within the session
        await newAdmin.save({ session });

        // Fetch the admin for populating references
        const populatedAdmin = await Admin.findById(newAdmin._id)
            .populate("createdBy")
            .session(session);

        // Save a notification for the admin creation
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام باضافة مسؤول جديد (${populatedAdmin.name})`;
        await saveNotification(admin, "Admin", "Admin", "reminder", content, true, null, null, session);

        await session.commitTransaction(); // Commit the transaction

        // Send success response
        return res.status(httpStatus.CREATED).json({
            msg: "تم إنشاء المسؤول بنجاح",
            newAdmin: {
                _id: populatedAdmin._id,
                id: populatedAdmin.id,
                name: populatedAdmin.name,
                username: populatedAdmin.username,
                email: populatedAdmin.email,
                createdAt: populatedAdmin.createdAt,
                createdBy: populatedAdmin.createdBy,
                lastLogin: populatedAdmin.lastLogin,
                permission: populatedAdmin.permission,
                image: populatedAdmin.image,
            },
        });

    } catch (err) {
        await session.abortTransaction(); // Rollback on error
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        session.endSession(); // Ensure session is ended
    }
};


exports.updateAdmin = async (req, res) => {
    const { id, name, email, username, permission } = req.body;
    const admin = req.admin;
    const session = await mongoose.startSession();

    try {
        await session.startTransaction(); // Begin transaction

        // Update the admin
        const adminUpdate = await Admin.findByIdAndUpdate(
            id,
            { name, email, username, permission },
            { new: true, session }
        ).select("_id email username name permission");

        if (!adminUpdate) {
            await session.abortTransaction(); // Rollback if admin not found
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على المسؤول" });
        }

        // Fetch the responsible admin data
        const adminData = await Admin.findById(admin._id).session(session);
        const content = `${adminData.username} قام بتحديث معلومات المسؤول (${name})`;

        // Save a notification about the update
        await saveNotification(admin, "Admin", "Admin", "reminder", content, true, null, null, session);

        await session.commitTransaction(); // Commit transaction

        // Send response
        res.status(httpStatus.OK).send({
            msg: "تم تحديث المسؤول بنجاح",
            admin: adminUpdate,
            responsableName: adminData.username,
        });
    } catch (err) {
        await session.abortTransaction(); // Rollback on error
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في تحديث المسؤول", error: err.message });
    } finally {
        session.endSession(); // Ensure session is ended
    }
};

exports.updatePassword = async (req, res) => {
    const { id, currentPassword, newPassword } = req.body;
    const admin = req.admin;
    const session = await mongoose.startSession();

    try {
        await session.startTransaction(); // Begin transaction

        // Find the admin whose password is to be updated
        const adminUpdate = await Admin.findById(id).session(session);
        if (!adminUpdate) {
            await session.abortTransaction(); // Rollback if admin not found
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على المسؤول" });
        }

        // Validate the current password
        const validPassword = await bcrypt.compare(currentPassword, adminUpdate.password);
        if (!validPassword) {
            await session.abortTransaction(); // Rollback on invalid password
            session.endSession();
            return res.status(httpStatus.BAD_REQUEST).send({ msg: "كلمة المرور الحالية غير صحيحة" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        adminUpdate.password = await bcrypt.hash(newPassword, salt);
        await adminUpdate.save({ session }); // Save with session

        // Log the action in notifications
        const adminData = await Admin.findById(admin._id).session(session);
        const content = `${adminData.username} قام بتغيير كلمة المرور الخاصه بي (${adminUpdate.name})`;
        await saveNotification(admin, "Admin", "Admin", "reminder", content, true, null, null, session);

        await session.commitTransaction(); // Commit transaction

        // Respond with success
        res.status(httpStatus.OK).send({
            msg: "تم تحديث كلمة المرور بنجاح",
            username: adminUpdate.username,
            responsableName: adminData.username,
        });
    } catch (err) {
        await session.abortTransaction(); // Rollback on error
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في تحديث كلمة المرور", error: err.message });
    } finally {
        session.endSession(); // Ensure session is ended
    }
};

exports.blockAdmin = async (req, res) => {
    const { id, block } = req.body; // `block` is a boolean to block (true) or unblock (false)
    const admin = req.admin;
    const session = await mongoose.startSession();

    try {
        await session.startTransaction(); // Start a transaction

        // Update the admin's `isBlocked` status
        const adminUpdate = await Admin.findByIdAndUpdate(
            id,
            { isBlocked: block },
            { new: true, session } // Use the session
        ).select("_id email username name image");

        if (!adminUpdate) {
            await session.abortTransaction(); // Rollback if the admin is not found
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على المسؤول" });
        }

        // Log the action in notifications
        const adminData = await Admin.findById(admin._id).session(session);
        const content = `${adminData.username} قام بتغيير حالة المسؤول (${adminUpdate.name})`;
        await saveNotification(admin, "Admin", "Admin", "reminder", content, true, null, null, session);

        // Determine the action message
        const action = block ? "توقيف" : "فتح";

        await session.commitTransaction(); // Commit the transaction

        res.status(httpStatus.OK).send({
            msg: `تم ${action} بنجاح من قبل المسؤول`,
            admin: adminUpdate,
            responsableName: adminData.username,
        });
    } catch (err) {
        await session.abortTransaction(); // Rollback on error
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "حدث خطأ أثناء تحديث حالة حظر المشرف", error: err.message });
    } finally {
        session.endSession(); // Ensure the session is ended
    }
};


exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;
    const loggedInAdminId = req.admin._id;
    const session = await mongoose.startSession();

    try {
        await session.startTransaction(); // Start a transaction

        // Prevent deleting the logged-in admin
        if (id === loggedInAdminId) {
            await session.abortTransaction(); // Rollback if trying to delete self
            session.endSession();
            return res.status(httpStatus.FORBIDDEN).send({ msg: "لا يمكنك حذف نفسك" });
        }

        // Attempt to delete the admin
        const admin = await Admin.findByIdAndDelete(id).session(session);
        if (!admin) {
            await session.abortTransaction(); // Rollback if admin not found
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على المسؤول" });
        }

        // Log the action in the notifications
        const adminData = await Admin.findById(req.admin._id).session(session);
        const content = `${adminData.username} قام بحذف المسؤول (${admin.username})`;
        await saveNotification(req.admin, "Admin", "Admin", "reminder", content, true, null, null, session);

        await session.commitTransaction(); // Commit the transaction

        res.status(httpStatus.OK).send({ msg: "تم حذف المسؤول بنجاح" });
    } catch (err) {
        await session.abortTransaction(); // Rollback on error
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في حذف المسؤول", error: err.message });
    } finally {
        session.endSession(); // Ensure session is ended
    }
};



exports.getAdmins = async (req, res) => {
    const { _id } = req.admin;
    try {
        const admins = await Admin.find().populate("createdBy").select("_id id email username name image isBlocked lastLogin permission createdBy createdAt");
        res.status(httpStatus.OK).send(admins);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب المسؤولين" });
    }
};

exports.searchAdmin = async (req, res) => {
    const { query } = req.query; // Search term passed as a query parameter

    try {
        // If query is empty, return all admins
        const searchCondition = query
            ? {
                $or: [
                    { name: { $regex: query, $options: "i" } }, // Case-insensitive search
                    { email: { $regex: query, $options: "i" } },
                    { username: { $regex: query, $options: "i" } },
                ],
            }
            : {}; // If no query, return all admins by setting empty filter

        const admins = await Admin.find(searchCondition).populate("createdBy").select("_id id email username name image isBlocked lastLogin permission createdBy createdAt");

        if (admins.length === 0) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على أي مسؤولين" });
        }

        res.status(httpStatus.OK).send(admins);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في البحث عن المسؤولين" });
    }
};
