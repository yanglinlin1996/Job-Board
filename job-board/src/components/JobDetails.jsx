import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';


const JobDetails = () => {
    const jobId = useParams().jobId;

    const findJobDetails = () => {
        axios.get('/api/job/jobSearch?id=' + jobId).then((response) => setJob(response[0])).catch((error) => console.log("Could not find Job."))
    }

    const [job, setJob] = useState(null);
    useEffect(findJobDetails, []);

    const jobComponent = job ? 
        (<div><div>
            Job Title: {job.title}
        </div>
        <div>
            Company Name: {job.companyName}
        </div>
        <div>
            Location: {job.location}
        </div>
        <div>
            Description: {job.description}
        </div>
        <div>
            Employer Email Contact: {job.employerEmailContact}
        </div>
        <div>
            Company Website: {job.companyWebsite ? job.companyWebsite : ""}
        </div>
        <div>
            Posted Date: {job.postingDate}
        </div>
        </div>) :
        (<div> No Job Found </div>);

    return (
        {jobComponent}
    )
}

export default JobDetails;