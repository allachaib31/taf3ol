const express = require("express");
const { verifyToken } = require("../../middleware/admin/admin");
const { addApi, updateApi, deleteApi, getApi } = require("../../controllers/admin/manage_api_controllers");
const httpStatus = require("http-status");
const Router = express.Router();

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
Router.post("/api/v1.0/admin/addApi", verifyToken, verifyPermission, addApi);

//PUT METHODS
Router.put("/api/v1.0/admin/updateApi", verifyToken, verifyPermission ,updateApi);

//PATCH METHODS
Router.patch("/api/v1.0/admin/deleteApi", verifyToken, verifyPermission, deleteApi);

//GET METHODS
Router.get("/api/v1.0/admin/getApi", verifyToken ,getApi);

module.exports = Router;