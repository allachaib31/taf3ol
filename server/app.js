const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { Notification, validateNotification } = require('./models/notifucation/notifucation');

const app = express();  // Express app instance
const server = http.createServer(app);  // Combine Express app with the HTTP server

// Initialize Socket.IO server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",  // Allow requests from your frontend
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
});

// Middleware to verify JWT from headers in WebSocket
io.use((socket, next) => {
    const token = socket.handshake.headers['authorization'];
    if (!token) {
        return next(new Error('Authentication error'));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWTKEY);
        socket.userId = decoded._id;
        next();
    } catch (err) {
        next(new Error('Authentication error'));
    }
});
// WebSocket connection event
io.on('connection', (socket) => {
    console.log(`User with ID ${socket.userId} connected`);

    // Add user to a room based on their user ID
    socket.join(socket.userId);

    // Handle sending a direct message to a specific user
    socket.on('send-message', async (sendMessage) => {
        const notificationData = {
            senderId: socket.userId,
            senderModel: 'Admin',
            receiverId: sendMessage.toUserId,
            receiverModel: 'Admin',
            type: 'message',
            content: sendMessage.message,
            isGlobal: false 
        };
        const { errorNotification } = validateNotification(notificationData);
        if (errorNotification) {
            throw new Error(errorNotification.details[0].message);
        } else {
            let notification = new Notification(notificationData);
            await notification.save();
    
            // Populate the senderId and receiverId fields with their respective models
            notification = await Notification.findById(notification._id)
                .populate({
                    path: 'senderId',
                    select: 'username email',  // Fields to populate from sender (Admin/User)
                    model: notification.senderModel  // Populate based on senderModel
                })
            io.to(sendMessage.toUserId).emit('receive-message', notification);  // Send message to specific user
        }
    });

    // Example: Admin sending a notification to a specific user
    socket.on('send-notification', (notification, toUserId) => {
        io.to(toUserId).emit('receive-notification', notification);  // Send notification to the specified user
    });

    // Example: Broadcast a notification to all connected users
    socket.on('broadcast-notification', (notification) => {
        socket.broadcast.emit('receive-notification', notification);  // Send notification to all users
    });

    socket.on('disconnect', () => {
        console.log(`User with ID ${socket.userId} disconnected`);
    });
});

module.exports = { server, app, express };  // Export both the server and app
