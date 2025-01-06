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
const { LevelUserGroup } = require('../../models/levelUserGroup/levelUserGroup');
const { TypeService } = require('../../models/typeService/typeService');
const { GroupMoney } = require('../../models/groupMoney/groupMoney');
const { generateNextId } = require('../../utils/generateNextId');
const { default: mongoose } = require('mongoose');
const { CustomPrice, validationCustomPrice } = require('../../models/customPrices/customPrices');

exports.addUser = async (req, res) => {
    const admin = req.admin;
    const { file } = req;
    const { email, username, firstName, lastName, phoneNumber, password } = req.body;

    // Start a session for transaction management
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let newFile;
        if (file) {
            newFile = await saveFile(file, File, Readable, bucket); // Assuming saveFile doesn't require session
        }

        // Validate the User data using Joi
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: error.details[0].message,
            });
        }

        // Check if a User with the same email or username already exists
        let existingUser = await User.findOne({ $or: [{ email }, { username }, { phoneNumber }] }).session(session);
        if (existingUser) {
            return res.status(httpStatus.CONFLICT).json({
                msg: "البريد الإلكتروني أو اسم المستخدم او رقم الهاتف موجود بالفعل",
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
            idUser: newUser._id,
        });
        newUser.idExpenses = expenses._id;

        // Retrieve services and related groups
        const typeService = await TypeService.find({ isDeleted: false }).session(session);
        for (let i = 0; i < typeService.length; i++) {
            const groupMoney = await GroupMoney.find({
                idService: typeService[i]._id,
                isDeleted: false,
            }).session(session);
            const id = await generateNextId("LevelUserGroup", "LG", session);
            const levelUserGroup = new LevelUserGroup({
                id,
                idUser: newUser._id,
                idService: typeService[i]._id,
                levelGroup: groupMoney[0]._id,
                points: 0
            });
            await levelUserGroup.save({ session });
        }

        // Save the user and expenses
        await newUser.save({ session });
        await expenses.save({ session });

        // Add admin notification
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام باضافة عضو جديد (${newUser.username})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();

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
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                phoneNumber: newUser.phoneNumber,
                image: newUser.image,
                status: newUser.status,
                createdAt: newUser.createdAt,
            },
        });
    } catch (err) {
        // If any error occurs, abort the transaction
        await session.abortTransaction();
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        // End the session
        session.endSession();
    }
};
exports.changeStatus = async (req, res) => {
    const { _id, status } = req.body; // `status` determines the block/unblock state
    const admin = req.admin;

    const session = await mongoose.startSession(); // Start a session for transaction management

    try {
        await session.startTransaction(); // Begin the transaction

        // Update the user status within the transaction
        const user = await User.findByIdAndUpdate(
            _id,
            { status: status },
            { new: true, session }
        )
            .select("_id id idExpenses email username firstName lastName phoneNumber image status discount createdAt")
            .populate("idExpenses");

        if (!user) {
            await session.abortTransaction(); // Rollback the transaction if the user is not found
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على المستخدم" });
        }

        // Fetch the admin data and create a notification
        const adminData = await Admin.findById(admin._id).session(session);
        const content = `${adminData.username} قام بتحديث حالة العضو (${user.username})`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        await session.commitTransaction(); // Commit the transaction if all operations succeed
        session.endSession();

        res.status(httpStatus.OK).send({
            msg: `تم تحديد حالة المستخدم بنجاح`,
            user,
            responsableName: adminData.username,
        });
    } catch (err) {
        await session.abortTransaction(); // Rollback the transaction in case of error
        session.endSession();

        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            msg: "حدث خطأ أثناء تحديث حالة المستخدم",
            error: err.message,
        });
    }
};


