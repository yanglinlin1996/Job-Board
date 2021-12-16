import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Typography } from '@mui/material';
import ButtonBase from '@material-ui/core/ButtonBase';
import JobDetails from './JobDetails';


const SearchResults = (props) => {
    // const [jobResults, setJobResults] = useState([]);
    const jobResults = props.jobResults;
    console.log("Search job");

    console.log(jobResults);
    
    const jobCardsComponent = [];

    if (jobResults) {
      for (let i = 0; i < jobResults.length; i++) {
        const job = jobResults[i];
        jobCardsComponent.push(
          <Card sx={{ maxWidth: 345 }}>
            <ButtonBase>

            </ButtonBase>
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