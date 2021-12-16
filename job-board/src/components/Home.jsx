import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SearchResults from './SearchResults';

const Home = (props) => {
    const { isLoggedIn } = props;
    const [formInput, setFormInput] = useState('');
    const [jobResults, setJobResults] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setFormInput(data.get("searchWord"));
        console.log(formInput);
      
        // axios.get("http://localhost:8000/api/job/jobSearchByTitle/" + formInput).then(response => {setJobResults(response.data)}).catch(error => console.log(error));
    };
    function findJobs() {
        axios.get("/api/job/jobSearchByTitle/" + formInput).then(response => {setJobResults(response.data)}).catch(error => console.log(error));
    }
    useEffect(findJobs, []);
    console.log("Job Results are: " + jobResults);
    return (
        <div>
            <div className='titleContainer'>
                Welcome To Job Search Board
            </div>
            {/* is there a better search bar? */}
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
            <SearchResults jobResults = {jobResults}></SearchResults>
            <div className='displaySearchResults'>
                Search results show here...
            </div>
        </div>
    )
}

export default Home;