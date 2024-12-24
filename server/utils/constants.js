const { Notification, validateNotification } =  require("../models/notifucation/notifucation");

exports.saveNotification = async (sender, senderModel, receiverModel, type, content, isGlobal, receiverId=null, contentEn=null ) => {
    const notificationData = {
        senderId: sender._id,
        senderModel,
        receiverModel,
        type,
        content,
        isGlobal
    };

    if (receiverId !== null) {
        notificationData.receiverId = receiverId;
    }

    if (contentEn !== null) {
        notificationData.contentEn = contentEn;
    }

    const { errorNotification } = validateNotification(notificationData);
    if (errorNotification) {
        throw new Error(errorNotification.details[0].message);
    } else {
        const notification = new Notification(notificationData);
        await notification.save();
    }
}