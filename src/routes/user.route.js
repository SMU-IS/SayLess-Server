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
  await User.find(filter).then((response) => {
    console.log(response);
    res.json(response);
  });
});

router.post("/create-user", async (req, res) => {
  const filter = {};
  listingData = new User(req.body);
  postStatus = listingData.save();
  res.json(postStatus);
});

module.exports = router;
