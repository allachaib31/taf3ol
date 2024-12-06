const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const typeServiceSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
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
    typeProduct: {
        type: String,
        enum: ["الأساسيات الرقمية", "المعززات الاجتماعية", "رقم ايسيم", "مولد رقم الهاتف"],
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
typeServiceSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        // Generate a new ID using your custom utility function
        this.id = await generateNextId("TypeServices", "TS");

        // Find the document with the highest ranking
        const lastTypeServices = await mongoose.model('TypeServices').findOne().sort('-ranking').exec();
        
        // Set the ranking as the last one + 1 or 1 if it's the first document
        this.ranking = lastTypeServices ? lastTypeServices.ranking + 1 : 1;
    }
    next();
});

// Create a validation schema using Joi
const validationTypeService = (typeService) => {
    const schema = Joi.object({
        id: Joi.string().optional(),
        nameAr: Joi.string().required().messages({
            'string.empty': 'The Arabic name is required.'
        }),
        nameEn: Joi.string().required().messages({
            'string.empty': 'The English name is required.'
        }),
        typeProduct: Joi.string().valid(...["الأساسيات الرقمية", "المعززات الاجتماعية", "رقم ايسيم", "مولد رقم الهاتف"]).required(),
        show: Joi.boolean().required(),
        image: Joi.string().required(),
        isDeleted: Joi.boolean().optional(),
        createdBy: Joi.string().optional(),
        ranking: Joi.number().optional(),
        createdAt: Joi.date().optional(),
    });

    return schema.validate(typeService);
};


module.exports = { 
    TypeService: mongoose.model("TypeServices", typeServiceSchema),
    validationTypeService
};
