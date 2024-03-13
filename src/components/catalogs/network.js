const controller = require('./controller');
const express = require('express');
const router = express.Router();

router.get('/list', controller.list);

module.exports = router;