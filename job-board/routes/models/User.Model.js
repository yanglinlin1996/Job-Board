const mongoose = require("mongoose");
const UserSchema = require("../schema/User.Schema").UserSchema;

const UserModel = mongoose.model("User", UserSchema);

function insertUser(user) {
  return UserModel.create(user);
}

function getAllUsers() {
  return UserModel.find().exec();
}

function findUserByUsername(username) {
  return UserModel.find({ username: username }).exec();
}

function updatePasswordByUsername(username, password) {
  return UserModel.updateOne(
    { username: username },
    { $set: { password: password } }
  ).exec();
}

function updateFavoritesById(username, jobId) {
  return UserModel.updateOne(
    { username: username },
    { $push: { favorites: { jobId: jobId } } }
  ).exec();
}

function deleteJobFromFavoritesById(username, jobId) {
  return UserModel.updateOne(
    { username: username },
    { $pull: { favorites: { jobId: jobId } } }
  );
}

// Make sure to export a function after you create it!
module.exports = {
  insertUser,
  getAllUsers,
  findUserByUsername,
  updatePasswordByUsername,
  updateFavoritesById,
  deleteJobFromFavoritesById,
};
