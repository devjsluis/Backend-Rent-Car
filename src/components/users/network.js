const controller = require("./controller");
const express = require("express");
const router = express.Router();
const midAuth = require("../../middleware/mid-auth");
const administratorIdRol = Number(process.env.ADMINISTRATOR_ID_ROL);
const managerIdRol = Number(process.env.MANAGER_ID_ROL);
const sellerIdRol = Number(process.env.SELLER_ID_ROL);

router.post("/login", controller.loginUser);
router.use(midAuth.isAuth);
router.get(
  "/get",
  midAuth.hasRole([administratorIdRol, managerIdRol]),
  controller.getUsers
);
router.get(
  "/get/:id",
  midAuth.hasRole([administratorIdRol, managerIdRol]),
  controller.getUserById
);
router.post(
  "/create",
  midAuth.hasRole([administratorIdRol, managerIdRol]),
  controller.createUser
);
router.put(
  "/reactivate/:id",
  midAuth.hasRole([administratorIdRol, managerIdRol]),
  controller.reactivateUser
);
router.put(
  "/update/:id",
  midAuth.hasRole([administratorIdRol, managerIdRol]),
  controller.updateUser
);
router.delete(
  "/delete/:id",
  midAuth.hasRole([administratorIdRol, managerIdRol]),
  controller.deactivateUser
);
router.post(
  "/save-profile-image",
  midAuth.hasRole([administratorIdRol, managerIdRol, sellerIdRol]),
  controller.saveProfileImage
);
router.get(
  "/get-profile-image",
  midAuth.hasRole([administratorIdRol, managerIdRol, sellerIdRol]),
  controller.getProfileImage
);

module.exports = router;
