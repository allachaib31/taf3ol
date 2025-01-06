const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const productsPriceSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    idProducts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    idGroupMoney: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupMoney',
    },
    value: {
        type: Number,
        required: true,
    },
    negativeBalance: {
        type: Number,
        required: true,
    },
    agentRatio: {
        type: Number,
        required: true,
    },
    meritValue: {
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
})

// Pre-save hook to set id and ranking
/*productsPriceSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        // Generate a new ID using your custom utility function
        this.id = await generateNextId("ProductsPrice", "PP");
    }
    next();
});*/

// Create a validation schema using Joi
const validationProductsPrice = (productsPrice) => {
    const schema = Joi.object({
        id: Joi.string(),
        idProducts: Joi.string(),
        idGroupMoney: Joi.string(),
        value: Joi.number().required(),
        negativeBalance: Joi.number().required(),
        agentRatio: Joi.number().required(),
        meritValue: Joi.number().required(),
        isDeleted: Joi.boolean().optional(),
        createdBy: Joi.string().optional(),
        createdAt: Joi.date().optional(),
    });

    return schema.validate(productsPrice);
};


module.exports = { 
    ProductsPrice: mongoose.model("ProductsPrice", productsPriceSchema),
    validationProductsPrice
};
