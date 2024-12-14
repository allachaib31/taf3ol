const express = require("express");
const multer = require("multer");
const { verifyToken } = require("../../middleware/admin/admin");
const { addCategorie, getCategories, getCategorieServicesApiRoute, addService, addProduct, searchService, addTypeService, getTypeServices, getServicesApi, updateTypeService, deleteTypeService, updateCategorie, updateTypeServiceRanking, deleteCategorie, getProducts, addGroupMoney, getGroupMoney, updateGroupMoney, deleteGroupMoney, addProductsApi, getProductsStock } = require("../../controllers/admin/manage_services_controllers");
const Router = express.Router();

const  storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024, // Limit file size to 100MB
        fieldSize: 5 * 1024 * 1024,  // Limit individual field size to 5MB
    },
});

//POST METHODS
Router.post("/api/v1.0/admin/addCategorie", verifyToken, upload.single("image"), addCategorie);
Router.post("/api/v1.0/admin/addService", verifyToken, addService);
Router.post("/api/v1.0/admin/addTypeService", verifyToken, upload.single("image"), addTypeService);
Router.post("/api/v1.0/admin/addProduct", verifyToken, upload.single("image"), addProduct);
Router.post("/api/v1.0/admin/addGroupMoney", verifyToken, upload.single("image"), addGroupMoney);
Router.post("/api/v1.0/admin/addProductsApi", verifyToken, addProductsApi)

//PUT METHODS
Router.put("/api/v1.0/admin/updateTypeServiceRanking", verifyToken, updateTypeServiceRanking);

//PATCH METHODS
Router.patch("/api/v1.0/admin/updateTypeService", verifyToken, upload.single("image"), updateTypeService);
Router.patch("/api/v1.0/admin/updateCategorie", verifyToken, upload.single("image"), updateCategorie);
Router.patch("/api/v1.0/admin/updateGroupMoney", verifyToken, upload.single("image"), updateGroupMoney)
Router.patch("/api/v1.0/admin/deleteGroupMoney", verifyToken, deleteGroupMoney);

//GET METHODS
Router.get("/api/v1.0/admin/getCategories", verifyToken, getCategories);
Router.get("/api/v1.0/admin/getCategorieServicesApiRoute", verifyToken, getCategorieServicesApiRoute);
Router.get("/api/v1.0/admin/getServicesApi", verifyToken, getServicesApi);
Router.get("/api/v1.0/admin/getTypeServices", verifyToken, getTypeServices);
Router.get("/api/v1.0/admin/searchService", verifyToken, searchService);
Router.get("/api/v1.0/admin/getProducts", verifyToken, getProducts);
Router.get("/api/v1.0/admin/getProductsStock", verifyToken, getProductsStock)
Router.get("/api/v1.0/admin/getGroupMoney", verifyToken, getGroupMoney)

//DELETE METHODS
Router.delete("/api/v1.0/admin/deleteTypeService/:id", verifyToken, deleteTypeService);
Router.delete("/api/v1.0/admin/deleteCategorie/:id", verifyToken, deleteCategorie);

module.exports = Router;