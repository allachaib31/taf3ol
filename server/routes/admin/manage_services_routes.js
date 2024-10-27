const express = require("express");
const multer = require("multer");
const { verifyToken } = require("../../middleware/admin/admin");
const { addCategorie, getCategories, getServices, addService, searchService, addTypeCategorie, getTypeCategories } = require("../../controllers/admin/manage_services_controllers");
const Router = express.Router();

const  storage = multer.memoryStorage();
const upload  =  multer({storage});

//POST METHODS
Router.post("/api/v1.0/admin/addCategorie", verifyToken, upload.single("image"), addCategorie);
Router.post("/api/v1.0/admin/addService", verifyToken, addService);
Router.post("/api/v1.0/admin/addTypeCategorie", verifyToken, addTypeCategorie);

//GET METHODS
Router.get("/api/v1.0/admin/getCategories", verifyToken, getCategories);
Router.get("/api/v1.0/admin/getServices", verifyToken, getServices);
Router.get("/api/v1.0/admin/getTypeCategories", verifyToken, getTypeCategories)
Router.get("/api/v1.0/admin/searchService", verifyToken, searchService);

module.exports = Router;