const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/get", controller.getCatalogs);
router.get("/get/:id", controller.getCatalogById);
router.post("/create", controller.createCatalog);
router.put("/update/:id", controller.updateCatalog);
router.delete("/delete/:id", controller.deleteCatalog);

module.exports = router;
