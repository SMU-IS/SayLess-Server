const express = require("express");
const router = express.Router();
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
  const filter = {};
  listingData = new Listing(req.body);
  postStatus = listingData.save();
  res.json(postStatus);
  // await Listing.find(filter).then((response) => {
  //     res.json(response);
  // });
});

module.exports = router;
