const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const warehouseSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true 
    },
    item: {
        type: String,
        required: true,
    },
    itSell: {
        type: Boolean,
        required: true,
        default: false
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
warehouseSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        // Generate a new ID using your custom utility function
        this.id = await generateNextId("Warehouse", "W");
    }
    next();
});

const validationWarehouse = (warehouseItem) => {
    const schema = Joi.object({
        id: Joi.string().optional(), // Automatically generated, so optional
        idProduct: Joi.string().required().messages({
            'string.empty': 'The product ID is required.',
        }),
        item: Joi.string().required().messages({
            'string.empty': 'The item name is required.',
        }),
        itSell: Joi.boolean().required(),
        isDeleted: Joi.boolean().optional(),
        createdBy: Joi.string().optional(),
        createdAt: Joi.date().optional(), // Automatically set, so optional
    });

    return schema.validate(warehouseItem);
};


module.exports = { 
    Warehouse: mongoose.model("Warehouse", warehouseSchema),
    validationWarehouse
};
