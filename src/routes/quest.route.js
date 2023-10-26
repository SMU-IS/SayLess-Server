const express = require("express");
const router = express.Router();
const axios = require("axios");
var ObjectId = require("mongoose").Types.ObjectId;
const { Quest, Challenges, ChallengeSet } = require("../models");
const MAX_QUEST_LENGTH = 3;
const imageURL =
  "https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg";
const STATUS = {
  completed: "Completed",
  start: "Start",
  inprogress: "In Progress",
};
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
        path: "challenge",
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
        .populate("challenges")
        .exec()
        .then((result) => {
          console.log(result);
          challengeSet = result.challenges;
          challengeSet = challengeSet.map((obj) => ({
            challenge: obj,
            status: "Start",
          }));
          console.log(challengeSet);
          let QuestData = new Quest({
            userId: userId,
            challengeSet: challengeSet,
            questIcon: imageURL,
            isActive: true,
          });
          // return res.json(challengeSet);

          QuestData.save().then(() => {
            Quest.findOne(filter).then((response) => {
              return res.json(response);
            });
          });
        });
    });
}

router.post("/create-quests", (req, res) => {
  if (!req.user && !req.body.completed) {
    return res.sendStatus(500);
  }
  return createQuest(req, res);
});

router.post("/update-quests", async (req, res) => {
  if (!req.user && !req.body.challengeId) {
    return res.sendStatus(500);
  }
  let userId = req.user._id;
  filter = {
    userId: new ObjectId(userId),
    isActive: true,
    "challengeSet.challenge": new ObjectId(req.body.challengeId),
  };
  let postData = {
    $set: { "challengeSet.$[element].status": req.body.status },
  };
  await Quest.findOneAndUpdate(filter, postData, {
    arrayFilters: [{ "element.challenge": req.body.challengeId }],
    new: true, // Return the updated document
  }).then(async (response) => {
    if (!response) {
      return res.sendStatus(500);
    }
    const completedChallenges = response.challengeSet.filter(
      (challenge) => challenge.status === STATUS.completed
    );
    if (completedChallenges.length >= MAX_QUEST_LENGTH) {
      // build new quest
      let postData = {
        isActive: false,
      };
      await Quest.findOneAndUpdate(filter, postData).then((response) => {
        return createQuest(req, res);
      });
    } else {
      return res.json(response);
    }
  });
});
module.exports = router;
