const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.post("/get-user", async function (req, res) {
  // Empty `filter` means "match all documents"
  let filter = {};
  if (req.body) {
    filter = {
      _id: req.body.userId,
    };
  }
  await User.findOne(filter).then((response) => {
    res.json(response);
  });
});

router.post("/create-user", async (req, res) => {
  userData = new User(req.body);
  try {
    await userData.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
