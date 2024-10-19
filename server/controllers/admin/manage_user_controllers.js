const { User, validateUser } = require('../../models/user/user');
const { File } = require("../../models/file/file");
const { Readable } = require('stream');
const bcrypt = require("bcrypt");
const httpStatus = require('http-status'); // Importing http-status package
const SALTROUNDS = Number(process.env.SALTROUNDS);
const { bucket } = require('../../server');
const { saveFile } = require('../../utils/saveFile');

exports.addUser = async (req, res) => {
    const { file } = req;
    const { email, username,firstName, lastName, phoneNumber, password } = req.body;

    try {
        let newFile
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket);
        }
        // Validate the User data using Joi
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: error.details[0].message
            });
        }

        // Check if an User with the same email or username already exists
        let existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(httpStatus.CONFLICT).json({
                message: "البريد الإلكتروني أو اسم المستخدم موجود بالفعل"
            });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, SALTROUNDS);

        // Create a new user
        const newUser = new User({
            email,
            username,
            firstName,
            lastName,
            phoneNumber,
            password: hashedPassword,
            image: newFile ? newFile._id : null,
        });

        // Save the user to the database
        await newUser.save();

        // Send response
        return res.status(httpStatus.CREATED).json({
            message: "تم إنشاء المستخدم بنجاح",
            user: newUser,
        });
    } catch (err) {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "خطأ في الخادم",
            error: err.message,
        });
    }
};

exports.blockUser = async (req, res) => {
    const { id } = req.params;
    const { block } = req.body; // `block` is a boolean to block (true) or unblock (false)

    try {
        const user = await User.findByIdAndUpdate(id, { isBlocked: block }, { new: true });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على المستخدم" });
        }

        const action = block ? "توقيف" : "فتح";
        res.status(httpStatus.OK).send({ msg: `تم ${action} بنجاح من قبل المستخدم`, user });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "حدث خطأ أثناء تحديث حالة حظر المستخدم" });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على المستخدم" });
        }

        res.status(httpStatus.OK).send({ msg: "تم حذف المستخدم بنجاح" });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في حذف المستخدم" });
    }
};


exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(httpStatus.OK).send(users);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب المستخدم" });
    }
};

exports.searchUser = async (req, res) => {
    const { query } = req.query; // Search term passed as a query parameter

    try {
        const users = await User.find({
            $or: [
                { email: { $regex: query, $options: "i" } },
                { username: { $regex: query, $options: "i" } },
            ]
        });

        if (users.length === 0) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على أي المستخدم" });
        }

        res.status(httpStatus.OK).send(users);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في البحث عن المستخدم" });
    }
};
