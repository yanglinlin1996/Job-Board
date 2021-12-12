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
  return UserModel.findOne({ username }).exec();
}

function updatePasswordByUsername(username, password) {
  return UserModel.updateOne(
    { username: username },
    { $set: { password: password } }
  ).exec();
}

function updateFavoritesById(id, jobId) {
  return UserModel.updateOne(
    { id: id },
    { $push: { favorites: { jobId: jobId } } }
  ).exec();
}

function deleteJobFromFavoritesById(id, jobId) {
  return UserModel.deleteOne(
    { id: id },
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
