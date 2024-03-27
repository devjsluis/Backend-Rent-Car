const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/get", controller.getVehicles);
router.get("/get/:id", controller.getVehicleById);
router.post("/create", controller.createVehicle);
router.put("/update/:id", controller.updateVehicle);
router.delete("/delete/:id", controller.deactivateVehicle);

module.exports = router;
