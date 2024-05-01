const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/get", controller.getRol);
router.get("/get/:id", controller.getRolById);
router.post("/create", controller.createRol);
router.put("/update/:id", controller.updateRol);
router.delete("/delete/:id", controller.deleteRol);

module.exports = router;
