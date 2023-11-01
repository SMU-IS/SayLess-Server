const express = require("express");
const router = express.Router();
const { User } = require("../models");
var ObjectId = require("mongoose").Types.ObjectId;
const { generateAccessToken } = require("../utils/auth");
const { firebaseValidate } = require("../middlewares/firebaseauth.middleware");
const { verifyToken } = require("../middlewares/auth.middleware");
const { Quest, ChallengeSet } = require("../models");

const imageURL = `data:image/jpeg;base64,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`;

// router.post("/get-user", async function (req, res) {
//   // Empty `filter` means "match all documents"
//   if (!req.user._id) {
//     res.sendStatus(500);
//     return;
//   }
//   let filter = {
//     _id: req.user._id,
//   };
//   await User.findOne(filter).then((response) => {
//     res.json(response);
//   });
// });

// router.post("/create-user", async (req, res) => {
//   let postData = req.body;
//   postData["createdOn"] = new Date();
//   userData = new User(postData);
//   try {
//     await userData.save();
//     res.sendStatus(200);
//   } catch (err) {
//     res.sendStatus(500);
//   }
// });

function createQuest(userId) {
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
          let QuestData = new Quest({
            userId: userId,
            challengeSet: challengeSet,
            questIcon: imageURL,
            isActive: true,
          });
          // return res.json(challengeSet);

          QuestData.save().then(() => {
            return;
          });
        });
    });
}

async function userLogin(req, res) {
  let userData = req.fbuser;
  const token = await generateAccessToken(userData.userId);
  if (!token) {
    // ERROR Creating Token
    return res.sendStatus(501);
  } else {
    let filter = {
      userId: userData.userId,
    };
    await User.findOne(filter).then((response) => {
      let result = response;
      res.cookie("x-access-token", token, { httpOnly: true });
      result.token = token;
      return res.json({
        userData: response,
        "x-access-token": token,
      });
    });
  }
}

async function createUser(req, res) {
  let userData = req.fbuser;
  let postData = {
    userId: userData.userId,
    email: userData.email,
    name: userData.name || userData.email.split("@")[0],
    profilePic: userData.profilePic || imageURL,
  };
  postData["createdOn"] = new Date();
  userData = new User(postData);
  try {
    await userData.save().then(async (result) => {
      if (result) {
        await createQuest(result.id);
        return userLogin(req, res);
      } else {
        return res.sendStatus(501);
      }
    });
  } catch (err) {
    return res.sendStatus(501);
  }
}

router.use(firebaseValidate).post("/auth", async (req, res) => {
  let userData = req.fbuser;
  let userId = userData.userId;
  User.findOne({
    userId: userId,
  })
    .then((response) => {
      // Login - send create auth
      if (response) {
        return userLogin(req, res);
      }
      // Register - create user, send auth
      else {
        return createUser(req, res);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(501).send("Server Error");
    });
});

module.exports = router;
