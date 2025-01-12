const express = require("express");
const { verifyToken } = require("../../middleware/admin/admin");
const { addCoins, updateCoins, deleteCoins, getCoins } = require("../../controllers/admin/manage_coins_controllers");
const httpStatus = require("http-status");
const Router = express.Router();

// Middleware to verify admin permissions
const verifyPermission = async (req, res, next) => {
    if (req.admin && req.admin.permission && req.admin.permission.settings) {
        return next();
    }
    return res.status(httpStatus.NOT_ACCEPTABLE).send({
        msg: "لا تملك الصلاحيات اللازمة", // "You do not have the necessary permissions"
    });
};

//POST METHODS
Router.post("/api/v1.0/admin/addCoins", verifyToken, verifyPermission, addCoins);

//PUT METHODS
Router.put("/api/v1.0/admin/updateCoins", verifyToken, verifyPermission, updateCoins);

//DELETE METHODS
Router.delete("/api/v1.0/admin/deleteCoins", verifyToken, verifyPermission, deleteCoins);

//GET METHODS
Router.get("/api/v1.0/admin/getCoins", verifyToken, getCoins);

module.exports = Router;