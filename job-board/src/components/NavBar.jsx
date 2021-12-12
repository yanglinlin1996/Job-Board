import React from 'react';
import Button from '@mui/material/Button';

const NavBar = () => {
    return (
        <div className="navbar">
            <Button variant="contained" className="navbarButton" href="/">Home</Button>
            <Button variant="contained" className="navbarButton" href="/login">Login</Button>
            <Button variant="contained" className="navbarButton" href="/signUp">Sign Up</Button>
        </div>
    )
}

export default NavBar;