const express = require("express");
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
const { Chatroom, Chat } = require("../models");

router.get("/get-chatrooms", async function (req, res) {
  if (!req.user) {
    res.sendStatus(500);
    return;
  }
  let userId = req.user._id;
  filter = {
    participants: { $in: [new ObjectId(userId)] },
  };
  Chatroom.aggregate([
    {
      $match: filter,
    },
    {
      $lookup: {
        from: "listings", // Replace 'listings' with the actual name of the referenced collection
        localField: "listing",
        foreignField: "_id",
        as: "listing",
      },
    },
    {
      $lookup: {
        from: "users", // Replace 'users' with the actual name of the referenced collection
        localField: "participants",
        foreignField: "_id",
        as: "participants",
      },
    },
    {
      $lookup: {
        from: "chats",
        localField: "_id",
        foreignField: "chatroomId",
        as: "latest_msg",
      },
    },
    {
      $addFields: {
        latest_msg: { $slice: ["$latest_msg", -1] },
      },
    },
    {
      $lookup: {
        from: "chats",
        localField: "_id",
        foreignField: "chatroomId",
        as: "unread_msg",
      },
    },
    {
      $addFields: {
        unread_msg: {
          $filter: {
            input: "$unread_msg",
            as: "chat",
            cond: {
              $and: [
                {
                  $ne: ["$$chat.sender", new ObjectId(req.user._id)], // Replace with the specific sender_id
                },
                { $eq: ["$$chat.read", false] }, // Filter only unread messages
              ],
            },
          },
        },
      },
    },
  ])
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(404).send(err);
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
    chatroomData.save().then((result) => {
      res.json(result);
    });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
