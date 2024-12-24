const express = require("express");
const { verifyToken } = require("../../middleware/admin/admin");
const { addApi, updateApi, deleteApi, getApi } = require("../../controllers/admin/manage_api_controllers");
const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/admin/addApi", verifyToken, addApi);

//PUT METHODS
Router.put("/api/v1.0/admin/updateApi", verifyToken, updateApi);

//PATCH METHODS
Router.patch("/api/v1.0/admin/deleteApi", verifyToken, deleteApi);

//GET METHODS
Router.get("/api/v1.0/admin/getApi", verifyToken, getApi);

module.exports = Router;