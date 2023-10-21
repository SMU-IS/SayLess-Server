const jwt = require("jsonwebtoken");

// SAMPLE req.user
// {
//   _id: '6530d24110a9828679f8858a',
//   userId: 'YG1IgtstQDNcqa50hEcEuEHBahR2',
//   email: 'cxang.2022@smu.edu.sg',
//   name: 'JOSHUA DAVID ANG CHUN XIONG _',
//   profilePic: 'https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg',
//   iat: 1697709848
// }
const verifyToken = (req, next) => {
  const token = req.handshake.headers["x-access-token"];
  if (!token) {
    return req.emit("error", "no Token");
    // return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    // return res.status(401).send("Invalid Token");
    return req.emit("error", err);
  }
  return next();
};

module.exports = verifyToken;
