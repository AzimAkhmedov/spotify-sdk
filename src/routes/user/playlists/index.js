const express = require("express");
const sql = require("../../db");
const router = express.Router();

router.post("/create", (req, res) => {});
router.delete("delete/:{playlist_id}", (req, res) => {});
router.patch("update/:{playlist_id}", (req, res) => {});

router.get("/:{paylist_id}", (req, res) => {
  const { playlist_id } = req.params;
});

router.post("/:{playlist_id}/add", (req, res) => {});

router.delete("/:{playlist_id}/remove", (req, res) => {});

module.exports = router;