exports.deleteUsers = async (req, res) => {
    const users = req.body; // Expect `users` to be an array of user IDs
    const admin = req.admin;

    const session = await mongoose.startSession(); // Start a session for transaction management

    try {
        if (!users || !Array.isArray(users) || users.length === 0) {
            return res.status(httpStatus.BAD_REQUEST).send({ msg: "قائمة المستخدمين فارغة أو غير صالحة" });
        }

        await session.startTransaction(); // Begin the transaction

        // Step 1: Fetch the users to get their usernames within the session
        const userDocs = await User.find({ _id: { $in: users }, isDeleted: false }, 'username').session(session);
        if (!userDocs || userDocs.length === 0) {
            await session.abortTransaction(); // Rollback the transaction if no users are found
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على المستخدمين" });
        }

        // Extract usernames for the notification
        const deletedUsernames = userDocs.map(user => user.username).join(', ');

        // Step 2: Update the users within the session
        const updateResult = await User.updateMany(
            { _id: { $in: users } }, // Filter: Match all users whose _id is in the array
            { $set: { isDeleted: true } }, // Update: Set isDeleted to true
            { session }
        );

        // Step 3: Get the admin responsible within the session
        const adminData = await Admin.findById(admin._id).session(session);
        const content = `${adminData.username} قام بحذف المستخدمين: ${deletedUsernames}`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        await session.commitTransaction(); // Commit the transaction if all operations succeed
        session.endSession();

        // Step 6: Send a successful response
        res.status(httpStatus.OK).send({
            msg: "تم حذف الأعضاء بنجاح",
            notificationMsg: content,
            updatedCount: updateResult.modifiedCount, // Use modifiedCount to reflect the updated count
            responsableName: adminData.username,
            deletedUsers: deletedUsernames,
        });
    } catch (err) {
        await session.abortTransaction(); // Rollback the transaction in case of an error
        session.endSession();

        console.error("Error in deleteUsers:", err.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            msg: "حدث خطأ أثناء حذف المستخدمين",
            error: err.message,
        });
    }
};


exports.addBalance = async (req, res) => {
    const admin = req.admin;
    const { idUser, amount } = req.body;

    const session = await mongoose.startSession(); // Start a session for transaction management

    try {
        // Validate the input data
        if (!idUser || !amount || Number(amount) <= 0) {
            return res.status(httpStatus.BAD_REQUEST).send({ msg: "بيانات غير صحيحة" });
        }

        await session.startTransaction(); // Begin the transaction

        // Find the user within the session
        const user = await User.findById(idUser).session(session);
        if (!user) {
            await session.abortTransaction();
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).send({ msg: "المستخدم غير موجود" });
        }

        // Find the user's expenses within the session
        const expenses = await Expenses.findOne({ idUser }).session(session);
        if (!expenses) {
            await session.abortTransaction();
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).send({ msg: "لم يتم العثور على النفقات" });
        }

        const currentBalance = expenses.balance;
        expenses.balance += Number(amount);
        expenses.totalShipping += Number(amount);
        await expenses.save({ session });

        // Create a financial movement record within the session
        const financialMovement = new FinancialMovements({
            idUser,
            typeMovement: "اضافة رصيد",
            value: amount,
            balanceBefore: currentBalance,
            balanceAfter: expenses.balance,
            reply: "اضافة رصيد",
            type: "Shipping operations",
            orderStatus: "Accepted",
        });
        await financialMovement.save({ session });

        // Fetch admin data within the session
        const adminData = await Admin.findById(admin._id).session(session);
        const content = `${adminData.username} قام باضافة رصيد (${user.username})`;

        // Save notifications within the session
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);
        await saveNotification(admin, 'Admin', 'User', 'reminder', `قام الادمن باضافة رصيد`, false, user._id, "The admin added credit", session);

        await session.commitTransaction(); // Commit the transaction if all operations succeed
        session.endSession();

        // Respond with success
        res.status(httpStatus.CREATED).send({
            msg: "تم اضافة الرصيد بنجاح",
            notificationMsg: content,
            financialMovement,
            expenses,
        });
    } catch (err) {
        await session.abortTransaction(); // Rollback the transaction in case of an error
        session.endSession();

        console.error("Error in addBalance:", err.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "حدث خطأ أثناء معالجة العملية المالية", error: err.message });
    }
};

