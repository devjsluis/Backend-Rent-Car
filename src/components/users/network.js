const controller = require("./controller");
const express = require("express");
const router = express.Router();
const midAuth = require("../../middleware/mid-auth");

router.get("/get", midAuth.isAuth, controller.getUsers);
router.get("/get/:id", midAuth.isAuth, controller.getUserById);
router.post("/create", midAuth.isAuth, controller.createUser);
router.put("/reactivate/:id", controller.reactivateUser);
router.post("/login", controller.loginUser);
router.put("/update/:id", midAuth.isAuth, controller.updateUser);
router.delete("/delete/:id", midAuth.isAuth, controller.deactivateUser);
router.post("/save-profile-image", midAuth.isAuth, controller.saveProfileImage);
router.get("/get-profile-image", midAuth.isAuth, controller.getProfileImage);

module.exports = router;
