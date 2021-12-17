import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

const SearchResults = () => {
    //const { jobResults } = props;
    const { searchWord } = useParams();
    const [jobResults, setJobResults] = useState([]);
    
    function findSearchResults() {
      if (searchWord) {
        axios.get(`/api/job/jobSearchByTitle/${searchWord}` ).then(response => {setJobResults(response.data)}).catch(error => console.log(error));
      }
    }

    useEffect(findSearchResults, [searchWord]);
    
    console.log("Search job results are: ", jobResults);
    
    const jobCardsComponent = [];      

    if (jobResults) {
      for (let i = 0; i < jobResults.length; i++) {
        const job = jobResults[i];
        jobCardsComponent.push(
          <Link to={`/jobDetails/${job.id}`}>
          {/* onClick={navigate(`/jobDetails/${job.id}`)} */}
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