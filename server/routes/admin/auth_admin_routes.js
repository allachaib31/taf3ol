const express = require("express");
const { authAdmin, isValidateToken, forgotPassword, resetPassword } = require("../../controllers/admin/auth_admin_controllers");
const { verifyToken } = require("../../middleware/admin/admin");
const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/admin/auth", authAdmin);
Router.post("/api/v1.0/admin/forgot-password", forgotPassword)
Router.post('/api/v1.0/admin/reset-password/:token', resetPassword);

//GET METHODS
Router.get("/api/v1.0/admin/isValidateToken", verifyToken, isValidateToken);

module.exports = Router;