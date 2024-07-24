const express = require("express");

const sql = require("../../db");

const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

router.post("/me", (req, res) => {});

router.post("/search-history", (req, res) => {});

router.post("/history", (req, res) => {});

router.use();
module.exports = router;
