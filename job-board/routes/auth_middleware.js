const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  console.log("entering auth middleware...");
  console.log("request session is: ", req.session);
  const username = req.session.username;
  console.log("midware username is: ", username);
  if (!username) {
    console.log("haha no username!!")
    res.status(401).send("Unauthorized: No session available");
  } else {
    req.username = username;
    next();
  }
};
