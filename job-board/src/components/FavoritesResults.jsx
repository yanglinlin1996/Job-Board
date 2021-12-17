import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import '../styles/ResultCards.css';

const Favorites = (props) => {
    const favorites = props.favoriteJobs;
    let favoriteJobs = [];

    if (favorites) {
        for (let i = 0; i < favorites.length; i++) {
            const job = favorites[i];
            if (job) {
                favoriteJobs.push(
                    <Link to={`/jobDetails/${job.id}`}>
                        <Card sx={{ maxWidth: 345 }} className="card">
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
    }

    return (
        <div>{favoriteJobs}</div>
    )
}

export default Favorites;