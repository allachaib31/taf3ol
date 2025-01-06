const mongoose = require("mongoose");
exports.generateNextId = async (nameModel, key, session) => {
    const lastRecord = await mongoose.model(nameModel).find().session(session);
    console.log(lastRecord)
    if (lastRecord.length == 0) {
        return `${key}1`;
    }


    return `${key}${Number(lastRecord[lastRecord.length - 1].id.split(key)[1]) + 1}`;
}