exports.addNegativeBalance = async (req, res) => {
    const admin = req.admin;
    const { idUser, amount } = req.body;

    const session = await mongoose.startSession(); // Start a session for transaction management

    try {
        // Validate the input data
        if (!idUser || !amount || Number(amount) > 0) {
            return res.status(httpStatus.BAD_REQUEST).send({ msg: "بيانات غير صحيحة" });
        }

        await session.startTransaction(); // Begin the transaction

        // Find the user within the session
        const user = await User.findById(idUser).session(session);
        if (!user) {
            await session.abortTransaction();
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).send({ msg: "المستخدم غير موجود" });
        }

        // Find the user's expenses within the session
        const expenses = await Expenses.findOne({ idUser }).session(session);
        if (!expenses) {
            await session.abortTransaction();
            session.endSession();
            return res.status(httpStatus.NOT_FOUND).send({ msg: "النفقات غير موجودة" });
        }

        expenses.debitBalance = amount;
        await expenses.save({ session });

        // Create a financial movement record within the session
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

        await financialMovement.save({ session });

        // Fetch admin data within the session
        const adminData = await Admin.findById(admin._id).session(session);
        const content = `${adminData.username} قام بتغير رصيد سالب (${user.username})`;

        // Save notifications within the session
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);
        await saveNotification(admin, 'Admin', 'User', 'reminder', `قام الادمن بتغير رصيد سالب`, false, user._id, "The admin changed the negative balance.", session);

        await session.commitTransaction(); // Commit the transaction if all operations succeed
        session.endSession();

        // Respond with success
        res.status(httpStatus.CREATED).send({
            msg: "تم تغيير الرصيد السالب بنجاح",
            notificationMsg: content,
            financialMovement,
            expenses
        });
    } catch (err) {
        await session.abortTransaction(); // Rollback the transaction in case of an error
        session.endSession();

        console.error("Error in addNegativeBalance:", err.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "حدث خطأ أثناء معالجة العملية المالية", error: err.message });
    }
};

