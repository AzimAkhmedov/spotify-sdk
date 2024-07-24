const express = require("express");

const sql = require("../../db");

const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

router.post("/history", (req, res) => {});

router.post("/stats", (req, res) => {});

    // router.post("/", (req, res) => {});

router.use();
module.exports = router;
