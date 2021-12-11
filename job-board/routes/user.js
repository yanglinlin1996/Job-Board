// const { response } = require("express");
const express = require("express");
const router = express.Router();
const UserModel = require("./models/User.Model");
// const jwt = require("jsonwebtoken");
//const auth_middleware = require("./auth_middleware.js");

// Returns all known users
router.get("/findAll", (request, response) => {
  UserModel.getAllUsers()
    .then((userResponse) => {
      response.status(200).send(userResponse);
    })
    .catch((error) => response.status(400).send(error));
});

// ???
// router.get("/whoIsLoggedIn", auth_middleware, function (request, response) {
//   const username = request.session.username;

//   return response.send(username);
// });

// ???
// router.get("/whoIsLoggedInButWithoutMiddleware", function (request, response) {
//   const username = request.session.username;

//   return response.send(username);
// });

// Return user with requested username
router.get("/:username", (request, response) => {
  const username = request.params.username;
  if (!username) {
    return response.status(422).send("Missing data");
  }

  return UserModel.findUserByUsername(username)
    .then((userResponse) => {
      if (!userResponse) {
        response.status(404).send("User not found");
      }
      response.send(userResponse);
    })
    .catch((error) => response.status(500).send("Issue getting user"));
});

// User login
router.post("/authenticate", (request, response) => {
  let { username, password } = request.body;
  password = JSON.stringify(password);
  if (!username || !password) {
    return response.status(422).send("Must include both password and username");
  }

  return UserModel.findUserByUsername(username)
    .then((userResponse) => {
      if (!userResponse) {
        return response.status(404).send("No user found with that username");
      }
      if (userResponse.password === password) {
        request.session.username = username;
        return response.status(200).send({ username });
      } else {
        return response.status(404).send("Invalid password!");
      }
    })
    .catch((error) => console.error(`Something went wrong: ${error}`));
});

// Create user file with requested username, password and password verification
router.post("/register", (req, res) => {
  const { username, password, confirmedPassword } = req.body;
  // Return error if missing data
  if (!username || !password || !confirmedPassword) {
    return res
      .status(422)
      .send(
        "Missing username: " + username + ", password or password verification."
      );
  }

  // Return error if password or password verification don't match
  if (password !== confirmedPassword) {
    return res
      .status(401)
      .send("Password verification does not match password.");
  }

  // Return error if user registers an existing username
  if (UserModel.findUserByUsername(username)) {
    return res
      .status(403)
      .send("Error! You registered an existing username. Please try again!");
  }

  return UserModel.insertUser({
    username: username,
    password: password,
    favorites: [],
  })
    .then((userResponse) => {
      req.session.username = username;
      return res.status(200).send("Welcome! You registered successfully.");
    })
    .catch((error) => res.status(422).send(error));
});

// Log user out
router.post("/logout", (request, response) => {
  request.session.destroy();
  return response.send("Ok");
});

module.exports = router;
