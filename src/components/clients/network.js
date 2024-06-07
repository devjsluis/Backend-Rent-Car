const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/get", controller.getClients);
router.get("/getByName", controller.getClientsByName);
router.get("/getLastDays", controller.getClients15Days);
router.get("/getNew", controller.getNewClients);
router.get("/get/:id", controller.getClientById);
router.post("/create", controller.createClient);
router.put("/update/:id", controller.updateClient);
router.put("/reactivate/:id", controller.reactivateClient);
router.delete("/delete/:id", controller.deactivateClient);

module.exports = router;
