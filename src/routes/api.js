const express = require("express");
// IMPORTS
const listingRoute = require("./listing.route");
const recipeRoute = require("./recipe.route");
const questRoute = require("./quest.route");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const chatRoomRoute = require("./chatroom.route");
const chatRoute = require("./chat.route");
const inventoryRoute = require("./inventory.route");
const fileRoute = require("./file.route");

// SAMPLE DATA
const sampleRoute = require("./sampledata.route");
// AUTH
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/listing",
    route: listingRoute,
  },
  {
    path: "/quest",
    route: questRoute,
  },
  {
    path: "/chatroom",
    route: chatRoomRoute,
  },
  {
    path: "/chat",
    route: chatRoute,
  },
  {
    path: "/inventory",
    route: inventoryRoute,
  },
  {
    path: "/file",
    route: fileRoute,
  },
  {
    path: "/recipe",
    route: recipeRoute,
  },
];

const noSecurityRoutes = [
  // {
  //   path: "/cred",
  //   route: authRoute,
  // },
  {
    path: "/user",
    route: userRoute,
  },
  // {
  //   path: "/sample",
  //   route: sampleRoute,
  // },
];

// AUTH ROUTES
defaultRoutes.forEach((route) => {
  router.use(route.path, auth, route.route);
});

// NO AUTH ROUTES
noSecurityRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
