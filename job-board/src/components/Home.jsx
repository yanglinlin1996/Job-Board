import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import NavBar from './NavBar';

const Home = () => {
    return (
        <div>
            <NavBar />
            <div className='titleContainer'>
                Welcome To Job Search Board
            </div>
            {/* is there a better search bar? */}
            <div className='searchBox'>
                <FormControl sx={{ width: '50ch' }}>
                    <TextField label="What job are you looking for..." />
                </FormControl>
                <Button variant="contained">Search</Button>
            </div>
            <div className='displaySearchResults'>
                Search results show here...
            </div>
        </div>
    )
}

export default Home;