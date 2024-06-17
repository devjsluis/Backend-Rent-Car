const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/get", controller.getVehicles);
router.get("/getVehicles", controller.getVehiclesMarca);
router.get("/getVehiclesAll", controller.getVehiclesAll);
router.get("/get/:id", controller.getVehicleById);
router.post("/create", controller.createVehicle);
router.put("/update/:id", controller.updateVehicle);
router.put("/reactivate/:id", controller.reactivateVehicle);
router.delete("/delete/:id", controller.deactivateVehicle);

module.exports = router;
