const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

// Define the schema for the Categorie model
const categorieSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    idService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeServices',
        required: true 
    },
    nameAr: {
        type: String,
        unique: true,
        required: true,
    },
    nameEn: {
        type: String,
        unique: true,
        required: true,
    },
    show: {
        type: Boolean,
        required: true,
        default: true,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    ranking: {
        type: Number,
        //unique: true,
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
categorieSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        // Generate a new ID using your custom utility function
        this.id = await generateNextId("Categorie", "C");

        // Find the document with the highest ranking
        const lastCategory = await mongoose.model('Categorie').findOne().sort('-ranking').exec();
        
        // Set the ranking as the last one + 1 or 1 if it's the first document
        this.ranking = lastCategory ? lastCategory.ranking + 1 : 1;
    }
    next();
});

// Create a validation schema using Joi
const validationCategorie = (categorie) => {
    const schema = Joi.object({
        id: Joi.string().optional(), // Automatically generated, so optional
        idService: Joi.string().required(),
        nameAr: Joi.string().required().messages({
            'string.empty': 'The Arabic name is required.'
        }),
        nameEn: Joi.string().required().messages({
            'string.empty': 'The English name is required.'
        }),
        show: Joi.boolean().required(),
        image: Joi.string().required(), // Image is optional
        isDeleted: Joi.boolean().optional(),
        createdBy: Joi.string().optional(),
        ranking: Joi.number().optional(),
        createdAt: Joi.date().optional(), // Automatically set, so optional
    });

    return schema.validate(categorie);
};


module.exports = { 
    Categorie: mongoose.model("Categorie", categorieSchema),
    validationCategorie
};
