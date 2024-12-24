const { User, validateUser } = require('../../models/user/user');
const { File } = require("../../models/file/file");
const { Readable } = require('stream');
const bcrypt = require("bcrypt");
const httpStatus = require('http-status'); // Importing http-status package
const SALTROUNDS = Number(process.env.SALTROUNDS);
const { bucket } = require('../../server');
const { saveFile } = require('../../utils/saveFile');
const { Admin } = require('../../models/admin/admin');
const { Expenses } = require('../../models/expenses/expenses');
const { FinancialMovements } = require('../../models/financialMovements/financialMovements');
const { saveNotification } = require('../../utils/constants');

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
        const expenses = new Expenses({
            idUser: newUser._id
        });
        newUser.idExpenses = expenses._id;
        // Save the user to the database
        await newUser.save();
        await expenses.save();

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام باضافة عضو جديد (${newUser.username})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);


        // Send response
        return res.status(httpStatus.CREATED).json({
            msg: "تم إنشاء المستخدم بنجاح",
            notificationMsg: content,
            user: {
                _id: newUser._id,
                id: newUser.id,
                idExpenses: expenses,
                email: newUser.email,
                username: newUser.username,
                firstName: newUser,firstName,
                lastName: newUser.lastName,
                phoneNumber: newUser.phoneNumber,
                image: newUser.image,
                status: newUser.status,
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
    const admin = req.admin;
    try {
        const user = await User.findByIdAndUpdate(_id, { status: status }, { new: true }).select("_id id idExpenses email username firstName lastName phoneNumber image status discount createdAt").populate("idExpenses");
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على المستخدم" });
        }

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بتحديث حالة العضو (${user.username})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);

        res.status(httpStatus.OK).send({ msg: `تم تحديد حالة المستخدم بنجاح`, user, responsableName: adminData.username });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "حدث خطأ أثناء تحديث حالة المستخدم" });
    }
};

exports.deleteUsers = async (req, res) => {
    const users = req.body; // Expect `users` to be an array of user IDs
    const admin = req.admin;
    console.log(users)
    try {
        if (!users || !Array.isArray(users) || users.length === 0) {
            return res.status(httpStatus.BAD_REQUEST).send({ msg: "قائمة المستخدمين فارغة أو غير صالحة" });
        }

        // Step 1: Fetch the users to get their usernames
        const userDocs = await User.find({ _id: { $in: users }, isDeleted: false }, 'username');
        if (!userDocs || userDocs.length === 0) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على المستخدمين" });
        }

        // Extract usernames for the notification
        const deletedUsernames = userDocs.map(user => user.username).join(', ');

        // Step 2: Update the users
        const updateResult = await User.updateMany(
            { _id: { $in: users } },  // Filter: Match all users whose _id is in the array
            { $set: { isDeleted: true } } // Update: Set isDeleted to true
        );

        // Step 3: Get the admin responsible
        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بحذف المستخدمين: ${deletedUsernames}`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);


        // Step 6: Send a successful response
        res.status(httpStatus.OK).send({
            msg: "تم حذف الأعضاء بنجاح",
            notificationMsg: content,
            updatedCount: updateResult.nModified,
            responsableName: adminData.username,
            deletedUsers: deletedUsernames
        });

    } catch (err) {
        console.error("Error in deleteUsers:", err.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "حدث خطأ أثناء حذف المستخدمين", error: err.message });
    }
};

exports.addBalance = async (req, res) => {
    const admin = req.admin;
    const { idUser, amount } = req.body;

    try {
        // Validate the input data
        if (!idUser || !amount || Number(amount) <= 0) {
            return res.status(httpStatus.BAD_REQUEST).send({ msg: "بيانات غير صحيحة" });
        }

        // Find the user
        const user = await User.findById(idUser);
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "المستخدم غير موجود" });
        }

        const expenses = await Expenses.findOne({
            idUser
        });
        const currentBalance = expenses.balance;
        expenses.balance += Number(amount);
        expenses.totalShipping += Number(amount);
        await expenses.save();

        // Create a financial movement record
        const financialMovement = new FinancialMovements({
            idUser,
            typeMovement: "اضافة رصيد", // Type of movement (e.g., debit)
            value: amount, // Negative amount
            balanceBefore: currentBalance,
            balanceAfter: expenses.balance,
            reply: "اضافة رصيد",
            type: "Shipping operations", // Specify type
            orderStatus: "Accepted", // Movement status
        });

        await financialMovement.save();

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام باضافة رصيد (${user.username})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);
        await saveNotification(admin, 'Admin', 'User', 'reminder', `قام الادمن باضافة رصيد`, false, user._id, "The admin added credit");

        // Respond with success
        res.status(httpStatus.CREATED).send({
            msg: "تم خصم الرصيد بنجاح",
            notificationMsg: content,
            financialMovement,
            expenses
        });
    } catch (err) {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "حدث خطأ أثناء معالجة العملية المالية" });
    }
}

exports.addNegativeBalance = async (req, res) => {
    const admin = req.admin;
    const { idUser, amount } = req.body;

    try {
        // Validate the input data
        if (!idUser || !amount || Number(amount) > 0) {
            return res.status(httpStatus.BAD_REQUEST).send({ msg: "بيانات غير صحيحة" });
        }

        // Find the user
        const user = await User.findById(idUser);
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "المستخدم غير موجود" });
        }


        const expenses = await Expenses.findOne({
            idUser
        });
        expenses.debitBalance = amount;
        await expenses.save();

        // Create a financial movement record
        const financialMovement = new FinancialMovements({
            idUser,
            typeMovement: "رصيد سالب", // Type of movement (e.g., debit)
            value: amount, // Negative amount
            balanceBefore: expenses.balance,
            balanceAfter: expenses.balance,
            reply: "تغير رصيد سالب",
            type: "Money debt", // Specify type
            orderStatus: "Accepted", // Movement status
        });

        await financialMovement.save();

        const adminData = await Admin.findById(admin._id);
        let content = `${adminData.username} قام بتغير رصيد سالب (${user.username})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true);
        await saveNotification(admin, 'Admin', 'User', 'reminder', `قام الادمن بتغير رصيد سالب`, false, user._id, "The admin changed the negative balance.");

        // Respond with success
        res.status(httpStatus.CREATED).send({
            msg: "تم خصم الرصيد بنجاح",
            notificationMsg: content,
            financialMovement,
            expenses
        });
    } catch (err) {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "حدث خطأ أثناء معالجة العملية المالية" });
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

    // Pagination logic
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;

    try {
        let users;
        let query = {
            isDeleted: false
        }
        // Fetch users with sorting, pagination, and field selection
        if(limit == "ALL") {
            users = await User.find(query)
            .select("_id id idExpenses email username firstName lastName phoneNumber image status createdAt")
            .populate("idExpenses")
            .sort(sort)
        } else {
            users = await User.find(query)
            .select("_id id idExpenses email username firstName lastName phoneNumber image status createdAt")
            .populate("idExpenses")
            .sort(sort)
            .skip(skip)
            .limit(limit);
        }

        // Count total documents for pagination metadata
        const totalDocuments = await User.countDocuments();

        res.status(httpStatus.OK).send({
            total: totalDocuments,
            page,
            limit,
            totalPages: Math.ceil(totalDocuments / limit),
            users,
        });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب المستخدم" });
    }
};


