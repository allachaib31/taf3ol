const mongoose = require("mongoose");
const Joi = require("joi");

const cardsGroupesSchema = new mongoose.Schema({
    idCardGroup: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CardsGroupes',
    },
    title: { 
        type: String,
        required: true,
    },
    credit: { 
        type: String,
        required: true,
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    isUsed: {
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
});


const validationCards = (card) => {
    const schema = Joi.object({
        idCardGroup: Joi.string().required(), // Must be a valid MongoDB ObjectId as a string
        title: Joi.string().min(2).max(255).required(),
        credit: Joi.string().required(),
        code: Joi.string().required(),
        createdBy: Joi.string().optional(), // Can also validate this as an ObjectId if needed
        createdAt: Joi.date().optional(),
    });

    return schema.validate(card);
};

module.exports = {
    Cards: mongoose.model('Cards', cardsGroupesSchema),
    validationCards,
};
