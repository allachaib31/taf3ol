const express = require("express");
const multer = require("multer");
const { addAdmin, updateAdmin, updatePassword, blockAdmin, deleteAdmin, getAdmins, searchAdmin } = require("../../controllers/admin/manage_admin_controllers");
const { verifyToken } = require("../../middleware/admin/admin");
const Router = express.Router();

const  storage = multer.memoryStorage();
const upload  =  multer({storage});

//POST METHODS
Router.post("/api/v1.0/admin/addAdmin", verifyToken, upload.single("image"),addAdmin);

//PUT METHODS
Router.put("/api/v1.0/admin/updateAdmin", verifyToken,updateAdmin);

//PATCH METHODS 
Router.patch("/api/v1.0/admin/updatePassword", verifyToken,updatePassword);
Router.patch("/api/v1.0/admin/blockAdmin", verifyToken,blockAdmin);

//DELETE METHODS
Router.delete("/api/v1.0/admin/deleteAdmin", verifyToken,deleteAdmin);

//GET METHODS
Router.get("/api/v1.0/admin/getAdmins", verifyToken,getAdmins);
Router.get("/api/v1.0/admin/searchAdmin", verifyToken,searchAdmin)


module.exports = Router;