exports.updateLevelUserGroup = async (req, res) => {
    const admin = req.admin;
    const updates = req.body; // Assume req.body is an array of updates


    try {
        const session = await mongoose.startSession(); // Start a MongoDB session
        session.startTransaction(); // Start a transaction

        // Validate input
        if (!Array.isArray(updates) || updates.length === 0) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .send({ msg: 'يجب أن يكون نص الطلب عبارة عن مصفوفة غير فارغة' });
        }

        for (const { levelGroup, idNewGroup, _id } of updates) {
            if (!levelGroup || !idNewGroup) {
                await session.abortTransaction();
                session.endSession();
                return res
                    .status(httpStatus.BAD_REQUEST)
                    .send({ msg: 'يجب أن يكون لكل عنصر معرف ومعرف مجموعة جديدة' });
            }

            // Check if the new levelGroup exists in GroupMoney
            const newGroup = await GroupMoney.findById(idNewGroup).session(session);
            if (!newGroup) {
                await session.abortTransaction();
                session.endSession();
                return res
                    .status(httpStatus.NOT_FOUND)
                    .send({ msg: `لم يتم العثور على GroupMoney مع المعرف ${idNewGroup}` });
            }

            // Update the levelGroup field in LevelUserGroup
            const updatedGroup = await LevelUserGroup.findOneAndUpdate(
                { _id }, // Match the document by `id`
                { levelGroup: idNewGroup, points: newGroup.meritValue }, // Update the `levelGroup`
                { new: true, session } // Include session for atomicity
            );

            if (!updatedGroup) {
                await session.abortTransaction();
                session.endSession();
                return res
                    .status(httpStatus.NOT_FOUND)
                    .send({ msg: `لم يتم العثور على LevelUserGroup ذات المعرف ${_id}` });
            }
        }

        const adminData = await Admin.findById(admin._id).session(session); // Fetch within the transaction
        let content = `${adminData.username} قام بحديث مستويات الاعضاء بنجاح`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(httpStatus.OK).send({
            msg: 'تم تحديث كافة المستويات بنجاح',
        });
    } catch (err) {
        // Rollback the transaction in case of an error
        await session.abortTransaction();
        session.endSession();

        console.error('Error updating LevelUserGroup:', err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            msg: 'Internal server error',
            err,
        });
    }
}

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
    const limit = (req.query.limit == "ALL") ? "ALL" : (parseInt(req.query.limit, 10) || 10); // Default to 10 items per page
    const skip = (page - 1) * limit;

    try {
        let users;
        let query = {
            isDeleted: false
        }
        // Fetch users with sorting, pagination, and field selection
        if (limit == "ALL") {
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

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0); // Set to start of the day

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999); // Set to end of the day

        const query = {
            idUser: id,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        };

        if (limit == "ALL") {
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
    const limit = (req.query.limit == "ALL") ? "ALL" : (parseInt(req.query.limit, 10) || 10); // Default to 10 items per page
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
        if (limit == "ALL") {
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

exports.getLevelUser = async (req, res) => {
    try {
        // Fetch all users and type services in parallel
        const [users, typeServices] = await Promise.all([
            User.find({ isDeleted: false }),
            TypeService.find({ isDeleted: false }),
        ]);

        // Fetch all LevelUserGroups and GroupMoney entries in one go
        const levelUserGroups = await LevelUserGroup.find({
            idUser: { $in: users.map(user => user._id) },
            idService: { $in: typeServices.map(service => service._id) },
        }).populate("levelGroup");

        const groupesMoney = await GroupMoney.find({
            idService: { $in: typeServices.map(service => service._id) },
            isDeleted: false,
        });

        // Structure the results
        const results = users.map(user => ({
            user,
            typeServices: typeServices.map(service => ({
                service,
                levelUserGroup: levelUserGroups.find(
                    group => group.idUser.toString() === user._id.toString() &&
                        group.idService.toString() === service._id.toString()
                ) || null,
                groupMoney: groupesMoney.filter(
                    group => group.idService.toString() === service._id.toString()
                ),
            })),
        }));

        // Send the response
        res.status(httpStatus.OK).send({ typeServices, groupesMoney, results });
    } catch (err) {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في جلب الحركات المالية" });
    }
};



exports.addCustomPrice = async (req, res) => {
    const admin = req.admin;
    const { idUser, idService, idCategorie, idProduct, cost, value } = req.body;

    // Start a session for transaction management
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Validate the User data using Joi
        const { error } = validationCustomPrice(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: error.details[0].message,
            });
        }

        // Check if the user exists
        const userExists = await User.findById(idUser).session(session);
        if (!userExists) {
            return res.status(httpStatus.NOT_FOUND).send({
                msg: "المستخدم غير موجود",
            });
        }

        // Check if a custom price already exists for the same parameters
        const existingCustomPrice = await CustomPrice.findOne({
            idUser,
            idService,
            idCategorie,
            idProduct,
        }).session(session);

        if (existingCustomPrice) {
            return res.status(httpStatus.CONFLICT).send({
                msg: "السعر المخصص موجود بالفعل",
                existingCustomPrice,
            });
        }

        // Create a new custom price document
        const newCustomPrice = new CustomPrice({
            idUser,
            idService,
            idCategorie,
            idProduct,
            cost,
            value,
        });

        await newCustomPrice.save({ session });

        // Populate the idUser field with the relevant user data
        const populatedCustomPrice = await CustomPrice.findById(newCustomPrice._id)
            .populate("idUser", "username email")
            .populate("idService", "nameAr")
            .populate("idCategorie", "nameAr")
            .populate("idProduct", "nameAr costPrice")
            .populate("createdBy", "username")
            .session(session);

        // Add admin notification
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام باضافة سعر مخصص`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();

        // Send response
        return res.status(httpStatus.CREATED).send({
            msg: "تم إنشاء السعر المخصص بنجاح",
            notificationMsg: content,
            newCustomPrice: populatedCustomPrice, // Return the populated document
        });
    } catch (err) {
        // If any error occurs, abort the transaction
        await session.abortTransaction();
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        // End the session
        session.endSession();
    }
};


exports.deleteCustomPrice = async (req, res) => {
    const admin = req.admin;
    const { id } = req.query;

    // Start a session for transaction management
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find the CustomPrice by ID
        const customPrice = await CustomPrice.findById(id).session(session);
        if (!customPrice) {
            return res.status(httpStatus.NOT_FOUND).send({
                msg: "السعر المخصص غير موجود.",
            });
        }

        // Delete the CustomPrice
        await CustomPrice.findByIdAndDelete(id, { session });

        // Add admin notification
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بحذف سعر مخصص`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();

        // Send response
        res.status(httpStatus.OK).json({
            msg: "تم حذف السعر المخصص بنجاح",
            notificationMsg: content,
        });
    } catch (err) {
        // Abort the transaction in case of an error
        await session.abortTransaction();
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        // End the session
        session.endSession();
    }
};


exports.getCustomPrice = async (req, res) => {

    try {
        // Fetch all CustomPrices
        const customPrices = await CustomPrice.find()
            .populate("idUser", "username email")
            .populate("idService", "nameAr")
            .populate("idCategorie", "nameAr")
            .populate("idProduct", "nameAr costPrice")
            .populate("createdBy", "username");

        res.status(httpStatus.OK).send(customPrices);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
};
