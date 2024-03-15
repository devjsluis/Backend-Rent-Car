const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/get", controller.getClients);
router.get("/get/:id", controller.getClientById);
router.post("/create", controller.createClient);
router.put("/update/:id", controller.updateClient);
router.delete("/delete/:id", controller.deactivateClient);

module.exports = router;
