import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import SearchResults from './SearchResults';
import '../styles/Home.css';
import {STYLE} from '../constants.js';

const Home = () => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const searchWord = data.get("searchWord");
        if (!searchWord) {
            alert("Search Word cannot be empty!");
            navigate(-2);
        }
        navigate(`/search/${searchWord}`);
    };
    
    return (
        <div class="mainContent">
            <div>
                <h1>Welcome To Job Search Board</h1>
            </div>
            <Box component="form" noValidate className='searchBox' onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <FormControl sx={{ width: '60ch' }}>
                    <TextField 
                        required
                        fullWidth
                        name="searchWord"
                        label="What job are you looking for..." 
                    />
                </FormControl>
                <Button type="submit" variant="contained" style={STYLE}>Search</Button>
            </Box>
            <SearchResults />
        </div>
    )
}

export default Home;