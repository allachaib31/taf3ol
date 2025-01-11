const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const stockSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        unique: true,
        required: true 
    },
    active: {
        type: Boolean,
        default: true,
        required: true,
    },
    quantityAvailable: {
        type: Number,
        default: 0,
        required: true
    },
    quantitySold: {
        type: Number,
        default: 0,
        required: true
    },
    cost: {
        type: Number,
        required: true,
    },
    isDeleted: { 
        type: Boolean,
        default: false 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save hook to set id and ranking
stockSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        // Generate a new ID using your custom utility function
        this.id = await generateNextId("Stock", "S");
    }
    next();
});

const validationStock = (stockItem) => {
    const schema = Joi.object({
        idProduct: Joi.string().required().messages({
            "string.pattern.base": "idProduct must be a valid ObjectId.",
        }),
        active: Joi.boolean().optional(),
        quantityAvailable: Joi.number().optional().integer().min(0).messages({
            "number.min": "Quantity available cannot be less than 0.",
        }),
        quantitySold: Joi.number().integer().min(0).optional().messages({
            "number.min": "Quantity sold cannot be less than 0.",
        }),
        cost: Joi.number().required(),
        isDeleted: Joi.boolean().optional(),
        createdBy: Joi.string().messages({
            "string.pattern.base": "createdBy must be a valid ObjectId.",
        }).optional(),
    });

    return schema.validate(stockItem);
};


module.exports = { 
    Stock: mongoose.model("Stock", stockSchema),
    validationStock
};
