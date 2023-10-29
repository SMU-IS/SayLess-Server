const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const { Listing } = require("../models");

router.route("/get-listing").get(async function (req, res) {
  // Empty `filter` means "match all documents"
  const filter = {
    isAvailable: true,
  };
  await Listing.find()
    .populate("createdBy")
    .populate("requested")
    .then((response) => {
      res.json(response);
    });
});

router.post("/add-food-listings", async (req, res) => {
  let postData = req.body;
  postData["createdBy"] = req.user._id;
  postData["createdOn"] = new Date();
  postData["isAvailable"] = true;
  listingData = new Listing(postData);
  try {
    listingData
      .save({
        new: true, // Returns updated
      })
      .then((response) => {
        res.json(response);
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post("/update-food-listings", async (req, res) => {
  if (!req.body.listingId || !req.body.updateInfo) {
    res.sendStatus(500);
    return;
  }
  // PROTECT
  try {
    filter = { _id: req.body.listingId, createdBy: req.user._id };
    await Listing.findOne(filter)
      .populate("createdBy")
      .then(async (response) => {
        console.log(response);
        let { createdBy } = response;
        if (createdBy._id.toString() == req.user._id) {
          data = await Listing.findOneAndUpdate(filter, req.body.updateInfo, {
            new: true, // Returns updated
          });
          res.json(data);
          return;
        }
        res.sendStatus(500);
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post("/close-food-listings", async (req, res) => {
  if (!req.body.listingId) {
    res.sendStatus(500);
    return;
  }
  // PROTECT
  try {
    filter = { _id: req.body.listingId, createdBy: req.user._id };
    await Listing.findOne(filter)
      .populate("createdBy")
      .then(async (response) => {
        let { createdBy } = response;
        if (createdBy._id.toString() == req.user._id) {
          data = await Listing.findOneAndUpdate(
            filter,
            {
              isAvailable: false,
            },
            {
              new: true, // Returns updated
            }
          );
          res.json(data);
          return;
        }
        res.sendStatus(500);
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post("/request-food-listings", async (req, res) => {
  if (!req.user && !req.body.listingId) {
    return res.sendStatus(500);
  }
  let userId = req.user._id;
  filter = {
    _id: req.body.listingId,
  };
  let postData = {
    $addToSet: { requested: userId },
  };
  await Listing.findOneAndUpdate(filter, postData).then(async () => {
    await Listing.findOne(filter)
      .populate("createdBy")
      .populate("requested")
      .then((response) => {
        return res.json(response);
      });
  });
});

module.exports = router;
