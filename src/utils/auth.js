const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
  return jwt.sign(
    {
      username: username,
    },
    process.env.TOKEN_KEY
  );
}

module.exports = { generateAccessToken };
