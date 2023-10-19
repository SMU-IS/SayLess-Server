const jwt = require("jsonwebtoken");
const { User } = require("../models");

async function generateAccessToken(userId) {
  let filter = {
    userId: userId,
  };
  var userData = await User.findOne(filter);
  try {
    if (userData) {
      let { _id, userId, email, name, profilePic } = userData;
      _id = _id.toString();
      let data = {
        _id: _id,
        userId: userId,
        email: email,
        name: name,
        profilePic: profilePic,
      };
      return jwt.sign(data, process.env.TOKEN_KEY);
    }
  } catch (err) {}
  return false;
}

module.exports = { generateAccessToken };
