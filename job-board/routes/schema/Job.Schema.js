const Schema = require("mongoose").Schema;

exports.JobSchema = new Schema(
  {
    id: Number,
    title: String,
    companyName: String,
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    employerEmailContact: String,
    companyWebsite: String,
    // this explicitly declares what collection we're using
  },
  { collection: "jobs" }
);