const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Listing } = require("../models");
const { db } = require("../utils/firebaseConfig");
const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;

// ### Firebase retrieve
// router.route("/get-listing").get(function (req, res) {
//   const addFoodRef = db.collection("Food");
//   addFoodRef
//     .get()
//     .then((snapshot) => {
//       const formattedListings = snapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           cardImage: data.cardImage,
//           cardTitle: data.cardTitle,
//           cardSubTitle: data.cardSubTitle,
//           details: data.details,
//           pickUpTime: data.pickUpTime,
//           distance: data.distance,
//         };
//       });

//       res.json(formattedListings);
//     })
//     .catch((error) => {
//       res.status(404).send("Resource not found");
//     });
// });

router.route("/get-listing").get(async function (req, res) {
  // Empty `filter` means "match all documents"
  const filter = {};
  await Listing.find(filter).then((response) => {
    console.log(response);
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

// router.post("/add-food-listings", (req, res) => {
//   const PostData = req.body;
// {
//     cardImage: 'https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg',
//     cardTitle: 'Potato Chip',
//     cardSubTitle: 'John Doe',
//     details: 'Expiring in 2 days, collect asap. Message me for more details!',
//     pickUpTime: '18:00',
//     distance: '3km',
// }
//   const addFoodRef = db.collection("Food");
//   addFoodRef
//     .add(PostData)
//     .then((snapshot) => {
//       res.json("Success");
//     })
//     .catch((error) => {
//       res.status(404).send("Resource not found");
//     });
// });

// router.get("/get-listing", (req, res) => {
//   const foodListings = [
//     {
//       id: 1,
//       cardImage:
//         "https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg",
//       cardTitle: "Potato Chip",
//       cardSubTitle: "John Doe",
//       details: "Expiring in 2 days, collect asap. Message me for more details!",
//       pickUpTime: "18:00",
//       distance: "3km",
//     },
//     {
//       id: 2,
//       cardImage:
//         "https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg",
//       cardTitle: "Canned Food",
//       cardSubTitle: "Peter Doe",
//       details:
//         "Expiring in 14 days, collect asap. Message me for more details!",
//       pickUpTime: "20:00",
//       distance: "1km",
//     },
//     {
//       id: 3,
//       cardImage:
//         "https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg",
//       cardTitle: "Sourdough",
//       cardSubTitle: "David Doebrea",
//       details: "Expiring in 1 day, collect asap. Message me for more details!",
//       pickUpTime: "21:00",
//       distance: "2km",
//     },
//   ];
//   res.json(foodListings);
// });

module.exports = router;
