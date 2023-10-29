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
        from: "chats",
        localField: "_id",
        foreignField: "chatroomId",
        as: "latest_msg",
      },
    },
    {
      $addFields: {
        latest_msg: { $slice: ["$latest_msg", 1] },
      },
    },
  ])
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(404).send("err");
    });
  // Chatroom.find(filter)
  //   .populate("participants")
  //   .populate("listing")
  //   .then((response) => {
  //     var resData = [];
  //     response.forEach((element) => {
  //       Chat.findOne({
  //         chatroomId: element._id,
  //       }).then((latestChatData) => {
  //         if (latestChatData) {
  //           element["latest_msg"] = latestChatData.message;
  //           resData.push(element);
  //           console.log(resData);
  //         }
  //       });
  //     });
  //     console.log(resData);
  //     res.json(resData);
  //   });
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
