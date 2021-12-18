const mongoose = require("mongoose");
const UserSchema = require("../schema/User.Schema").UserSchema;

const UserModel = mongoose.model("User", UserSchema);

function insertUser(user) {
  return UserModel.create(user);
}

function findUserByUsername(username) {
  return UserModel.find({ username: username }).exec();
}

function updateFavoritesById(username, job) {
  return UserModel.updateOne(
    { username: username },
    { $push: { favorites: job } }
  ).exec();
}

function deleteJobFromFavoritesById(username, jobId) {
  return UserModel.updateOne(
    { username: username },
    { $pull: { favorites: { id: jobId } } }
  );
}

module.exports = {
  insertUser,
  findUserByUsername,
  updateFavoritesById,
  deleteJobFromFavoritesById,
};
