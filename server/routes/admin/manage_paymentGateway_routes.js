const express = require("express");
const multer = require("multer");
const { verifyToken } = require("../../middleware/admin/admin");
const { addPaymentGateway, getPaymentGateway, deletePaymentGateway, updatePaymentGateway } = require("../../controllers/admin/manage_paymentGateway_controllers");
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
Router.post("/api/v1.0/admin/addPaymentGateway", verifyToken, upload.single("image"), addPaymentGateway);

//PUT METHODS
Router.put("/api/v1.0/admin/updatePaymentGateway", verifyToken, upload.single("image"), updatePaymentGateway)

//DELETE METHODS
Router.delete("/api/v1.0/admin/deletePaymentGateway", verifyToken, deletePaymentGateway);

//GET METHODS
Router.get("/api/v1.0/admin/getPaymentGateway", verifyToken, getPaymentGateway);

module.exports = Router;