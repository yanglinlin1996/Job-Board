import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import '../styles/JobDetails.css';




const JobDetails = () => {
    const location = useLocation();
    const job = location.state;
    console.log("In job details page, Job details are: ");
    console.log(job);

    const navigate = useNavigate();
    const jobComponent = 
        job 
            ? 
        <div className='jobContainer'>
            <div>
                <div className='jobDetail'>
                    Job Title: {job.title}
                </div>
                <div className='jobDetail'> 
                    Company Name: {job.companyName}
                </div>
                <div className='jobDetail'>
                    Location: {job.location}
                </div>
                <div className='jobDetail'>
                    Description: {job.description}
                </div>
                <div className='jobDetail'>
                    Employer Email Contact: {job.employerEmailContact}
                </div>
                <div className='jobDetail'>
                    Company Website: {job.companyWebsite ? job.companyWebsite : ""}
                </div>
                <div className='jobDetail'>
                    Posted Date: {job.postingDate}
                </div>
            </div>
            <div className='icons'>
                icons(edit/delete/favorite)
            </div>
        </div>
            :
        <div className='jobDetail'> No Job Found </div>;
    return (
        <div>
            <div>{jobComponent}</div>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
        
    )
}

export default JobDetails;