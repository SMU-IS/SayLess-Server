const express = require("express");
const router = express.Router();
const { generateAccessToken } = require("../utils/auth");
// const axios = require("axios");
// const { db } = require("../utils/firebaseConfig");
// const mongoose = require("mongoose");
// const { Schema, SchemaTypes, model } = mongoose;

router.route("/get-token").post(async function (req, res) {
  const data = req.body;
  let token = generateAccessToken("name");
  res.json(token);
});

module.exports = router;
