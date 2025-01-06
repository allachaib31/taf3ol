const mongoose = require("mongoose");
const { generateNextId } = require("../../utils/generateNextId");

const levelUserGroupSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    idService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeServices',
    },
    levelGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupMoney',
    },
    points: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save hook to set id and ranking
/*levelUserGroupSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        // Generate a new ID using your custom utility function
        this.id = await generateNextId("LevelUserGroup", "LG");
    }
    next();
});*/

module.exports = { 
    LevelUserGroup: mongoose.model("LevelUserGroup", levelUserGroupSchema),
};
