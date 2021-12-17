import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

const SearchResults = (props) => {
    const { jobResults } = props;

    console.log("Search job results are: ", jobResults);
    
    const jobCardsComponent = [];

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
      <div>{jobCardsComponent}</div>
    )
}

export default SearchResults;