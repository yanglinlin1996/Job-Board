import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';


const SearchResults = (props) => {
    // const [jobResults, setJobResults] = useState([]);
    const jobResults = props.jobResults;
    console.log("Search job");

    console.log(jobResults);
    
    const jobCardsComponent = [];

    // const onCardClick = () => {
    //   this.props.history.push("/jobDetails", {
    //     job: job
    //   })
    // }

    if (jobResults) {
      for (let i = 0; i < jobResults.length; i++) {
        const job = jobResults[i];
        jobCardsComponent.push(
          <Link to="/jobDetails" state={job}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader 
              title={job.title}
              subheader={job.postingDate}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {job.companyName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.location}
              </Typography>
            </CardContent>
          </Card>
          </Link>
        )
      }
    }
    
    
    return (
        <div>
            <div>Search Results</div>
            <div>{jobCardsComponent}</div>
        </div>
    )
}

export default SearchResults;