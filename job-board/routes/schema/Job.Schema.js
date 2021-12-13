const Schema = require("mongoose").Schema;

exports.JobSchema = new Schema(
  {
    id: String,
    title: String,
    companyName: String,
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    employerEmailContact: String,
    companyWebsite: String, // optional
    // this explicitly declares what collection we're using
    creator: String,
    postingDate: Date,
  },
  { collection: "jobs" }
);
