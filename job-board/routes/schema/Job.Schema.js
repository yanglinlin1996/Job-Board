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
    companyWebsite: String,
    creator: String,
    postingDate: Date,
  },
  { collection: "jobs" }
);
