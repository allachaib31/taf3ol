const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { Admin } = require("../../models/admin/admin");
const { validateCoins, Coins } = require("../../models/coins/coins");
const { saveNotification } = require("../../utils/constants");

exports.addCoins = async (req, res) => {
    const admin = req.admin; // Assuming admin is attached to the request object
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Validate the input
        const { error } = validateCoins(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: error.details[0].message,
            });
        }

        const { name, abbreviation, symbol, price, purchasePrice, isDollar, show } = req.body;

        // Check if a Dollar coin already exists
        const dollarCoinExists = await Coins.findOne({ isDollar: isDollar }).session(
            session
        );

        if (dollarCoinExists && req.body.isDollar) {
            return res.status(httpStatus.CONFLICT).send({
                msg: "عملة الدولار موجودة بالفعل ولا يمكن إضافتها مرة أخرى.",
            });
        }

        // Check if a coin with the same name, abbreviation, or symbol already exists
        const existingCoin = await Coins.findOne({
            $or: [{ name: name }, { abbreviation: abbreviation }, { symbol: symbol }],
        }).session(session);

        if (existingCoin) {
            return res.status(httpStatus.CONFLICT).send({
                msg: "توجد بالفعل عملة تحمل نفس الاسم أو الاختصار أو الرمز.",
            });
        }

        // Create a new coin
        const newCoin = new Coins({
            name,
            abbreviation,
            symbol,
            price,
            purchasePrice,
            show,
            createdBy: admin._id,
        });

        await newCoin.save({ session });

        // Add admin notification
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بإضافة عملة جديدة`;
        await saveNotification(
            admin,
            "Admin",
            "Admin",
            "reminder",
            content,
            true,
            null,
            null,
            session
        );

        // Commit the transaction
        await session.commitTransaction();

        return res.status(httpStatus.CREATED).send({
            msg: "تمت إضافة العملة بنجاح.",
            notificationMsg: content,
            newCoin,
        });
    } catch (err) {
        // Abort the transaction on error
        await session.abortTransaction();
        console.error("Error adding coin:", err);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            msg: "حدث خطأ أثناء إضافة العملة.",
            error: err.message,
        });
    } finally {
        // End the session
        session.endSession();
    }
};

exports.updateCoins = async (req, res) => {
    const admin = req.admin; // Assuming admin is attached to the request object
    const { _id, name, abbreviation, symbol, price, purchasePrice, isDollar, show } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { error } = validateCoins({name, abbreviation, symbol, price, purchasePrice, isDollar});
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: error.details[0].message,
            });
        }
        const coinToUpdate = await Coins.findById(_id).session(session);

        if (coinToUpdate?.isDollar) {
            return res.status(httpStatus.NOT_ACCEPTABLE).send({
                msg: "لا يمكن تحديث عملة الدولار.",
            });
        }

        const updatedCoin = await Coins.findByIdAndUpdate(
            _id,
            { name, abbreviation, symbol, price, purchasePrice, show },
            { new: true, runValidators: true, session }
        );

        if (!updatedCoin) {
            return res.status(httpStatus.NOT_FOUND).send({
                msg: "العملة غير موجودة.",
            });
        }
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بتحديث عملة `;
        await saveNotification(
            admin,
            "Admin",
            "Admin",
            "reminder",
            content,
            true,
            null,
            null,
            session
        );
        // Commit the transaction
        await session.commitTransaction();

        return res.status(httpStatus.OK).send({
            msg: "تم تحديث العملة بنجاح.",
            notificationMsg: content,
            updatedCoin,
        });
    } catch (err) {
        // Abort the transaction on error
        await session.abortTransaction();
        console.error("Error updating coin:", err);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            msg: "حدث خطأ أثناء تحديث العملة.",
            error: err.message,
        });
    } finally {
        session.endSession();
    }
};

exports.deleteCoins = async (req, res) => {
    const admin = req.admin; // Assuming admin is attached to the request object
    const { id } = req.query; // Assuming `ids` is an array of coin IDs
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const result = await Coins.deleteOne({ 
            _id: id,
            isDollar: false
        }, { session });

        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بحذف عملة`;
        await saveNotification(
            admin,
            "Admin",
            "Admin",
            "reminder",
            content,
            true,
            null,
            null,
            session
        );
        // Commit the transaction
        await session.commitTransaction();

        return res.status(httpStatus.OK).send({
            msg: `تم حذف عملة بنجاح.`,
            notificationMsg: content,
        });
    } catch (err) {
        // Abort the transaction on error
        await session.abortTransaction();
        console.error("Error deleting coins:", err);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            msg: "حدث خطأ أثناء حذف العملات.",
            error: err.message,
        });
    } finally {
        session.endSession();
    }
};

exports.getCoins = async (req, res) => {
    try {
        const coins = await Coins.find();

        return res.status(httpStatus.OK).send({
            msg: "تم جلب العملات بنجاح.",
            coins,
        });
    } catch (err) {
        console.error("Error fetching coins:", err);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            msg: "حدث خطأ أثناء جلب العملات.",
            error: err.message,
        });
    }
};
