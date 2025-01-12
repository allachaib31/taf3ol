const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const adminSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
    },
    isBlocked : {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
    },
    permission: {
        type: Object,
        default: {}
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

adminSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("Admin", "A");
    }
    next();
});

const validateAdmin = (admin) => {
    const schema = Joi.object({
        id: Joi.string().optional(),
        email: Joi.string().email().max(255).required(),
        username: Joi.string().min(3).max(255).required(),
        name: Joi.string().min(2).max(255).required(),
        password: Joi.string().min(6).max(255).required(),
        image: Joi.string().optional().allow(null, ""),
        isBlocked: Joi.boolean().optional(),
        lastLogin: Joi.date().optional(),
        permission: Joi.object().optional(),
        createdBy: Joi.string().optional(),
        createdAt: Joi.date().optional(),
    });

    return schema.validate(admin);
};

module.exports = {
    Admin: mongoose.model('Admin', adminSchema),
    validateAdmin,
};