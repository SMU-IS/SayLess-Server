const express = require("express");
const router = express.Router();
const { User, Listing } = require("../models");

const imageURL =
  "https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg";

async function populateListingSample() {
  listingData = new Listing({
    listingImages: [imageURL, imageURL],
    listingTitle: "Potato Chip",
    listingDetails:
      "Expiring in 2 days, collect asap. Message me for more details!",
    pickUpLocation: "SAMPLE COORDS",
    isAvailable: true,
    createdOn: new Date(),
    createdBy: "6530d24110a9828679f8858a",
  });
  try {
    await listingData.save();
  } catch (err) {
    return false;
  }
  return true;
}

async function populateUserSample() {
  userData = new User({
    userId: "YG1IgtstQDNcqa50hEcEuEHBahR2",
    email: "cxang.2022@smu.edu.sg",
    name: "JOSHUA DAVID ANG CHUN XIONG _",
    profilePic: imageURL,
  });
  try {
    await userData.save();
  } catch (err) {
    return false;
  }
  return true;
}

router.get("/populate-listing-sample", async function (req, res) {
  await populateListingSample().then(async (result) => {
    if (result) {
      await Listing.find({}).then((response) => {
        res.json(response);
        return;
      });
    } else {
      res.sendStatus(500);
    }
  });
});

router.get("/populate-user-sample", async function (req, res) {
  await populateUserSample().then(async (result) => {
    if (result) {
      await User.find({}).then((response) => {
        res.json(response);
        return;
      });
    } else {
      res.sendStatus(500);
    }
  });
});

module.exports = router;
