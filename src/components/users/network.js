const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/get", controller.getUsers);
router.get("/get/:id", controller.getUserById);
router.post("/create", controller.createUser);
router.post("/login", controller.loginUser);
router.put("/update/:id", controller.updateUser);
router.delete("/delete/:id", controller.deactivateUser);

module.exports = router;
