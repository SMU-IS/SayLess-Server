const jwt = require("jsonwebtoken");

function generateAccessToken(userData) {
  let { id, email, name, profilePic } = userData;
  return jwt.sign(
    {
      id: id,
      email: email,
      name: name,
      profilePic: profilePic,
    },
    process.env.TOKEN_KEY
  );
}

module.exports = { generateAccessToken };
