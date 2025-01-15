const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const coinsSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    abbreviation: {
        type: String,
        required: true,
        unique: true,
    },
    symbol: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true
    },
    isDollar: {
        type: Boolean,
        default: false,
    },
    show: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    createdAt: {
        type: Date,
    }
});

coinsSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("Coins", "C");
    }
    next();
});

const validateCoins = (coins) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            "string.empty": "The name field is required.",
        }),
        abbreviation: Joi.string().required().messages({
            "string.empty": "The abbreviation field is required.",
        }),
        symbol: Joi.string().required().messages({
            "string.empty": "The symbol field is required.",
        }),
        price: Joi.number().positive().required().messages({
            "number.base": "The price must be a number.",
            "number.positive": "The price must be a positive value.",
            "any.required": "The price field is required.",
        }),
        purchasePrice: Joi.number().positive().required().messages({
            "number.base": "The purchasePrice must be a number.",
            "number.positive": "The purchasePrice must be a positive value.",
            "any.required": "The purchasePrice field is required.",
        }),
        isDollar: Joi.boolean().optional(),
        show: Joi.boolean().optional(),
        createdBy: Joi.string().optional().messages({
            "string.base": "The createdBy field must be a valid ID.",
        }),
        createdAt: Joi.date().optional(),
    });
    return schema.validate(coins);
};

module.exports = {
    Coins: mongoose.model('Coins', coinsSchema),
    validateCoins,
};