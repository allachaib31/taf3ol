const { Notification, validateNotification } =  require("../models/notifucation/notifucation");

exports.saveNotification = async (sender, senderModel, receiverModel, type, content, isGlobal, receiverId=null, contentEn=null, session ) => {
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
        await notification.save({ session });
    }
}

exports.defaultsGroupsMoney = [
    {
        name: "VIP-1",
        pricingType: "Percent",
        value: 8,
        negativeBalance: 10,
        agentRatio: 2,
        meritValue: 0,
        defaultGroup: true
    },
    {
        name: "VIP-2",
        pricingType: "Percent",
        value: 5,
        negativeBalance: 7,
        agentRatio: 2,
        meritValue: 700,
        defaultGroup: true
    },
    {
        name: "VIP-3",
        pricingType: "Percent",
        value: 3,
        negativeBalance: 5,
        agentRatio: 2,
        meritValue: 1400,
        defaultGroup: true
    },
]