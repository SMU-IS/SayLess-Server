const { fbauth } = require("../config/firebaseConfig");

const imageURL =
  "https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg";

async function firebaseValidate(req, res, next) {
  if (!req.body.accessTokenId) {
    return res.status(403).send("TOKEN NOT FOUND");
  }
  token = req.body.accessTokenId;
  await fbauth
    .verifyIdToken(token)
    .then(async (decodedToken) => {
      let { email, name, picture, user_id } = decodedToken;
      if (!name) {
        name = email.split("@")[0];
        picture = imageURL;
      }
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
