const { default: mongoose } = require("mongoose");
const { validationGroupCards, CardsGroupes } = require("../../models/rechargeCards/cardsGroupes");
const { saveNotification } = require("../../utils/constants");
const { Admin } = require("../../models/admin/admin");
const httpStatus = require("http-status");
const crypto = require('crypto'); // For generating random strings
const { Cards, validationCards } = require("../../models/rechargeCards/rechargeCard");


exports.addGroupCards = async (req, res) => {
    const admin = req.admin; // Assuming the admin is attached to the request object
    const { name, image } = req.body;

    // Start a session for transaction management
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Validate the group data (if you have a Joi schema for validation)
        const { error } = validationGroupCards(req.body); // Replace with your validation logic
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: error.details[0].message,
            });
        }

        // Check if a group with the same name already exists
        const existingGroup = await CardsGroupes.findOne({ name }).session(session);
        if (existingGroup) {
            return res.status(httpStatus.CONFLICT).send({
                msg: "اسم المجموعة موجود بالفعل",
            });
        }

        // Create a new group
        const newGroup = new CardsGroupes({
            name,
            image,
            createdBy: admin._id,
        });

        await newGroup.save({ session });

        // Add admin notification
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بإضافة مجموعة بطاقات جديدة`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Populate the createdBy field with the username
        const populatedGroup = await CardsGroupes.findById(newGroup._id)
            .populate('createdBy', 'username')
            .session(session);

        // Commit the transaction
        await session.commitTransaction();

        // Send response
        return res.status(httpStatus.CREATED).send({
            msg: "تم إضافة المجموعة بنجاح",
            notificationMsg: content,
            newGroup: populatedGroup,
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


exports.deleteGroupCards = async (req, res) => {
    const admin = req.admin; // Assuming the admin is attached to the request object
    const { id } = req.query; // Group ID is passed as a query parameter

    // Start a session for transaction management
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find and delete the group by ID within the transaction
        const deletedGroup = await CardsGroupes.findByIdAndDelete(id, { session });
        if (!deletedGroup) {
            await session.abortTransaction();
            return res.status(httpStatus.NOT_FOUND).send({
                msg: "المجموعة غير موجودة",
            });
        }

        // Add admin notification
        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بحذف مجموعة بطاقات`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();

        // Send response
        return res.status(httpStatus.OK).send({
            msg: "تم حذف المجموعة بنجاح",
            notificationMsg: content,
        });
    } catch (err) {
        // Abort the transaction in case of an error
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


exports.getGroupCards = async (req, res) => {
    let { query } = req.query;

    try {
        // Fetch card groups based on the query, if provided
        if(query == "") {
            query = {}
        } else {
            query = {
                name: { $regex: query || "", $options: "i" }, // Case-insensitive search
            }
        }
        const cardGroups = await CardsGroupes.find(query).populate('createdBy', 'username');

        return res.status(httpStatus.OK).send({
            msg: "تم جلب المجموعات بنجاح",
            cardGroups,
        });
    } catch (err) {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    }
};


exports.generateRechargeCards = async (req, res) => {
    const admin = req.admin; // Assuming the admin is attached to the request object
    const { idCardGroup, titleCard, cardCredit, cardNumber, lettersNumber, typeText } = req.body;
    // Start a session for transaction management
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Validate input
        if (!idCardGroup || !titleCard || !cardCredit || !cardNumber || !lettersNumber || !typeText) {
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "يرجى توفير جميع الحقول المطلوبة",
            });
        }

        // Check if the card group exists
        const cardGroup = await CardsGroupes.findById(idCardGroup).session(session);
        if (!cardGroup) {
            return res.status(httpStatus.NOT_FOUND).send({
                msg: "مجموعة البطاقات غير موجودة",
            });
        }

        // Generate cards
        const generatedCards = [];
        for (let i = 0; i < cardNumber; i++) {
            let uniqueString;
            if (typeText === 'string') {
                uniqueString = crypto.randomBytes(Math.ceil(lettersNumber / 2))
                    .toString('hex')
                    .slice(0, lettersNumber);
            } else if (typeText === 'number') {
                // Generate a random number of the specified length
                uniqueString = "";
                while (uniqueString.length < Number(lettersNumber)) {
                    const byte = crypto.randomBytes(1)[0] % 10; // Random digit (0-9)
                    uniqueString += byte.toString();
                }
            } else {
                return res.status(httpStatus[400]).send({ msg: "Invalid typeText. Use 'string' or 'number'." });
            }

            const card = {
                idCardGroup,
                title: titleCard,
                credit: cardCredit,
                code: uniqueString,
            };
            const { error } = validationCards(card); // Replace with your validation logic
            if (error) {
                return res.status(httpStatus.BAD_REQUEST).send({
                    msg: error.details[0].message,
                });
            }
            generatedCards.push(card);
        }

        // Save the cards in the database
        const savedCards = await Cards.insertMany(generatedCards, { session });

        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بانشاء بطاقات الشحن جديدة`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();

        // Respond with the generated cards
        return res.status(httpStatus.CREATED).send({
            msg: "تم إنشاء البطاقات بنجاح",
            notificationMsg: content,
            cards: savedCards,
        });
    } catch (err) {
        // If any error occurs, abort the transaction
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

exports.getCards = async (req, res) => {
    const { cardTitleId } = req.query;
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = (req.query.limit == "ALL") ? "ALL" : (parseInt(req.query.limit, 10) || 10); // Default to 10 items per page
    const skip = (page - 1) * limit;

    try {
        let cards;
        if(limit == "ALL") {
            cards = await Cards.find({ idCardGroup: cardTitleId })
            .populate("createdBy", "username"); // Populate createdBy with username
        } else {
            cards = await Cards.find({ idCardGroup: cardTitleId })
            .populate("createdBy", "username")
            .skip(skip)
            .limit(limit);
        }
        const totalDocuments = await Cards.countDocuments();

        res.status(httpStatus.OK).send({
            total: totalDocuments,
            page,
            limit,
            totalPages: Math.ceil(totalDocuments / limit),
            cards,
        });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: "خطأ في  الخادم" });
    }
}

exports.deleteCards = async (req, res) => {
    const admin = req.admin;
    const cardIds = req.body;

    // Start a session for transaction management
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Validate that cardIds is an array
        if (!Array.isArray(cardIds) || cardIds.length === 0) {
            return res.status(httpStatus.BAD_REQUEST).send({
                msg: "يرجى توفير معرفات البطاقات لحذفها",
            });
        }

        // Perform the deletion
        const deleteResult = await Cards.deleteMany({
            _id: { $in: cardIds },
        }).session(session);

        // Check if any cards were deleted
        if (deleteResult.deletedCount === 0) {
            await session.abortTransaction();
            return res.status(httpStatus.NOT_FOUND).send({
                msg: "لم يتم العثور على البطاقات المطلوبة",
            });
        }

        const adminData = await Admin.findById(admin._id).session(session);
        let content = `${adminData.username} قام بحذف مجموعة من بطاقات`;
        await saveNotification(admin, 'Admin', 'Admin', 'reminder', content, true, null, null, session);

        // Commit the transaction
        await session.commitTransaction();

        // Send success response
        return res.status(httpStatus.OK).send({
            msg: "تم حذف البطاقات بنجاح",
            notificationMsg: content,
        });
    } catch (err) {
        // Abort the transaction in case of error
        await session.abortTransaction();
        console.error(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            msg: "خطأ في الخادم",
            error: err.message,
        });
    } finally {
        // End the session
        session.endSession();
    }
};