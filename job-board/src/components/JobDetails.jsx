import React from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { useParams } from 'react-router';


const JobDetails = () => {
    const jobId = useParams().jobId;

    const findJobDetails = () => {
        axios.get('http://localhost:8000/api/job/jobSearch')
    }
    return (
        <div>
            <NavBar />
            <div>Job Details</div>
        </div>
    )
}

export default JobDetails;