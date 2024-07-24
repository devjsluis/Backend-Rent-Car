const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

app.use(cors());

const router = require("./network/routes");
router(app);

app.listen(3003, () => {
  console.log("Server is running on port 3000");
});
