const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const { Inventory } = require("../models");

router.route("/get-inventory").get(async function (req, res) {
  // Empty `filter` means "match all documents"
  const filter = {
    createdBy: new ObjectId(req.user._id),
  };
  console.log(req.user._id);
  await Inventory.find(filter).then((response) => {
    res.json(response);
  });
});

function getRandomExpiryDate() {
  const currentDate = new Date();
  const minDays = 3;
  const maxDays = 3 * 30; // 3 months, assuming an average of 30 days per month
  const randomDays =
    Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;

  // Create a new date by adding the random number of days to the current date
  const expiryDate = new Date(currentDate);
  expiryDate.setDate(currentDate.getDate() + randomDays);

  // Format the date as "YYYY-MM-DD"
  const year = expiryDate.getFullYear();
  const month = (expiryDate.getMonth() + 1).toString().padStart(2, "0");
  const day = expiryDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

router.post("/add-inventory", async function (req, res) {
  if (!req.body.itemName) {
    return res.status(501).send("itemName is required");
  }
  let postArr = [];
  for (let item of req.body.itemName) {
    let postData = {
      itemName: item,
    };
    postData["expiry"] = getRandomExpiryDate();
    postData["createdOn"] = new Date();
    postData["createdBy"] = req.user._id;
    let postDoc = new Inventory(postData);
    postArr.push(postDoc);
  }
  Inventory.insertMany(postArr)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(501).send("Error updaing");
    });
});

router.post("/update-inventory", async function (req, res) {
  if (!req.body.itemId || !req.body.itemName || !req.body.itemExpiry) {
    return res.status(501).send("inventory fields required");
  }
  let postArr = {
    itemName: req.body.itemName,
    expiry: req.body.itemExpiry,
  };
  let filter = {
    _id: new ObjectId(req.body.itemId),
  };
  Inventory.findOneAndUpdate(filter, postArr, {
    new: true,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(501).send("Error updaing");
    });
});

module.exports = router;
