const { fbauth } = require("../config/firebaseConfig");

async function firebaseValidate(req, res, next) {
  if (!req.body.accessTokenId) {
    return res.status(403).send("TOKEN NOT FOUND");
  }
  token = req.body.accessTokenId;
  await fbauth
    .verifyIdToken(token)
    .then(async (decodedToken) => {
      const { email, name, picture, user_id } = decodedToken;
      req.fbuser = {
        userId: user_id,
        email: email,
        name: name,
        profilePic: picture,
      };
      next();
    })
    .catch((error) => {
      //   console.error("Error verifying Firebase token:", error);
      return res.status(403).send("Unauthorized");
    });
}

module.exports = { firebaseValidate };
