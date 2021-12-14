import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import SearchResults from './SearchResults';

const Home = (props) => {
    const { isLoggedIn } = props;
    const [formInput, setFormInput] = useState('');
    //const [job, setJob] = useState({title: ""});
    const [errorMessage, setErrorMessage] = useState(null);

    function onSearchButtonClick() {
        if (!formInput) {
            setErrorMessage("You must type in a Job title you are looking for.");
            return;
        }
        // Find Job with requesting job title
        // axios.get('/api/job/jobSearchByTitle/' + formInput).then(response => setJob(response.data)).catch(error => setJob({title: "No Job found"}));
    }
    return (
        <div>
            <div className='titleContainer'>
                Welcome To Job Search Board
            </div>
            {/* is there a better search bar? */}
            <div className='searchBox'>
                <FormControl sx={{ width: '50ch' }}>
                    <TextField 
                        label="What job are you looking for..." 
                        value={formInput} 
                        onChange={(e) => {
                            setFormInput(e.target.value)
                        }}
                    />
                </FormControl>
                <Button variant="contained" onClick = {onSearchButtonClick}>Search</Button>
                <SearchResults searchJobTitle = {formInput}></SearchResults>
            </div>
            <div className='displaySearchResults'>
                Search results show here...
            </div>
        </div>
    )
}

export default Home;