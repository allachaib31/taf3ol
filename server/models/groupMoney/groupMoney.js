const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const groupMoneySchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    idService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TypeServices",
        required: true
    },
    pricingType: {
        type: String,
        enum: ["Increase", "Percent"],
        required: true,
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
    defaultGroup: {
        type: Boolean,
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
/*groupMoneySchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        // Generate a new ID using your custom utility function
        this.id = await generateNextId("GroupMoney", "GM");
    }
    next();
});*/

// Create a validation schema using Joi
const validationGroupMoney = (groupMoney) => {
    const schema = Joi.object({
        id: Joi.string().optional(),
        idService: Joi.string().optional(),
        name: Joi.string().required().messages({
            'string.empty': 'The name name is required.'
        }),
        pricingType: Joi.string().valid(...["Increase", "Percent"]).required(),
        value: Joi.number().required(),
        negativeBalance: Joi.number().required(),
        agentRatio: Joi.number().required(),
        meritValue: Joi.number().required(),
        isDeleted: Joi.boolean().optional(),
        createdBy: Joi.string().optional(),
        ranking: Joi.number().optional(),
        createdAt: Joi.date().optional(),
    });

    return schema.validate(groupMoney);
};


module.exports = { 
    GroupMoney: mongoose.model("GroupMoney", groupMoneySchema),
    validationGroupMoney
};
