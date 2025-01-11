const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const cardsGroupesSchema = new mongoose.Schema({
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

cardsGroupesSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("CardsGroupes", "CG");
    }
    next();
});

const validationGroupCards = (cardsGroupes) => {
    const schema = Joi.object({
        id: Joi.string().optional(),
        name: Joi.string().min(2).max(255).required(),
        image: Joi.string().optional().allow(null, ""),
        isDeleted: Joi.boolean().optional(),
        createdBy: Joi.string().optional(),
        createdAt: Joi.date().optional(),
    });

    return schema.validate(cardsGroupes);
};

module.exports = {
    CardsGroupes: mongoose.model('CardsGroupes', cardsGroupesSchema),
    validationGroupCards,
};