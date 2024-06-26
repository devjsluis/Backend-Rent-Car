const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/get", controller.getRegisterRent);
router.get("/getAnual", controller.getRegisterRentAnual);
router.get("/getLastDays", controller.getRegisterRent7Days);
router.get("/get/:id", controller.getRegisterRentById);
router.post("/create", controller.createRegisterRent);
router.put("/update/:id", controller.updateRegisterRent);
router.put("/reactivate/:id", controller.reactivateRegisterRent);
router.delete("/delete/:id", controller.deactivateRegisterRent);

module.exports = router;
