const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const apiSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    link: {
        type: String,
        unique: true,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    groupesApi: {
        type: String,
        enum: [
            "مواقع تكود ارقام مؤقته", 
            "مواقع تكويد الارقام قابلة للتجديد", 
            "مزودي خدمات السوشل ميديا", 
            "مزودي بطاقات الهدايا", 
            "برمجة خاصة"
        ],
        required: true,
    },
    idCoin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coins',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

apiSchema.pre("save", async function (next) {
    if (this.isNew) {
        this.id = await generateNextId("API", "API");
    }
    next();
});

const validateApi = (api) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            "string.empty": "The name field is required.",
        }),
        link: Joi.string().uri().required().messages({
            "string.empty": "The link field is required.",
            "string.uri": "The link must be a valid URL.",
        }),
        token: Joi.string().required().messages({
            "string.empty": "The token field is required.",
        }),
        groupesApi: Joi.string()
            .valid(
                "مواقع تكود ارقام مؤقته", 
                "مواقع تكويد الارقام قابلة للتجديد", 
                "مزودي خدمات السوشل ميديا", 
                "مزودي بطاقات الهدايا", 
                "برمجة خاصة"
            )
            .required()
            .messages({
                "string.empty": "The groupesApi field is required.",
                "any.only": "Invalid value for groupesApi.",
        }),
        idCoin: Joi.string().required(),
        isDeleted: Joi.boolean().optional(),
        createdBy: Joi.string().optional(),
        createdAt: Joi.date().optional(),
    });
    return schema.validate(api);
};

module.exports = {
    Api: mongoose.model("API", apiSchema),
    validateApi,
};
