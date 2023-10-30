const express = require("express");
const router = express.Router();
const { User } = require("../models");
var ObjectId = require("mongoose").Types.ObjectId;
const { generateAccessToken } = require("../utils/auth");
const { firebaseValidate } = require("../middlewares/firebaseauth.middleware");
const { verifyToken } = require("../middlewares/auth.middleware");

const imageURL =
  "https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg";

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
    await userData.save().then((result) => {
      if (result) {
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
