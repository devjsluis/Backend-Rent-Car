const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/get", controller.getElementsCatalog);
router.get("/get/:id", controller.getElementsCatalogById);
router.post("/create", controller.createElementsCatalog);
router.put("/update/:id", controller.updateElementsCatalog);
router.delete("/delete/:id", controller.deleteElementsCatalog);

module.exports = router;
