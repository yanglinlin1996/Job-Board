// const { response } = require("express");
const express = require("express");
const router = express.Router();
const UserModel = require("./models/User.Model");
// const jwt = require("jsonwebtoken");
const auth_middleware = require("./auth_middleware.js");

// Returns all known users
router.get("/findAll", (request, response) => {
  UserModel.getAllUsers()
    .then((userResponse) => {
      response.status(200).send(userResponse);
    })
    .catch((error) => response.status(400).send(error));
});

// check who is logged in with midware auth
router.get("/whoIsLoggedIn", auth_middleware, function (request, response) {
  const username = request.session.username;

  return response.send(request.session);
  // return response.send(username);
});

// check who is logged in without midware auth
router.get("/whoIsLoggedInButWithoutMiddleware", function (request, response) {
  const username = request.session.username;

  return response.send(username);
});

// Return user with requested username
router.get("/getUser/:username", (request, response) => {
  const username = request.params.username;
  if (!username) {
    return response.status(422).send("Missing data");
  }

  return UserModel.findUserByUsername(username)
    .then((userResponse) => {
      if (!userResponse.length) {
        response.status(404).send("User not found");
      }
      response.send(userResponse);
    })
    .catch((error) => response.status(500).send("Issue getting user"));
});

// User login
router.post("/authenticate", (request, response) => {
  let { username, password } = request.body;
  //password = JSON.stringify(password);
  if (!username || !password) {
    return response.status(422).send("Must include both password and username");
  }

  return UserModel.findUserByUsername(username)
    .then((userResponse) => {
      if (!userResponse.length) {
        return response.status(404).send("No user found with that username");
      }
      if (userResponse[0].password === password) {
        request.session.username = username;
        const msg = username + " is logged in!!";
        return response.status(200).send(msg);
      } else {
        return response.status(404).send("Invalid password.");
      }
    })
    .catch((error) => console.error(`Something went wrong: ${error}`));
});

// Create user file with requested username, password and password verification
router.post("/register", (request, response) => {
  const { username, password, confirmedPassword } = request.body;
  // Return error if missing data
  if (!username || !password || !confirmedPassword) {
    return response
      .status(422)
      .send(
        "Missing username: " + username + ", password or password verification."
      );
  }

  // Return error if password or password verification don't match
  if (password !== confirmedPassword) {
    return response
      .status(401)
      .send("Password verification does not match password.");
  }

  // Return error if user registers an existing username
  UserModel.findUserByUsername(username)
    .then((userResponse) => {
      if (userResponse.length) {
        response
          .status(403)
          .send(
            "Error! You registered an existing username. Please try again!"
          );
      } else {
        insertNewUser(request, username, password);
      }
    })
    .catch((error) => response.send(error));

  function insertNewUser(request, username, password) {
    UserModel.insertUser({
      username: username,
      password: password,
      favorites: [],
    })
      .then((userResponse) => {
        request.session.username = username;
        return response
          .status(200)
          .send("Welcome! You registered successfully.");
      })
      .catch((error) => response.status(422).send(error));
  }
});

router.get("/getFavoriteJobsByUser", auth_middleware, (request, response) => {
  const username = request.username;
  UserModel.findUserByUsername(username)
    .then(userResponse => {response.status(200).send(userResponse)})
    .catch(error => request.status(404).send("Fail to remove job favorites list."))
})

// Add job to user's favorites list
router.put("/addFavoriteJob", auth_middleware, (request, response) => {
  const username = request.username;
  const jobId = request.query.id;
  // Check if job already in favorite list
  UserModel.findUserByUsername(username)
    .then((userResponse) => {
      const favorites = userResponse[0].favorites;
      if (favorites.find((job) => job.jobId === jobId)) {
        UserModel.deleteJobFromFavoritesById(username, jobId)
          .then((userResponse) =>
            response
              .status(200)
              .send("Job removed from favorites list successfully!")
          )
          .catch((error) =>
            request.status(404).send("Fail to remove job favorites list.")
          );
      } else {
        return UserModel.updateFavoritesById(username, jobId)
          .then((userResponse) =>
            response
              .status(200)
              .send("Job added to Favorites list successfully!")
          )
          .catch((error) =>
            request.status(404).send("Fail to add job to favorites list.")
          );
      }
    })
    .catch((error) => console.error(`Something went wrong: ${error}`));
});

// Remove job from user job favorite list
// router.delete("/deleteFavoriteJob", (request, response) => {
//   const username = request.query.username;
//   const jobId = request.query.id;
//   UserModel.findUserByUsername(username)
//     .then((userResponse) => {
//       const favorites = userResponse[0].favorites;
//       if (!favorites.find((job) => job.jobId === jobId)) {
//         return response
//           .status(404)
//           .send("The job is not found in the favorite list.");
//       } else {
//         return UserModel.deleteJobFromFavoritesById(username, jobId)
//           .then((userResponse) =>
//             response
//               .status(200)
//               .send("Job removed from Favorites list successfully!")
//           )
//           .catch((error) =>
//             request.status(404).send("Fail to remove job from favorites list.")
//           );
//       }
//     })
//     .catch((error) => console.error(`Something went wrong: ${error}`));
// });

// Log user out
router.post("/logout", (request, response) => {
  request.session.destroy();
  return response.send("Ok");
});

module.exports = router;
