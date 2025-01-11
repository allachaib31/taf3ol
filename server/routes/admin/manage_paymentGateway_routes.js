const express = require("express");
const multer = require("multer");
const { verifyToken } = require("../../middleware/admin/admin");
const { addPaymentGateway, getPaymentGateway, deletePaymentGateway, updatePaymentGateway } = require("../../controllers/admin/manage_paymentGateway_controllers");
const Router = express.Router();
const  storage = multer.memoryStorage();
const upload  =  multer({storage});

//POST METHODS
Router.post("/api/v1.0/admin/addPaymentGateway", verifyToken, upload.single("image"), addPaymentGateway);

//PUT METHODS
Router.put("/api/v1.0/admin/updatePaymentGateway", verifyToken, upload.single("image"), updatePaymentGateway)

//DELETE METHODS
Router.delete("/api/v1.0/admin/deletePaymentGateway", verifyToken, deletePaymentGateway);

//GET METHODS
Router.get("/api/v1.0/admin/getPaymentGateway", verifyToken, getPaymentGateway);

module.exports = Router;