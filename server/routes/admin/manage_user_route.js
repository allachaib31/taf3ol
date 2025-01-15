const express = require("express");
const multer = require("multer");
const { addUser, changeStatus, deleteUsers, getUsers, searchUser, getUserData, getFinancialUser, addNegativeBalance, addBalance, getLevelUser, addCustomPrice, deleteCustomPrice, getCustomPrice, reduceBalance } = require("../../controllers/admin/manage_user_controllers");
const { verifyToken } = require("../../middleware/admin/admin");
const httpStatus = require("http-status");
const Router = express.Router();

const  storage = multer.memoryStorage();
const upload  =  multer({storage});

// Middleware to verify admin permissions
const verifyPermission = async (req, res, next) => {
    if (req.admin && req.admin.permission && req.admin.permission.customerControl) {
        return next();
    }
    return res.status(httpStatus.NOT_ACCEPTABLE).send({
        msg: "لا تملك الصلاحيات اللازمة", // "You do not have the necessary permissions"
    });
};

//POST METHODS
Router.post("/api/v1.0/admin/addUser", verifyToken, verifyPermission, upload.single("image"),addUser);
Router.post("/api/v1.0/admin/addCustomPrice", verifyToken, verifyPermission, addCustomPrice);

//DELETE METHODS
Router.delete("/api/v1.0/admin/deleteCustomPrice", verifyToken, verifyPermission, deleteCustomPrice);

//PATCH METHODS 
Router.patch("/api/v1.0/admin/changeStatus", verifyToken, verifyPermission, changeStatus);
Router.patch("/api/v1.0/admin/addBalance", verifyToken, verifyPermission, addBalance);
Router.patch("/api/v1.0/admin/reduceBalance", verifyToken, verifyPermission, reduceBalance);
Router.patch("/api/v1.0/admin/addNegativeBalance", verifyToken, verifyPermission, addNegativeBalance);
Router.patch("/api/v1.0/admin/deleteUsers", verifyToken, verifyPermission, deleteUsers);

//GET METHODS
Router.get("/api/v1.0/admin/getUsers", verifyToken, getUsers);
Router.get("/api/v1.0/admin/searchUser", verifyToken, searchUser);
Router.get("/api/v1.0/admin/getUserData", verifyToken, getUserData);
Router.get("/api/v1.0/admin/getFinancialUser", verifyToken, getFinancialUser);
Router.get("/api/v1.0/admin/getLevelUser", verifyToken, getLevelUser);
Router.get("/api/v1.0/admin/getCustomPrice", verifyToken, getCustomPrice);

module.exports = Router;