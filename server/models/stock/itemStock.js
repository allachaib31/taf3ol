const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const itemStockSchema = new mongoose.Schema({
    idStock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
    },
    item: {
        type: String,
        required: true,
        unique: true,
    },
    orderNumber: {
        type: String,
    },
    dateOfSale: {
        type: Date,
    },
    note: {
        type: String
    },
    sold: {
        type: Boolean,
        default: false
    },
    damaged: {
        type:Boolean,
        default: false
    },
    dateOfDamaged: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})


const validationItemStock = (stockItem) => {
    const schema = Joi.object({
        idStock: Joi.string().required(), // Must be a valid ObjectId string
        item: Joi.string().required(), // Non-empty string with max length
        orderNumber: Joi.string().optional().allow(null, ''), // Optional, can be null or empty
        dateOfSale: Joi.date().optional().allow(null), // Optional, can be null
        note: Joi.string().optional().allow(null, ''), // Optional, can be null or empty
        sold: Joi.boolean().optional(), // Boolean flag for sold status
        damaged: Joi.boolean().optional(), // Boolean flag for damaged status
        dateOfDamaged: Joi.date().optional().allow(null), // Optional, can be null
    });

    return schema.validate(stockItem);
};



module.exports = { 
    ItemStock: mongoose.model("ItemStock", itemStockSchema),
    validationItemStock
};
