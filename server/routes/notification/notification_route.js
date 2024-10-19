const express = require("express");
const { verifyToken } = require("../../middleware/admin/admin");
const { getAllNotificationsForAdmin, getMessage } = require("../../controllers/notification/notification_controllers");
const Router = express.Router();

//GET METHODS
Router.get("/api/v1.0/admin/getNotificationAdmin", verifyToken, getAllNotificationsForAdmin);
Router.get("/api/v1.0/admin/getMessage", verifyToken, getMessage);

module.exports = Router;