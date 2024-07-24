const controller = require("./controller");
const express = require("express");
const router = express.Router();
const midAuth = require("../../middleware/mid-auth");

router.post("/login", controller.loginUser);
router.use(midAuth.isAuth);
router.get("/get", midAuth.hasRole([1, 2]), controller.getUsers);
router.get("/get/:id", midAuth.hasRole([1, 2]), controller.getUserById);
router.post("/create", midAuth.hasRole([1, 2]), controller.createUser);
router.put(
  "/reactivate/:id",
  midAuth.hasRole([1, 2]),
  controller.reactivateUser
);
router.put("/update/:id", midAuth.hasRole([1, 2]), controller.updateUser);
router.delete(
  "/delete/:id",
  midAuth.hasRole([1, 2]),
  controller.deactivateUser
);
router.post(
  "/save-profile-image",
  midAuth.hasRole([1, 2, 3]),
  controller.saveProfileImage
);
router.get(
  "/get-profile-image",
  midAuth.hasRole([1, 2, 3]),
  controller.getProfileImage
);

module.exports = router;
