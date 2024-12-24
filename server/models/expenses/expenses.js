const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const expensesSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    totalPurchases: {
        type: Number,
        required: true,
        default: 0
    },
    totalShipping: {
        type: Number,
        required: true,
        default: 0
    },
    sentToAgent: {
        type: Number,
        required: true,
        default: 0
    },
    debitBalance: { //رصيد مدين
        type: Number,
        required: true,
        default: 0
    },
    undrawnProfits: {//ارباح غير مسحوبة
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

expensesSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("Expenses", "E");
    }
    next();
});

module.exports = {
    Expenses: mongoose.model('Expenses', expensesSchema),
};