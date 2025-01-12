const express = require("express");
const multer = require("multer");
const httpStatus = require("http-status");
const {
    addAdmin,
    updateAdmin,
    updatePassword,
    blockAdmin,
    deleteAdmin,
    getAdmins,
    searchAdmin,
} = require("../../controllers/admin/manage_admin_controllers");
const { verifyToken } = require("../../middleware/admin/admin");
const Router = express.Router();

// Configure multer for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to verify admin permissions
const verifyPermission = async (req, res, next) => {
    if (req.admin && req.admin.permission && req.admin.permission.adminControl) {
        return next();
    }
    return res.status(httpStatus.NOT_ACCEPTABLE).send({
        msg: "لا تملك الصلاحيات اللازمة", // "You do not have the necessary permissions"
    });
};

// POST METHODS
Router.post(
    "/api/v1.0/admin/addAdmin",
    verifyToken,
    verifyPermission,
    upload.single("image"),
    addAdmin
);

// PUT METHODS
Router.put(
    "/api/v1.0/admin/updateAdmin",
    verifyToken,
    verifyPermission,
    updateAdmin
);

// PATCH METHODS
Router.patch(
    "/api/v1.0/admin/updatePassword",
    verifyToken,
    verifyPermission,
    updatePassword
);
Router.patch(
    "/api/v1.0/admin/blockAdmin",
    verifyToken,
    verifyPermission,
    blockAdmin
);

// DELETE METHODS
Router.delete(
    "/api/v1.0/admin/deleteAdmin",
    verifyToken,
    verifyPermission,
    deleteAdmin
);

// GET METHODS
Router.get(
    "/api/v1.0/admin/getAdmins",
    verifyToken,
    getAdmins
);
Router.get(
    "/api/v1.0/admin/searchAdmin",
    verifyToken,
    searchAdmin
);

module.exports = Router;
