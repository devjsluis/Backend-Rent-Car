const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const router = require('./network/routes');
router(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});