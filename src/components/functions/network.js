const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/get", controller.getFunctions);
router.get("/get/:id", controller.getFunctionById);
router.post("/create", controller.createFunction);
router.put("/update/:id", controller.updateFunction);
router.delete("/delete/:id", controller.deleteFunction);

module.exports = router;
