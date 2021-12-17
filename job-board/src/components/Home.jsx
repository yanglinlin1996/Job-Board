import React, { useState, useEffects } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import SearchResults from './SearchResults';
import '../styles/Home.css';

const Home = () => {
    const [jobResults, setJobResults] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        navigate(`/search/${data.get("searchWord")}`);
        // axios.get("/api/job/jobSearchByTitle/" + data.get("searchWord")).then(response => {setJobResults(response.data)}).catch(error => console.log(error));
    };
    
    return (
        <div class="mainContent">
            <div class='titleContainer'>
                <h1>Welcome To Job Search Board</h1>
            </div>
            <Box component="form" noValidate className='searchBox' onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <FormControl sx={{ width: '50ch' }}>
                    <TextField 
                        required
                        fullWidth
                        name="searchWord"
                        label="What job are you looking for..." 
                    />
                </FormControl>
                <Button type="submit" variant="contained">Search</Button>
            </Box>
            <SearchResults />
            {/* {displaySearchResults()} */}
        </div>
    )
}

export default Home;