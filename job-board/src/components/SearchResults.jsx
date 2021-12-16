import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';


const SearchResults = (props) => {
    //const formInput = props.searchJobTitle;
    //console.log("Form input is: " + formInput);
    //const [jobResults, setJobResults] = useState([]);
    const jobResults = props.jobResults;

    // Find Job with requesting job title
    console.log("Search job");

    // const fetchData = async () => {
    //     const response = await axios.get("/api/job/jobSearchByTitle/" + formInput);
    //     return response;
    // }
    // useEffect(() => {
    //   fetchData().then(response => setJobResults(response.data));
    // }, []);

    // function findJobs() {
    //   axios.get("/api/job/jobSearchByTitle/" + formInput).then(response => {setJobResults(response.data)}).catch(error => console.log(error));
    // }

    // useEffect(findJobs, []);

    console.log(jobResults);

    const ExpandMore = styled((props) => {
      const { expand, ...other } = props;
      return <IconButton {...other} />;
    })(({ theme, expand }) => ({
      transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    }));
    
    const jobCardsComponent = [];
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    if (jobResults) {
      for (let i = 0; i < jobResults.length; i++) {
        const job = jobResults[i];
        setExpanded(false);
        jobCardsComponent.push(
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              title={job.title}
              subheader={job.postingDate}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {job.companyName}
                {job.location}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                {/* <FavoriteIcon onClick = {() => {
                  axios.put('/api/user/addFavoriteJob/' + {params: {title: job.title, id: job.id}}).then(response => console.log("Job Added to Favorites successfully!")).catch(error => console.log("Fail to add job to your favorites"));
                }}/> */}
                <FavoriteIcon/>
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
              <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Job details: {job.description}</Typography>
                <Typography paragraph>Employer Email Contact: {job.employerEmailContact}</Typography>
                <Typography paragraph>{job.companyWebsite ? `Company Website: ${job.companyWebsite}` : ""}</Typography>
              </CardContent>
            </Collapse>
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