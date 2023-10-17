// id: 1,
// questID: 1,
// checked: false,
// icon: CheckBadgeIcon,
// content: 'Lorem 1 ipsum dolor sit amet consectetur. Vitae consequat ipsum sed pharetra dolor pellentesque risus. Nibh magna mol'
// status: 'Not Started',

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/get-quests", (req, res) => {
  const sampleOut = {
    id: 1,
    questID: 1,
    completed: 3,
    checked: false,
    icon: "https://picsum.photos/200/300",
    content:
      "Lorem 1 ipsum dolor sit amet consectetur. Vitae consequat ipsum sed pharetra dolor pellentesque risus. Nibh magna mol",
    status: "Not Started",
  };
  res.json(sampleOut);
});

module.exports = router;
