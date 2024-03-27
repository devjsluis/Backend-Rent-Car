const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/get", controller.getRegisterRent);
// router.get("/get/:id", controller.getRegisterRentById);
router.post("/create/:idClient/:idVehicle", controller.createRegisterRent);
// router.put("/update/:id", controller.updateRegisterRent);
// router.delete("/delete/:id", controller.deactivateRegisterRent);

module.exports = router;
