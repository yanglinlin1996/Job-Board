import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import {useNavigate} from "react-router-dom";




const JobDetails = () => {
    const location = useLocation();
    const job = location.state;
    console.log("In job details page, Job details are: ");
    console.log(job);

    const navigate = useNavigate();
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
        <div>
            <div>{jobComponent}</div>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
        
    )
}

export default JobDetails;