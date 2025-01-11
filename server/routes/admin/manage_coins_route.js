const express = require("express");
const { verifyToken } = require("../../middleware/admin/admin");
const { addCoins, updateCoins, deleteCoins, getCoins } = require("../../controllers/admin/manage_coins_controllers");
const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/admin/addCoins", verifyToken, addCoins);

//PUT METHODS
Router.put("/api/v1.0/admin/updateCoins", verifyToken, updateCoins);

//DELETE METHODS
Router.delete("/api/v1.0/admin/deleteCoins", verifyToken, deleteCoins);

//GET METHODS
Router.get("/api/v1.0/admin/getCoins", verifyToken, getCoins);

module.exports = Router;