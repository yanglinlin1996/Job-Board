const express = require("express");
const auth_middleware = require("./auth_middleware");
const router = express.Router();
const JobAccessor = require("./models/Job.Model");
const { v4: uuid } = require("uuid");

// Returns all known Jobs
router.get("/findAll", (request, response) => {
  return JobAccessor.getAllJobs()
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

// Return Job by id
router.get("/jobSearch/:id", (request, response) => {
  console.log(request.params.id);
  return JobAccessor.findJobById(request.params.id)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

// Return Job by title
router.get("/jobSearchByTitle/:title", (request, response) => {
  return JobAccessor.findJobByTitle(request.params.title)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

// Create a job post
router.post("/create", auth_middleware, (request, response) => {
  console.log("entering create job......");
  const job = request.body;
  console.log(JSON.stringify(job));
  if (
    !job.title ||
    !job.companyName ||
    !job.location ||
    !job.description ||
    !job.employerEmailContact
  ) {
    return response.status(422).send("Missing data");
  }

  job.creator = request.username;

  // Check if the new job post content already exists
  JobAccessor.findJobByJobDetails(job)
    .then((jobResponse) => {
      if (jobResponse.length) {
        response.status(409).send("Error! Job already exists.");
      } else {
        createJob(job);
      }
    })
    .catch((error) =>
      response.status(400).send("Fail to check if job exists.")
    );

  function createJob(job) {
    const jobId = uuid();
    const newJob = {
      id: jobId,
      title: job.title,
      companyName: job.companyName,
      location: job.location,
      description: job.description,
      employerEmailContact: job.employerEmailContact,
      companyWebsite: job.companyWebsite ? job.companyWebsite : "",
      creator: job.creator,
      postingDate: new Date(),
    };

    JobAccessor.insertJob(newJob)
      .then((jobResponse) => response.status(200).send(jobResponse))
      .catch((error) => response.status(400).send("Fail to create job"));
  }
});

router.get("/getJobsByUser", auth_middleware, (request, response) => {
  const creator = request.username;
  JobAccessor.getJobsByUser(creator)
    .then((jobsResponse) => response.status(200).send(jobsResponse))
    .catch((error) => response.status(400).send(error));
});

// update the job matching the job id
router.put("/updateJob/:id", auth_middleware, (request, response) => {
  const id = request.params.id;
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

  // Check if job existed matching the job id
  JobAccessor.findJobById(id)
    .then((jobResponse) => {
      if (!jobResponse.length) {
        return response.status(404).send("Job post not found.");
      } else {
        return JobAccessor.updateJobDetailsById(id, job)
          .then((jobResponse) =>
            response.status(200).send("Job updated successfully!")
          )
          .catch((error) => response.status(400).send("Fail to update job."));
      }
    })
    .catch((error) =>
      response.status(400).send("Fail to check if job exists.")
    );
});

// Delete job with the job id
router.delete("/delete/:id", auth_middleware, (request, response) => {
  const id = request.params.id;
  console.log("Job id in delete api is: ", id);

  // Check if job existed matching the job id
  JobAccessor.findJobById(id)
    .then((jobResponse) => {
      if (!jobResponse.length) {
        return response.status(404).send("Job post not found. Fail to delete.");
      } else {
        return JobAccessor.deleteJobById(id)
          .then((jobResponse) =>
            response.status(200).send("Job deleted successfully!")
          )
          .catch((error) => response.status(400).send("Fail to delete job."));
      }
    })
    .catch((error) =>
      response.status(400).send("Fail to check if job exists.")
    );
});

// Return about information of Job Board
router.get("/about", (request, response) => {
  response.send("This is an online job board posting.");
});

module.exports = router;
