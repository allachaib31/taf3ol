const express = require("express");
const multer = require("multer");
const { verifyToken } = require("../../middleware/admin/admin");
const { addGroupCards, deleteGroupCards, getGroupCards, generateRechargeCards, getCards, deleteCards } = require("../../controllers/admin/manage_rechargeCards_controllers");
const Router = express.Router();

const  storage = multer.memoryStorage();
const upload  =  multer({storage});

//POST METHODS
Router.post("/api/v1.0/admin/addGroupCards", verifyToken, upload.single("image"), addGroupCards);
Router.post("/api/v1.0/admin/generateRechargeCards", verifyToken, generateRechargeCards);
Router.post("/api/v1.0/admin/deleteCards", verifyToken, deleteCards);

//DELETE MTEHODS
Router.delete("/api/v1.0/admin/deleteGroupCards", verifyToken, deleteGroupCards);

//GET METHODS
Router.get("/api/v1.0/admin/getGroupCards", verifyToken, getGroupCards);
Router.get("/api/v1.0/admin/getCards", verifyToken, getCards);

module.exports = Router;