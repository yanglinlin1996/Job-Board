const express = require("express");
const auth_middleware = require("./auth_middleware");
const router = express.Router();
const JobAccessor = require("./models/Job.Model");
const { v4: uuid } = require("uuid");

const jobs = [
  {
    id: "fc10b559-872c-43cd-bad2-f02e2e0a2d58",
    title: "Day Porter/Janitor",
    companyName: "5 Star 5 Inc",
    location: "Bellevue, WA",
    description: "Job Type: Full-time, Part Time available.",
    employerEmailContact: "abc@gmail.com",
  },
];

// Returns all known Jobs
router.get("/findAll", (request, response) => {
  return JobAccessor.getAllJobs()
    .then((pokemonResponse) => response.status(200).send(pokemonResponse))
    .catch((error) => response.status(400).send(error));
});

// Return Job by id
router.get("/jobSearch", auth_middleware, (request, response) => {
  return JobAccessor.findJobById(request.id)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

// Return Job by title
router.get("/jobSearch", auth_middleware, (request, response) => {
  return JobAccessor.findJobByTitle(request.title)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

// Return Jobs by Company Name
router.get("/jobSearch", auth_middleware, (request, response) => {
  return JobAccessor.findJobByCompanyName(request.companyName)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

// Return Jobs by Location
router.get("/jobSearch", auth_middleware, (request, response) => {
  return JobAccessor.findJobByLocation(request.location)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

// Create a job post
router.post("/create", auth_middleware, (request, response) => {
  const job = request.body;
  if (
    !job.title ||
    !job.companyName ||
    !job.location ||
    !job.description ||
    !job.employerEmailContact
  ) {
    return response.status(422).send("Missing data");
  }

  const jobId = uuid();
  const newJob = {
    id: jobId,
    title: job.title,
    companyName: job.companyName,
    location: job.location,
    description: job.description,
    employerEmailContact: job.employerEmailContact,
    companyWebsite: job.companyWebsite ? job.companyWebsite : "",
    postingDate: new Date(),
  };

  JobAccessor.insertJob(newJob)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

// update the job matching the job id
router.put("/updateJob/:jobId", auth_middleware, (request, response) => {
  const jobId = request.params.jobId;
  const job = request.body;

  // Check if job existed matching the job id
  if (!JobAccessor.findJobById(jobId)) {
    return response.status(404).send("Job post not found.");
  }

  if (
    !job.title ||
    !job.companyName ||
    !job.location ||
    !job.description ||
    !job.employerEmailContact
  ) {
    return response.status(422).send("Missing data");
  }

  request.JobAccessor.updateJobTitleById(jobId, job)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

// Return about information of Job Board
router.get("/about", (request, response) => {
  response.send("This is an online job board posting.");
});

module.exports = router;