exports.searchUser = async (req, res) => {
    const { query } = req.query; // Search term passed as a query parameter
    try {
        const users = await User.find({
            isDeleted: false,
            $or: [
                { email: { $regex: query, $options: "i" } },
                { username: { $regex: query, $options: "i" } },
                { firstName: { $regex: query, $options: "i" } },
                { lastName: { $regex: query, $options: "i" } },
                { phoneNumber: { $regex: query, $options: "i" } },
            ]
        }).select("_id id idExpenses email username firstName lastName phoneNumber image status createdAt").populate("idExpenses");
        if (users.length === 0) {
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على أي المستخدم" });
        }

        res.status(httpStatus.OK).send({
            users
        });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في البحث عن المستخدم" });
    }
};

exports.getUserData = async (req, res) => {
    const { id } = req.query;
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;
    try {
        let user = await User.findById(id).select('-password').populate("idExpenses"); // Exclude the password field
        if (!user || user.isDeleted) {
            return res.status(404).send({ msg: "User not found" });
        }
        let financialMovements;
        const query = {
            idUser: id,
            createdAt: {
                $gte: new Date(),
                $lte: new Date()
            }
        }
        if(limit == "ALL") {
            financialMovements = await FinancialMovements.find(query);
        } else {
            financialMovements = await FinancialMovements.find(query)
            .skip(skip)
            .limit(limit);;
        }
        const totalDocuments = await FinancialMovements.countDocuments();
        res.status(httpStatus.OK).send({
            user,
            total: totalDocuments,
            page,
            limit,
            totalPages: Math.ceil(totalDocuments / limit),
            financialMovements
        });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب المستخدم" });
    }
}

exports.getFinancialUser = async (req, res) => {
    const { startDate, endDate, typeFinancial, searchText, idUser } = req.query;
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;

    try {
        let query = { idUser };

        if (typeFinancial && typeFinancial !== "All") {
            query.type = typeFinancial;
        }

        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        if (searchText) {
            const searchRegex = { $regex: searchText, $options: "i" };
            query.$or = [
                { id: searchRegex },
                { typeMovement: searchRegex },
                { reply: searchRegex },
                { type: searchRegex },
                { orderStatus: searchRegex },
            ];
        }

        let financialMovements;
        if(limit == "ALL") {
            financialMovements = await FinancialMovements.find(query);
        } else {
            financialMovements = await FinancialMovements.find(query)
            .skip(skip)
            .limit(limit);;
        }
        const totalDocuments = await FinancialMovements.countDocuments();
        res.status(httpStatus.OK).send({
            financialMovements,
            total: totalDocuments,
            page,
            limit,
            totalPages: Math.ceil(totalDocuments / limit),
        });
    } catch (err) {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب الحركات المالية" });
    }
};
