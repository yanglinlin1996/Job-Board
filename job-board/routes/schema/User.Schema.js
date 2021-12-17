const Schema = require("mongoose").Schema;
const JobSchema = require("../schema/Job.Schema").JobSchema;

exports.UserSchema = new Schema(
  {
    username: String,
    password: String,
    favorites: {
      type: Array,
    },
  },
  {
    collection: "users",
  }
);
