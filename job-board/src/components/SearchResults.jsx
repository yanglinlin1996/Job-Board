import React, { useState } from 'react';
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


const SearchResults = (props) => {
    const formInput = props.searchJobTitle;
    const [job, setJob] = useState({
      id: "",
      title: "",
      companyName: "",
      location: "",
      description: "",
      employerEmailContact: "",
      companyWebsite: "",
      creator: "",
      postingDate: null,
    });

    // Find Job with requesting job title
    if (formInput) {
      console.log("Search job");
      axios.get('/api/job/jobSearchByTitle/' + formInput).then(response => setJob(response[0])).catch(error => setJob({title: "No Job found"}));
    }
    
    return (
        <div>
            <div>Search Results</div>
            <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  J
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                </IconButton>
              }
              title={job.title}
              subheader={job.postingDate}
            />
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon onClick = {() => {
                  axios.get('/api/user/addFavoriteJob/' + formInput).then(response => console.log(response)).catch(error => console.log("Fail to add job to your favorites"));
                }}/>
              </IconButton>
            </CardActions>
          </Card>
        </div>
    )
}

export default SearchResults;