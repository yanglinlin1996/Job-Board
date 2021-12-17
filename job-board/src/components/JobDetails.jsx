import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../styles/JobDetails.css';

const JobDetails = (props) => {
    const { user } = props;
    const { jobId } = useParams();
    console.log("jobId: " + jobId);
    function findJobDetails() {
        if (jobId) {
            console.log(jobId);
            axios.get(`/api/job/jobSearch/${jobId}`).then((response) => setJob(response.data[0])).catch((error) => console.log(error));
        }
    }

    const [job, setJob] = useState({});
    const [favColor, setFavColor] = useState("grey");
    useEffect(findJobDetails, [jobId, favColor]);
    
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
                    navigate(-1);
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
                    setFavColor("red");
                }
            })
            .catch(error => console.log("Add to favorite failed: ", error.message));
    }

    const jobComponent = 
        job 
            ? 
        <div className='jobContainer'>
            <div className="titleBox">
                <h2 className="jobDetail">Job details</h2>
                <div className="favIcon" style={{color: favColor}}><FavoriteIcon onClick={handleFavoriteOnClick}/></div>
            </div>
            
            <div>
                <div className='jobDetail'>
                    <h3>{job.title}</h3>
                    Posted Date: {new Date(job.postingDate).toDateString()}
                </div>
                <div className='jobDetail'> 
                    <h4>{job.companyName}</h4>
                    {job.location}
                </div>
                {/* <div className='jobDetail'>
                    Location: {job.location}
                    <h5>{job.location}</h5>
                </div> */}
                <div className='jobDetail'>
                    <h4>Description: </h4>
                    {job.description}
                </div>
                <div className='jobDetail'>
                    <h4>Employer Email Contact: </h4>
                    {job.employerEmailContact}
                    <h4 href={job.companyWebsite ? job.companyWebsite : ""}>{job.companyWebsite ? job.companyWebsite : ""}</h4>
                </div>
                <div className='iconBox'>
                    <div className='otherIcons'>
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
                    </div>
                </div>
                {/* <div className='jobDetail'>
                    <h4 href={job.companyWebsite ? job.companyWebsite : ""}>{job.companyWebsite ? job.companyWebsite : ""}</h4>
                </div> */}
                {/* <div className='jobDetail'>
                    Posted Date: {new Date(job.postingDate).toDateString()}
                </div> */}
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