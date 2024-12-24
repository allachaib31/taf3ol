const express = require("express");
const multer = require("multer");
const { addUser, changeStatus, deleteUsers, getUsers, searchUser, getUserData, getFinancialUser, addNegativeBalance, addBalance } = require("../../controllers/admin/manage_user_controllers");
const { verifyToken } = require("../../middleware/admin/admin");
const Router = express.Router();

const  storage = multer.memoryStorage();
const upload  =  multer({storage});

//POST METHODS
Router.post("/api/v1.0/admin/addUser", verifyToken, upload.single("image"),addUser);

//PATCH METHODS 
Router.patch("/api/v1.0/admin/changeStatus", verifyToken, changeStatus);
Router.patch("/api/v1.0/admin/addBalance", verifyToken, addBalance);
Router.patch("/api/v1.0/admin/addNegativeBalance", verifyToken, addNegativeBalance);
Router.patch("/api/v1.0/admin/deleteUsers", verifyToken, deleteUsers);

//GET METHODS
Router.get("/api/v1.0/admin/getUsers", verifyToken, getUsers);
Router.get("/api/v1.0/admin/searchUser", verifyToken, searchUser);
Router.get("/api/v1.0/admin/getUserData", verifyToken, getUserData);
Router.get("/api/v1.0/admin/getFinancialUser", verifyToken, getFinancialUser)

module.exports = Router;