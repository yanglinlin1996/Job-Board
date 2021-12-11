const Schema = require("mongoose").Schema;

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
