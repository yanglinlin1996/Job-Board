const mongoose = require("mongoose");
const JobSchema = require("../schema/Job.Schema").JobSchema;

const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
  return JobModel.create(job);
}

function getAllJobs() {
  return JobModel.find().exec();
}

function getJobsByUser(creator) {
  return JobModel.find({ creator: creator }).exec();
}

function findJobById(id) {
  return JobModel.find({ id: id }).exec();
}

function findJobByTitle(title) {
  return JobModel.find({ title: { $regex: title, $options: "i" } }).exec();
  //   return JobModel.find({
  //     title: title,
  //   }).exec();
}

function findJobByCompanyName(companyName) {
  return JobModel.find({
    companyName: { $regex: companyName, $options: "i" },
  }).exec();
}

function findJobByLocation(location) {
  return JobModel.find({
    location: { $regex: location, $options: "i" },
  }).exec();
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

function updateJobTitleById(id, title) {
  return JobModel.updateOne({ id: id }, { $set: { title: title } }).exec();
}

function updateJobLocationById(id, location) {
  return JobModel.updateOne(
    { id: id },
    { $set: { location: location } }
  ).exec();
}

function updateCompanyNameById(id, companyName) {
  return JobModel.updateOne(
    { id: id },
    { $set: { companyName: companyName } }
  ).exec();
}

function updateDescriptionById(id, description) {
  return JobModel.updateOne(
    { id: id },
    { $set: { description: description } }
  ).exec();
}

function updateEmployerEmailContactById(id, employerEmailContact) {
  return JobModel.updateOne(
    { id: id },
    { $set: { employerEmailContact: employerEmailContact } }
  ).exec();
}

function updateCompanyWebsiteById(id, companyWebsite) {
  return JobModel.updateOne(
    { id: id },
    { $set: { companyWebsite: companyWebsite } }
  ).exec();
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
  getAllJobs,
  getJobsByUser,
  findJobById,
  findJobByTitle,
  findJobByCompanyName,
  findJobByLocation,
  deleteJobById,
  updateJobTitleById,
  updateJobLocationById,
  updateCompanyNameById,
  updateDescriptionById,
  updateEmployerEmailContactById,
  updateCompanyWebsiteById,
  updateJobDetailsById,
  findJobByJobDetails,
};
