const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const orderRequirementsSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    idProducts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    nameAr: {
        type: String,
        required: true,
    },
    nameEn: {
        type: String,
        required: true,
    },
    descriptionAr: {
        type: String,
        required: true,
    },
    descriptionEn: {
        type: String,
        required: true,
    },
    verification: {
        type: String,
        enum: ["number", "string", "text", "email"],
        required: true
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

orderRequirementsSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        // Generate a new ID using your custom utility function
        this.id = await generateNextId("OrderRequirements", "OR");
    }
    next();
});

// Create a validation schema using Joi
const validationOrderRequirements = (orderRequirements) => {
    const schema = Joi.object({
        idProducts: Joi.string().required(), // Validate ObjectId format
        nameAr: Joi.string().min(3).max(255).required(),
        nameEn: Joi.string().min(3).max(255).required(),
        descriptionAr: Joi.string().min(3).required(),
        descriptionEn: Joi.string().min(3).required(),
        verification: Joi.string().valid("number", "string", "text", "email").required(),
        createdBy: Joi.string().optional(), 
        createdAt: Joi.date().optional(),
    });

    return schema.validate(orderRequirements);
};


module.exports = { 
    OrderRequirements: mongoose.model("OrderRequirements", orderRequirementsSchema),
    validationOrderRequirements
};
