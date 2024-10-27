const { User, validateUser } = require('../../models/user/user');
const { File } = require("../../models/file/file");
const { Readable } = require('stream');
const bcrypt = require("bcrypt");
const httpStatus = require('http-status'); // Importing http-status package
const SALTROUNDS = Number(process.env.SALTROUNDS);
const { bucket } = require('../../server');
const { saveFile } = require('../../utils/saveFile');
const { Notification, validateNotification } = require('../../models/notifucation/notifucation');
const { Admin } = require('../../models/admin/admin');

exports.addUser = async (req, res) => {
    const admin = req.admin;
    const { file } = req;
    const { email, username, firstName, lastName, phoneNumber, password } = req.body;

    try {
        let newFile
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket);
        }
        // Validate the User data using Joi
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message
            });
        }

        // Check if an User with the same email or username already exists
        let existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(httpStatus.CONFLICT).json({
                msg: "البريد الإلكتروني أو اسم المستخدم موجود بالفعل"
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
        const adminSender = await Admin.findById(admin._id);
        const notificationData = {
            senderId: adminSender._id,
            senderModel: 'Admin',
            receiverModel: 'Admin',
            type: 'reminder',
            content: `${admin.username} قام باضافة عضو جديد (${newUser.username})`,
            isGlobal: true 
        };
        const { errorNotification } = validateNotification(notificationData);
        if (errorNotification) {
            throw new Error(errorNotification.details[0].message);
        } else {
            const notification = new Notification(notificationData);
            await notification.save();
        }

        // Send response
        return res.status(httpStatus.CREATED).json({
            msg: "تم إنشاء المستخدم بنجاح",
            user: {
                _id: newUser._id,
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                firstName: newUser,firstName,
                lastName: newUser.lastName,
                phoneNumber: newUser.phoneNumber,
                image: newUser.image,
                balance: newUser.balance,
                moneySpent: newUser.moneySpent,
                status: newUser.status,
                discount: newUser.discount,
                createdAt: newUser.createdAt,
            },
        });
    } catch (err) {
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
};

exports.changeStatus = async (req, res) => {
    const { _id, status } = req.body; // `block` is a boolean to block (true) or unblock (false)
    const idAdmin = req.admin._id;
    try {
        const user = await User.findByIdAndUpdate(_id, { status: status }, { new: true }).select("_id id email username firstName lastName phoneNumber image balance moneySpent status discount createdAt");
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على المستخدم" });
        }
        const responsable = await Admin.findById(idAdmin);
        const notificationData = {
            senderId: idAdmin,
            senderModel: 'Admin',
            receiverModel: 'Admin',
            type: 'reminder',
            content: `${responsable.username} قام بتحديث حالة العضو (${user.username})`,
            isGlobal: true
        };
        const { errorNotification } = validateNotification(notificationData);
        if (errorNotification) {
            throw new Error(errorNotification.details[0].message);
        } else {
            const notification = new Notification(notificationData);
            await notification.save();
        }
        res.status(httpStatus.OK).send({ msg: `تم تحديد حالة المستخدم بنجاح`, user, responsableName: responsable.username });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "حدث خطأ أثناء تحديث حالة المستخدم" });
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

    // Create a sorting object based on the query parameters
    const sort = {};
    
    if (req.query.idDirection) {
        sort.id = req.query.idDirection === '1' ? 1 : -1;
    }
    if (req.query.balance) {
        sort.balance = req.query.balance === '1' ? 1 : -1;
    }
    if (req.query.moneySpent) {
        sort.moneySpent = req.query.moneySpent === '1' ? 1 : -1;
    }
    if (req.query.createdAt) {
        sort.createdAt = req.query.createdAt === '1' ? 1 : -1;
    }
    if (req.query.lastLogin) {
        sort.lastLogin = req.query.lastLogin === '1' ? 1 : -1;
    }
    if (req.query.discount) {
        sort.discount = req.query.discount === '1' ? 1 : -1;
    }
    try {
        console.log(sort)
        const users = await User.find().select("_id id email username firstName lastName phoneNumber image balance moneySpent status discount createdAt").sort(sort);;
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
        }).select("_id id email username firstName lastName phoneNumber image balance moneySpent status discount createdAt");

        if (users.length === 0) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على أي المستخدم" });
        }

        res.status(httpStatus.OK).send(users);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في البحث عن المستخدم" });
    }
};
