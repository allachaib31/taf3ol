const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const financialMovementsSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // Added to ensure `idUser` is always provided
    },
    typeMovement: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    balanceBefore: {
        type: Number,
        required: true,
    },
    balanceAfter: {
        type: Number,
        required: true,
    },
    reply: {
        type: String,
    },
    type: {
        type: String,
        enum: ["All", "Purchases", "Retrieve requests", "Shipping operations", "Money debt", "Shipping customers", "Earnings"],
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ["Accepted", "Canceled", "In progress", "Failed"],
        required: true,
    },
    idPaymentMethod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentGateway",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save middleware to generate a unique ID
financialMovementsSchema.pre("save", async function (next) {
    if (this.isNew) {
        this.id = await generateNextId("FinancialMovements", "FM");
    }
    next();
});

// Joi validation schema for financial movements
const validateFinancialMovement = (data) => {
    const schema = Joi.object({
        idUser: Joi.string().required(), // Expecting the ObjectId as a string
        typeMovement: Joi.string().required(),
        value: Joi.number().required(),
        balanceBefore: Joi.number().required(),
        balanceAfter: Joi.number().required(),
        reply: Joi.string().allow(""), // Allow empty string for optional fields
        orderStatus: Joi.string()
            .valid("accepted", "canceled", "in progress", "failed")
            .required(),
        idPaymentMethod: Joi.string().optional()
    });

    return schema.validate(data);
};

module.exports = {
    FinancialMovements: mongoose.model("FinancialMovements", financialMovementsSchema),
    validateFinancialMovement,
};
