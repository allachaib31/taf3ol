const express = require("express");
const { verifyToken } = require("../../middleware/admin/admin");
const { addStock, deleteStock, getStock, stockInfo, addItemStock, getItemStockSold, getItemStockAvailable, getItemStockDamaged, deleteItemStock } = require("../../controllers/admin/manage_stock_controllers");
const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/admin/addStock", verifyToken, addStock);
Router.post("/api/v1.0/admin/addItemStock", verifyToken, addItemStock)

//PATCH METHODS
Router.patch("/api/v1.0/admin/deleteStock", verifyToken, deleteStock);
Router.patch("/api/v1.0/admin/deleteItemStock", verifyToken, deleteItemStock);

//GET METHODS
Router.get("/api/v1.0/admin/getStock", verifyToken, getStock);
Router.get("/api/v1.0/admin/stockInfo", verifyToken, stockInfo);
Router.get("/api/v1.0/admin/getItemStockSold", verifyToken, getItemStockSold);
Router.get("/api/v1.0/admin/getItemStockAvailable", verifyToken, getItemStockAvailable);
Router.get("/api/v1.0/admin/getItemStockDamaged", verifyToken, getItemStockDamaged);

module.exports = Router;