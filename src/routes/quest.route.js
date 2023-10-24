const express = require("express");
const router = express.Router();
const axios = require("axios");
var ObjectId = require("mongoose").Types.ObjectId;
const { Quest, Challenges, ChallengeSet } = require("../models");
const MAX_QUEST_LENGTH = 3;
const imageURL =
  "https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg";

// router.get("/get-quests", (req, res) => {
//   const sampleOut = {
//     id: 1,
//     questID: 1,
//     completed: 3,
//     checked: false,
//     icon: "https://picsum.photos/200/300",
//     content:
//       "Lorem 1 ipsum dolor sit amet consectetur. Vitae consequat ipsum sed pharetra dolor pellentesque risus. Nibh magna mol",
//     status: "Not Started",
//   };
//   res.json(sampleOut);
// });

router.get("/get-quests", (req, res) => {
  if (!req.user) {
    return res.sendStatus(500);
  }
  let userId = req.user._id;
  filter = {
    userId: new ObjectId(userId),
    isActive: true,
  };
  Quest.findOne(filter)
    .populate({
      path: "challengeSet",
      populate: {
        path: "challenges",
      },
    })
    .then((response) => {
      if (!response) {
        return createQuest(req, res);
      } else {
        return res.json(response);
      }
    });
});

function createQuest(req, res) {
  let userId = req.user._id;
  let filter = {
    userId: new ObjectId(userId),
    isActive: true,
  };
  ChallengeSet.count()
    .exec()
    .then(function (count) {
      var random = Math.floor(Math.random() * count);
      ChallengeSet.findOne()
        .skip(random)
        .exec()
        .then((result) => {
          let QuestData = new Quest({
            userId: userId,
            challengeSet: result.id,
            completed: [],
            questIcon: imageURL,
            isActive: true,
          });
          QuestData.save().then(() => {
            Quest.findOne(filter).then((response) => {
              return res.json(response);
            });
          });
        });
    });
}

// router.post("/create-quests", (req, res) => {
//   if (!req.user && !req.body.completed) {
//     return res.sendStatus(500);
//   }
//   return createQuest(req, res);
// });

router.post("/update-quests", (req, res) => {
  if (!req.user && !req.body.completed) {
    return res.sendStatus(500);
  }
  let userId = req.user._id;
  filter = {
    userId: new ObjectId(userId),
    isActive: true,
  };
  let postData = {
    $addToSet: { completed: req.body.completed },
  };
  Quest.findOneAndUpdate(filter, postData).then((response) => {
    if (!response) {
      return res.sendStatus(500);
    }
    Quest.findOne(filter).then((response) => {
      if (response.completed.length == MAX_QUEST_LENGTH) {
        // build new quest
        let postData = {
          isActive: false,
        };
        Quest.findOneAndUpdate(filter, postData).then((response) => {
          return createQuest(req, res);
          // Quest.findOne(filter).then((response) => {
          //   return res.json(response);
          // });
        });
      } else {
        return res.json(response);
      }
    });
  });
});
module.exports = router;
