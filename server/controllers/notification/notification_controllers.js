const httpStatus = require('http-status'); // HTTP status codes
const { Notification } = require('../../models/notifucation/notifucation');

// Pagination helper function
const applyPagination = (query, req) => {
    const limit = parseInt(req.query.limit, 10) || 20; // Number of notifications per page
    const page = parseInt(req.query.page, 10) || 1; // Current page number
    const skip = (page - 1) * limit; // Calculate how many notifications to skip

    return query.skip(skip).limit(limit);
};

exports.getAllNotificationsForAdmin = async (req, res) => {
    try {
        const userId = req.admin._id; // Get the Admin's ID from the request
        const adminModel = "Admin"; // Define the model type for admin

        // Query to fetch notifications for the admin
        let query = Notification.find({
            $or: [
                { receiverId: userId, receiverModel: adminModel }, // Notifications specific to this admin
                { isGlobal: true, receiverModel: adminModel } // Global notifications accessible to all admins
            ]
        }).populate({
            path: 'senderId',
            model: 'Admin'
        })
        .sort({ createdAt: -1 }); // Sort notifications by creation date in descending order (newest first)

        // Apply pagination to the query
        query = applyPagination(query, req);

        // Execute the query and fetch notifications
        const notifications = await query.exec();
        // Respond with the notifications
        res.status(httpStatus.OK).json({
            success: true,
            notifications: notifications,
            msg: 'Notifications fetched successfully',
            currentPage: req.query.page || 1, // Current page number
            limit: req.query.limit || 20 // Limit of notifications per page
        });
    } catch (err) {
        // Handle errors gracefully
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error fetching notifications' });
    }
};

// Get all notifications for Client
exports.getAllNotificationsForClient = async (req, res) => {
    try {
        const userId = req.user._id; // Client ID
        const userModel = "User"; // Model type for user

        // Query to fetch notifications
        let query = Notification.find({
            $or: [
                { receiverId: userId, receiverModel: userModel }, // Notifications specific to this user
                { isGlobal: true, receiverModel: userModel } // Global notifications for all users
            ]
        })
        .sort({ createdAt: -1 }); // Sort by createdAt in descending order (newest first)

        // Apply pagination
        query = applyPagination(query, req);

        // Execute the query
        const notifications = await query.exec();

        // Respond with the notifications
        res.status(httpStatus.OK).json({
            success: true,
            data: notifications,
            msg: 'Notifications fetched successfully',
            currentPage: req.query.page || 1,
            limit: req.query.limit || 20
        });
    } catch (err) {
        // Handle errors
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error fetching notifications' });
    }
};

exports.getMessage = async (req, res) => {
    try {
        const userId = req.admin._id; // Get the Admin's ID from the request
        const { userid2 } = req.query;

        // Query to fetch notifications for the admin
        let query = Notification.find({
            type: 'message',
            $or: [
                { receiverId: userId, senderId: userid2},
                { receiverId: userid2, senderId: userId }
            ]
        })
        .sort({ createdAt: -1 }); // Sort notifications by creation date in descending order (newest first)

        // Apply pagination to the query
        query = applyPagination(query, req);

        // Execute the query and fetch notifications
        const notifications = await query.exec();

        // Respond with the notifications
        res.status(httpStatus.OK).json({
            success: true,
            notifications: notifications,
            msg: 'Notifications fetched successfully',
            currentPage: req.query.page || 1, // Current page number
            limit: req.query.limit || 20 // Limit of notifications per page
        });
    } catch (err) {
        // Handle errors gracefully
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error fetching notifications' });
    }
};