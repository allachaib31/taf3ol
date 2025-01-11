const mongoose = require("mongoose");
const Joi = require("joi");

const paymentGatewaySchema = new mongoose.Schema({
    name: {
        type: String,
        required: function () {
            return this.typePaymentGateway === "paymentGateway" || this.typePaymentGateway === "bank";
        },
    },
    typePaymentGateway: {
        type: String,
        enum: ["paymentGateway", "bank"],
        required: true,
    },
    link: {
        type: String,
        required: function () {
            return this.typePaymentGateway === "paymentGateway";
        },
    },
    token: {
        type: String,
        required: function () {
            return this.typePaymentGateway === "paymentGateway";
        },
    },
    currencyType: {
        type: String,
        required: function () {
            return this.typePaymentGateway === "bank";
        },
    },
    description: {
        type: String,
        required: function () {
            return this.typePaymentGateway === "bank";
        },
    },
    tax: {
        type: Number,
        required: function () {
            return this.typePaymentGateway === "bank";
        },
    },
    minimumValue: {
        type: Number,
        required: function () {
            return this.typePaymentGateway === "bank";
        },
    },
    maximumValue: {
        type: Number,
        required: function () {
            return this.typePaymentGateway === "bank";
        },
    },
    requirement: {
        type: Array,
        required: function () {
            return this.typePaymentGateway === "bank";
        },
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
});

const validatePaymentGateway = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        typePaymentGateway: Joi.string().valid("paymentGateway", "bank").required(),
        link: Joi.string().when("typePaymentGateway", {
            is: "paymentGateway",
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
        token: Joi.string().when("typePaymentGateway", {
            is: "paymentGateway",
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
        currencyType: Joi.string().when("typePaymentGateway", {
            is: "bank",
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
        description: Joi.string().when("typePaymentGateway", {
            is: "bank",
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
        tax: Joi.number().when("typePaymentGateway", {
            is: "bank",
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
        minimumValue: Joi.number().when("typePaymentGateway", {
            is: "bank",
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
        maximumValue: Joi.number().when("typePaymentGateway", {
            is: "bank",
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
        requirement: Joi.array().when("typePaymentGateway", {
            is: "bank",
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
        image: Joi.string().required(),
        createdBy: Joi.string(),
    });

    return schema.validate(data);
};


module.exports = {
    PaymentGateway: mongoose.model("PaymentGateway", paymentGatewaySchema),
    validatePaymentGateway
}
