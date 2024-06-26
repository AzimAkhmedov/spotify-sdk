const express = require("express");
const sql = require("../../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  sql`INSERT INTO users (email, password, profile_img_url) VALUES (${email}, ${password}, ${null})`
    .then((user) => {
      res.status(201).json({ message: "User created", user });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  sql`SELECT * FROM users WHERE email = ${email} AND password = ${password}`
    .then((data) => {
      if (data.length > 0) {
        const token = jwt.sign(data[0], process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.json({ message: "Login successful", user: data[0], token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
  // var sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
  // db.query(sql, [username, password], (err, result) => {
  //     if (err) {
  //         console.error("Error in SQL query:", err);
  //         return res.status(500).json({ error: 'Internal Server Error' });
  //     }
  //     if (result.length > 0) {
  //         console.log("User found:", result);
  //         res.json({ message: 'Login successful' });
  //     } else {
  //         console.log("User not found");
  //         res.status(401).json({ error: 'Invalid credentials' });
  //     }
  // });
});

module.exports = router;
