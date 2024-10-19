const express = require("express");
const multer = require("multer");
const { addUser, blockUser, deleteUser, getUsers, searchUser } = require("../../controllers/admin/manage_user_controllers");
const { verifyToken } = require("../../middleware/admin/admin");
const Router = express.Router();

const  storage = multer.memoryStorage();
const upload  =  multer({storage});

//POST METHODS
Router.post("/api/v1.0/admin/addUser", verifyToken, upload.single("image"),addUser);

//PATCH METHODS 
Router.patch("/api/v1.0/admin/blockUser", verifyToken,blockUser);

//DELETE METHODS
Router.delete("/api/v1.0/admin/deleteUser", verifyToken,deleteUser);

//GET METHODS
Router.get("/api/v1.0/admin/getUsers", verifyToken,getUsers);
Router.get("/api/v1.0/admin/searchUser", verifyToken,searchUser)


module.exports = Router;