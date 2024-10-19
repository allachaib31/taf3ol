const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const userSchema = new mongoose.Schema({
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
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
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
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

userSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("User", "U");
    }
    next();
});

const validateUser = (user) => {
    const schema = Joi.object({
        id: Joi.string().optional(),
        email: Joi.string().email().max(255).required(),
        username: Joi.string().min(3).max(255).required(),
        firstName: Joi.string().min(2).max(255).required(),
        lastName: Joi.string().min(2).max(255).required(),
        phoneNumber: Joi.string().min(8).max(20).pattern(/^[0-9]+$/).required(), // Allow digits only
        password: Joi.string().min(6).max(255).required(),
        image: Joi.string().optional(),
        isBlocked: Joi.boolean().optional(),
        lastLogin: Joi.date().optional(),
        createdAt: Joi.date().optional(),
    });

    return schema.validate(user);
};

module.exports = {
    User: mongoose.model('User', userSchema),
    validateUser,
};