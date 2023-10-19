const express = require("express");
const router = express.Router();
const { generateAccessToken } = require("../utils/auth");

router.post("/get-token", async function (req, res) {
  if (!req.body.userId) {
    res.sendStatus(500);
    return;
  }
  const token = await generateAccessToken(req.body.userId);
  if (!token) {
    res.sendStatus(500);
  } else {
    res.json(token);
  }
});

module.exports = router;
