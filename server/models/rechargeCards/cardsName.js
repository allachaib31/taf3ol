const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const cardsNameSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
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
        default: Date.now(),
    },
})

cardsNameSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("CardsName", "CN");
    }
    next();
});

const validateCardsName = (cardsName) => {
    const schema = Joi.object({
        id: Joi.string().optional(),
        name: Joi.string().min(2).max(255).required(),
        image: Joi.string().optional().allow(null, ""),
        isDeleted: Joi.boolean().optional(),
        createdBy: Joi.string().optional(),
        createdAt: Joi.date().optional(),
    });

    return schema.validate(cardsName);
};

module.exports = {
    CardsName: mongoose.model('CardsName', cardsNameSchema),
    validateCardsName,
};