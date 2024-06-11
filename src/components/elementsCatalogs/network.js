const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/get", controller.getElementsCatalog);
router.get("/getTipos", controller.getTipos);
router.get("/getMarcas", controller.getMarcas);
router.get("/getModelos", controller.getModelos);
router.get("/getAnios", controller.getAnios);
router.get("/get/:id", controller.getElementsCatalogById);
router.post("/create", controller.createElementsCatalog);
router.put("/update/:id", controller.updateElementsCatalog);
router.put("/reactivate/:id", controller.reactivateElementsCatalog);
router.delete("/delete/:id", controller.deleteElementsCatalog);

module.exports = router;
