const express = require("express");
const multer = require("multer");
const { verifyToken } = require("../../middleware/admin/admin");
const { addGroupCards, deleteGroupCards, getGroupCards, generateRechargeCards, getCards, deleteCards } = require("../../controllers/admin/manage_rechargeCards_controllers");
const httpStatus = require("http-status");
const Router = express.Router();

const  storage = multer.memoryStorage();
const upload  =  multer({storage});

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
Router.post("/api/v1.0/admin/addGroupCards", verifyToken, verifyPermission,  upload.single("image"), addGroupCards);
Router.post("/api/v1.0/admin/generateRechargeCards", verifyToken, verifyPermission,  generateRechargeCards);
Router.post("/api/v1.0/admin/deleteCards", verifyToken, verifyPermission,  deleteCards);

//DELETE MTEHODS
Router.delete("/api/v1.0/admin/deleteGroupCards", verifyToken, verifyPermission,  deleteGroupCards);

//GET METHODS
Router.get("/api/v1.0/admin/getGroupCards", verifyToken, getGroupCards);
Router.get("/api/v1.0/admin/getCards", verifyToken, getCards);

module.exports = Router;