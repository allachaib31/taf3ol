const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    idService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeServices',
        required: true 
    },
    idCategorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie',
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
    service: {
        type: String,
    },
    country: {
        type: String,
    },
    serverNumber: {
        type: String,
    },
    price: {
        type: [
            {
                nameCoin: {
                    type: String,
                    enum: ["usd", "tl"],
                    required: true,
                },
                costPrice: {
                    type: Number,
                    required: true,
                },
                sellingPrice: {
                    type: Number,
                    required: true,
                }
            }
        ],
        required: true,
    },
    forQuantity: {
        type: Number,
        required: true
    },
    descriptionAr: {
        type: String,
        required: true
    },
    descriptionEn: {
        type: String,
        required: true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantityQuality: {
        type: String,
        enum: ["بدون", "كمية", "عداد"],
        required: true
    },
    minimumQuantity: {
        type: Number,
    },
    maximumQuantity: {
        type: Number,
    },
    availableQuantity: {
        type: Boolean,
        required: true
    },
    provider: {
        type: String,
        required: true,
    },
    warehouse: {
        type: Boolean,
        default: false
    },
    ranking: {
        type: Number,
        //unique: true,
    },
    show: {
        type: Boolean,
        required: true,
        default: true,
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
productSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        // Generate a new ID using your custom utility function
        this.id = await generateNextId("Product", "P");

        // Find the document with the highest ranking
        const lastCategory = await mongoose.model('Product').findOne().sort('-ranking').exec();
        
        // Set the ranking as the last one + 1 or 1 if it's the first document
        this.ranking = lastCategory ? lastCategory.ranking + 1 : 1;
    }
    next();
});

const validationProduct = (product) => {
    const schema = Joi.object({
        id: Joi.string().optional(), // Automatically generated, so optional
        idService: Joi.string().required(),
        idCategorie: Joi.string().required(),
        nameAr: Joi.string().required().messages({
            'string.empty': 'The Arabic name is required.'
        }),
        nameEn: Joi.string().required().messages({
            'string.empty': 'The English name is required.'
        }),
        service: Joi.string().optional().allow(null, ""),
        country: Joi.string().optional().allow(null, ""),
        serverNumber: Joi.string().optional().allow(null, ""),
        price: Joi.array()
            .items(
                Joi.object({
                    nameCoin: Joi.string().required(),
                    costPrice: Joi.number().required(),
                    sellingPrice: Joi.number().required(),
                })
            )
            .required()
            .messages({
                'array.base': 'Price must be an array.',
                'array.includesRequiredUnknowns': 'Each price object must include nameCoin, costPrice, and sellingPrice.',
            }),
        forQuantity: Joi.number().required(),
        descriptionAr: Joi.string().required(),
        descriptionEn: Joi.string().required(),
        image: Joi.string().required(),
        quantityQuality: Joi.string()
            .valid("بدون", "كمية", "عداد")
            .required(),
        minimumQuantity: Joi.number().optional().allow(null, ""),
        maximumQuantity: Joi.number().optional().allow(null, ""),
        availableQuantity: Joi.boolean().required(),
        provider: Joi.string().required(),
        warehouse: Joi.boolean().optional().allow(null, ""),
        ranking: Joi.number().optional().allow(null, ""),
        show: Joi.boolean().required(),
        isDeleted: Joi.boolean().optional().allow(null, ""),
        createdBy: Joi.string().optional().allow(null, ""),
        createdAt: Joi.date().optional().allow(null, ""), // Automatically set, so optional
    });

    return schema.validate(product);
};


module.exports = { 
    Product: mongoose.model("Product", productSchema),
    validationProduct
};
