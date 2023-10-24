const express = require("express");
const router = express.Router();
const {
  User,
  Listing,
  Chatroom,
  Chat,
  Challenges,
  ChallengeSet,
  Quest,
} = require("../models");

const imageURL =
  "https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg";

async function populateListingSample() {
  let listingData = new Listing({
    listingImages: [imageURL, imageURL],
    listingTitle: "Potato Chip",
    listingDetails:
      "Expiring in 2 days, collect asap. Message me for more details!",
    pickUpLocation: "SAMPLE COORDS",
    isAvailable: true,
    createdBy: "6530d24110a9828679f8858a",
  });
  try {
    await listingData.save();
  } catch (err) {
    return false;
  }
  return true;
}

async function populateUserSample() {
  let userData = new User({
    userId: "YG1IgtstQDNcqa50hEcEuEHBahR2",
    email: "cxang.2022@smu.edu.sg",
    name: "JOSHUA DAVID ANG CHUN XIONG _",
    profilePic: imageURL,
  });
  try {
    await userData.save();
  } catch (err) {
    return false;
  }
  return true;
}

async function populateChatroomSample() {
  let userData = new Chatroom({
    participants: ["6530d24110a9828679f8858a", "6530e927da6325020804e042"],
    listing: "6530e7fa6c0f66a765d151be",
  });
  try {
    await userData.save();
  } catch (err) {
    return false;
  }
  return true;
}

async function populateChatSample() {
  let userData = new Chat({
    chatroomId: "65310c2b5698bc2d3f17cf05",
    sender: "6530d24110a9828679f8858a",
    message: "Test message",
    read: false,
  });
  try {
    await userData.save();
  } catch (err) {
    return false;
  }
  return true;
}

async function populateChallengesSample() {
  let ChallengesData = new Challenges({
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  });
  try {
    await ChallengesData.save();
  } catch (err) {
    return false;
  }
  return true;
}

async function populateChallengeSetSample() {
  let ChallengeSetData = new ChallengeSet({
    challenges: [
      "653767cabeca8f1fa9473322",
      "653767e6a456e880499948db",
      "65376b37eeedf45dd416465e",
    ],
  });
  try {
    await ChallengeSetData.save();
  } catch (err) {
    return false;
  }
  return true;
}

async function populateQuestSample() {
  let QuestData = new Quest({
    userId: "6530d24110a9828679f8858a",
    challengeSet: "6537aba7d2673c6c6cb3b652",
    completed: ["65376b37eeedf45dd416465e"],
    questIcon: imageURL,
    isActive: true,
  });
  try {
    await QuestData.save();
  } catch (err) {
    return false;
  }
  return true;
}

//   ROUTES
router.get("/populate-listing-sample", async function (req, res) {
  await populateListingSample().then(async (result) => {
    if (result) {
      await Listing.find({}).then((response) => {
        res.json(response);
        return;
      });
    } else {
      res.sendStatus(500);
    }
  });
});

router.get("/populate-user-sample", async function (req, res) {
  await populateUserSample().then(async (result) => {
    if (result) {
      await User.find({}).then((response) => {
        res.json(response);
        return;
      });
    } else {
      res.sendStatus(500);
    }
  });
});

router.get("/populate-chatroom-sample", async function (req, res) {
  await populateChatroomSample().then(async (result) => {
    if (result) {
      await Chatroom.find({}).then((response) => {
        res.json(response);
        return;
      });
    } else {
      res.sendStatus(500);
    }
  });
});

router.get("/populate-chat-sample", async function (req, res) {
  await populateChatSample().then(async (result) => {
    if (result) {
      await Chatroom.find({}).then((response) => {
        res.json(response);
        return;
      });
    } else {
      res.sendStatus(500);
    }
  });
});

router.get("/populate-challenges-sample", async function (req, res) {
  await populateChallengesSample().then(async (result) => {
    if (result) {
      await Challenges.find({}).then((response) => {
        res.json(response);
        return;
      });
    } else {
      res.sendStatus(500);
    }
  });
});

router.get("/populate-challengeset-sample", async function (req, res) {
  await populateChallengeSetSample().then(async (result) => {
    if (result) {
      await ChallengeSet.find({})
        .populate("challenges")
        .then((response) => {
          res.json(response);
          return;
        });
    } else {
      res.sendStatus(500);
    }
  });
});

router.get("/populate-quest-sample", async function (req, res) {
  await populateQuestSample().then(async (result) => {
    if (result) {
      await Quest.find({})
        .populate("challengeSet")
        .then((response) => {
          res.json(response);
          return;
        });
    } else {
      res.sendStatus(500);
    }
  });
});

module.exports = router;
