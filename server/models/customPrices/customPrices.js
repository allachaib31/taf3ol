const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const customPriceSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    idService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TypeServices",
        required: true,
    },
    idCategorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorie",
        required: true,
    },
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

customPriceSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("CustomPrice", "CP");
    }
    next();
});


const validationCustomPrice = (customPrice) => {
    const schema = Joi.object({
        id: Joi.string().optional(),
        idUser: Joi.string().required(), // Assuming this is always required
        idService: Joi.string().required(), // Assuming this is always required
        idCategorie: Joi.string().required(),
        idProduct: Joi.string().required(),
        cost: Joi.number().required(),
        value: Joi.number().required(),
        createdBy: Joi.string().optional(), // Adjust based on requirements
        createdAt: Joi.date().optional(), // Allow auto-generated date
    });

    return schema.validate(customPrice);
};


module.exports = { 
    CustomPrice: mongoose.model("CustomPrice", customPriceSchema),
    validationCustomPrice
};
