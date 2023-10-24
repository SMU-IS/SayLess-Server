const express = require("express");
const router = express.Router();
const { Chatroom } = require("../models");

router.get("/get-chatrooms", async function (req, res) {
  if (!req.user) {
    res.sendStatus(500);
    return;
  }
  let userId = req.user._id;
  filter = {
    participants: { $in: userId },
  };
  console.log(filter);
  Chatroom.find(filter)
    .lean()
    .populate("participants", "listing")
    .then((response) => {
      res.json(response);
    });
});

router.post("/create-chatrooms", async function (req, res) {
  if (!req.user) {
    res.sendStatus(500);
    return;
  }
  let postData = req.body;
  postData["createdOn"] = new Date();
  let chatroomData = new Chatroom(postData);
  try {
    chatroomData.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
