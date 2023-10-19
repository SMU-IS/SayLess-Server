const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const { Listing } = require("../models");

router.route("/get-listing").get(async function (req, res) {
  // Empty `filter` means "match all documents"
  const filter = {};
  await Listing.find()
    .populate("createdBy")
    .then((response) => {
      res.json(response);
    });
});

router.post("/add-food-listings", async (req, res) => {
  listingData = new Listing(req.body);
  try {
    listingData.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post("/update-food-listings", async (req, res) => {
  if (!req.body.listingId || !req.body.updateInfo) {
    res.sendStatus(500);
    return;
  }
  filter = { _id: req.body.listingId };
  try {
    data = await Listing.findOneAndUpdate(filter, req.body.updateInfo, {
      new: true, // Returns updated
    });
    res.json(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
