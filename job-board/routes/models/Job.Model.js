const mongoose = require("mongoose");
const JobSchema = require("../schema/Job.Schema").JobSchema;

const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
  return JobModel.create(job);
}

function getJobsByUser(creator) {
  return JobModel.find({ creator: creator }).exec();
}

function findJobById(id) {
  return JobModel.find({ id: id }).exec();
}

function findJobByTitle(title) {
  return JobModel.find({ title: { $regex: title, $options: "i" } }).exec();
}

function findJobByJobDetails(jobDetails) {
  return JobModel.find({
    title: jobDetails.title,
    companyName: jobDetails.companyName,
    location: jobDetails.location,
    description: jobDetails.description,
    employerEmailContact: jobDetails.employerEmailContact,
  }).exec();
}

function deleteJobById(id) {
  return JobModel.deleteOne({ id: id }).exec();
}

function updateJobDetailsById(id, jobDetails) {
  return JobModel.updateOne(
    { id: id },
    {
      $set: {
        title: jobDetails.title,
        companyName: jobDetails.companyName,
        location: jobDetails.location,
        description: jobDetails.description,
        employerEmailContact: jobDetails.employerEmailContact,
        companyWebsite: jobDetails.companyWebsite
          ? jobDetails.companyWebsite
          : "",
        postingDate: new Date(),
      },
    }
  );
}

// Make sure to export a function after you create it!
module.exports = {
  insertJob,
  getJobsByUser,
  findJobById,
  findJobByTitle,
  deleteJobById,
  updateJobDetailsById,
  findJobByJobDetails,
};
