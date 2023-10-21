const express = require("express");
const router = express.Router();
const { Chat } = require("../models");

router.post("/get-chats", async function (req, res) {
  if (!req.user || !req.body.chatroomId) {
    res.sendStatus(500);
    return;
  }
  filter = {
    chatroomId: req.body.chatroomId,
  };
  Chat.find(filter).then((response) => {
    res.json(response);
  });
});

router.post("/create-chat", async function (req, res) {
  if (!req.user) {
    res.sendStatus(500);
    return;
  }
  let postData = req.body;
  postData["createdOn"] = new Date();
  let chatData = new Chat(postData);
  try {
    chatData.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
