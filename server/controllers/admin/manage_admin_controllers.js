const { Admin, validateAdmin } = require('../../models/admin/admin');
const { File } = require("../../models/file/file");
const { Readable } = require('stream');
const bcrypt = require("bcrypt");
const httpStatus = require('http-status'); // Importing http-status package
const SALTROUNDS = Number(process.env.SALTROUNDS);
const { bucket } = require('../../server');
const { saveFile } = require('../../utils/saveFile');
const { saveNotification } = require('../../utils/constants');

exports.addAdmin = async (req, res) => {
    const admin = req.admin;
    const { file } = req;
    const { email, username, name, password } = req.body;

    try {
        let newFile
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket);
        }
        // Validate the admin data using Joi
        const { error } = validateAdmin(req.body);
        if (error) {
            console.log(error)
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message
            });
        }

        // Check if an admin with the same email or username already exists
        let existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
        if (existingAdmin) {
            return res.status(httpStatus.CONFLICT).json({
                msg: "البريد الإلكتروني أو اسم المستخدم موجود بالفعل"
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
            createdBy: admin._id
        });

        // Save the admin to the database
        await newAdmin.save();
        const populatedAdmin = await Admin.findById(newAdmin._id).populate('createdBy');

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام باضافة مسؤول جديد (${populatedAdmin.name})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);

        // Send response
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
                image: populatedAdmin.image
            },
        });
    } catch (err) {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
};

exports.updateAdmin = async (req, res) => {
    const {id, name, email, username } = req.body;
    const admin = req.admin;
    try {
        const adminUpdate = await Admin.findByIdAndUpdate(id, { name, email, username }, { new: true }).select("_id email username name");
        if (!adminUpdate) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على المسؤول" });
        }

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بتحديث معلومات المسؤول (${name})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);

        res.status(httpStatus.OK).send({ msg: "تم تحديث المسؤول بنجاح", admin: adminUpdate, responsableName: adminData.username });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في تحديث المسؤول" });
    }
};
exports.updatePassword = async (req, res) => {
    const { id, currentPassword, newPassword } = req.body;
    const admin = req.admin;
    try {
        const adminUpdate = await Admin.findById(id);
        if (!adminUpdate) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على المسؤول" });
        }

        const validPassword = await bcrypt.compare(currentPassword, adminUpdate.password);
        if (!validPassword) {
            return res.status(httpStatus.BAD_REQUEST).send({ msg: "كلمة المرور الحالية غير صحيحة" });
        }

        const salt = await bcrypt.genSalt(10);
        adminUpdate.password = await bcrypt.hash(newPassword, salt);
        await adminUpdate.save();

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بتغيير كلمة المرور الخاصه بي (${adminUpdate.name})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true)

        res.status(httpStatus.OK).send({ msg: "تم تحديث كلمة المرور بنجاح",username: adminUpdate.username, responsableName: adminData.username });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في تحديث كلمة المرور" });
    }
};
exports.blockAdmin = async (req, res) => {
    const { id, block } = req.body; // `block` is a boolean to block (true) or unblock (false)
    const admin = req.admin;

    try {
        const adminUpdate = await Admin.findByIdAndUpdate(id, { isBlocked: block }, { new: true }).select("_id email username name image");
        if (!adminUpdate) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على المسؤول" });
        }

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بتغيير حالة المسؤول (${adminUpdate.name})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true)

        const action = block ? "توقيف" : "فتح";

        res.status(httpStatus.OK).send({ msg: `تم ${action} بنجاح من قبل المسؤول`, admin: adminUpdate ,responsableName: adminData.username});
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "حدث خطأ أثناء تحديث حالة حظر المشرف" });
    }
};

exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;
    const loggedInAdminId = req.admin._id;

    try {
        if (id === loggedInAdminId) {
            return res.status(httpStatus.FORBIDDEN).send({ msg: "لا يمكنك حذف نفسك" });
        }

        const admin = await Admin.findByIdAndDelete(id);
        if (!admin) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على المسؤول" });
        }

        res.status(httpStatus.OK).send({ msg: "تم حذف المسؤول بنجاح" });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في حذف المسؤول" });
    }
};


exports.getAdmins = async (req, res) => {
    const { _id } = req.admin;
    try {
        const admins = await Admin.find().populate("createdBy").select("_id id email username name image isBlocked lastLogin createdBy createdAt");
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

        const admins = await Admin.find(searchCondition).populate("createdBy").select("_id id email username name image isBlocked lastLogin createdBy createdAt");

        if (admins.length === 0) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على أي مسؤولين" });
        }

        res.status(httpStatus.OK).send(admins);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في البحث عن المسؤولين" });
    }
};
