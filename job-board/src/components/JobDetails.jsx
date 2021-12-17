import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../styles/JobDetails.css';

const JobDetails = (props) => {

    // const location = useLocation();
    // const job = location.state;
    const user = props;
    const { jobId } = useParams();
    console.log("jobId: " + jobId);
    function findJobDetails() {
        if (jobId) {
            console.log(jobId);
            axios.get(`/api/job/jobSearch/${jobId}`).then((response) => setJob(response.data[0])).catch((error) => console.log(error));
        }
    }

    const [job, setJob] = useState({});
    useEffect(findJobDetails, [jobId]);
    

    console.log(job);
    const navigate = useNavigate();

    const handleDeleteOnClick = () => {
        console.log("You clicked delete icon!");

        const opt = {
            method: "DELETE",
            url: "/api/job/delete",
            params: {
                id: jobId
            },
            headers: { "content-type": "application/json" },
        };

        axios(opt)
            .then(response => { 
                if (response.status === 200) {
                    console.log("Successfully deleted the job: ", response);
                }
            })
            .catch(error => console.log("Delete job failed: ", error.message));
    }

    const handleFavoriteOnClick = () => {
        console.log("You clicked favorite icon!");

        const opt = {
            method: "PUT",
            url: "/api/user/addFavoriteJob",
            params: {
                id: jobId
            },
            headers: { "content-type": "application/json" },
        };

        axios(opt)
            .then(response => { 
                if (response.status === 200) {
                    console.log("Successfully add to favorite: ", response);
                }
            })
            .catch(error => console.log("Add to favorite failed: ", error.message));
    }

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
                {
                    user === job.creator 
                        ?
                    <div>
                        <Link to="/updateJob" state={job}><EditIcon/></Link>
                        <DeleteIcon onClick={handleDeleteOnClick}/>
                    </div>
                        :
                    null
                }
                <FavoriteIcon onClick={handleFavoriteOnClick}/>
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