const express = require("express");
const sql = require("../../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  sql`INSERT INTO users (email, password, profile_img_url) VALUES (${email}, ${password}, ${null})     returning *`
    .then((user) => {
      const token = jwt.sign(user[0], process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res.status(201).json({ message: "User created", user: user[0], token });
    })
    .catch((err) => {
      console.log(err);
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

router.post("/google-login", async (req, res) => {
  const { token } = req.body;
  const { data } = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token
  );
  const { email, name, picture } = data;

  console.log(data);

  const sqlData = await sql`SELECT * from users WHERE email = ${email}`;

  console.log(sqlData);

  if (sqlData.length) {
    const token = jwt.sign(sqlData[0], process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.json({ message: "Login successful", user: sqlData[0], token });
  } else {
    return res.json({
      message: "This user isnt registered",
      email,
      name,
      picture,
    });
  }
});

router.post("/spotify-login", async (req, res) => {
  const { token } = req.body;
  const { data } = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { email, display_name } = data;

  console.log(data);

  const sqlData = await sql`SELECT * from users WHERE email = ${email}`;

  console.log(sqlData);

  if (sqlData.length) {
    const token = jwt.sign(sqlData[0], process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.json({ message: "Login successful", user: sqlData[0], token });
  } else {
    return res.json({
      message: "This user isnt registered",
      email,
      display_name,
    });
  }
});
module.exports = router;
