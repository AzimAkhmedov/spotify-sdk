const express = require("express");

const sql = require("../../db");

const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

router.get("/", (req, res) => {});


module.exports = router;
