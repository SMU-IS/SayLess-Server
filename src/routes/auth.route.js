const express = require("express");
const router = express.Router();
const { generateAccessToken } = require("../utils/auth");

router.route("/get-token").post(async function (req, res) {
  const data = req.body;
  body("email", "email is required");
  let token = generateAccessToken(data);
  res.json(token);
});

module.exports = router;
