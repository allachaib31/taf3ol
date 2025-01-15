const express = require("express");
const { verifyToken } = require("../../middleware/admin/admin");
const { addStock, deleteStock, getStock, stockInfo, addItemStock, getItemStockSold, getItemStockAvailable, getItemStockDamaged, deleteItemStock, updateStockPrice } = require("../../controllers/admin/manage_stock_controllers");
const httpStatus = require("http-status");
const Router = express.Router();

// Middleware to verify admin permissions
const verifyPermission = async (req, res, next) => {
    if (req.admin && req.admin.permission && req.admin.permission.inventory) {
        return next();
    }
    return res.status(httpStatus.NOT_ACCEPTABLE).send({
        msg: "لا تملك الصلاحيات اللازمة", // "You do not have the necessary permissions"
    });
};

//POST METHODS
Router.post("/api/v1.0/admin/addStock", verifyToken, verifyPermission ,addStock);
Router.post("/api/v1.0/admin/addItemStock", verifyToken, verifyPermission ,addItemStock)

//PATCH METHODS
Router.patch("/api/v1.0/admin/updateStockPrice", verifyToken, verifyPermission ,updateStockPrice);
Router.patch("/api/v1.0/admin/deleteStock", verifyToken, verifyPermission ,deleteStock);
Router.patch("/api/v1.0/admin/deleteItemStock", verifyToken, verifyPermission ,deleteItemStock);

//GET METHODS
Router.get("/api/v1.0/admin/getStock", verifyToken, getStock);
Router.get("/api/v1.0/admin/stockInfo", verifyToken, stockInfo);
Router.get("/api/v1.0/admin/getItemStockSold", verifyToken, getItemStockSold);
Router.get("/api/v1.0/admin/getItemStockAvailable", verifyToken, getItemStockAvailable);
Router.get("/api/v1.0/admin/getItemStockDamaged", verifyToken, getItemStockDamaged);

module.exports = Router;