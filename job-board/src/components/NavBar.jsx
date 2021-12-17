import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TOKEN_KEY } from '../ constants';

const NavBar = (props) => {
    const { handleLogout, user } = props;

    return (
        user
            ?
        <div className="navbar">
            <Button variant="contained" className="navbarButton" href="/">Home</Button>
            <Button variant="contained" className="navbarButton" href="/createJob">Create Job</Button>
            <Button variant="contained" className="navbarButton" onClick={ handleLogout } >Log Out</Button>
            <Button variant="contained" className="navbarButton" href="/favorites">Favorites</Button>
            <Button variant="contained" className="navbarButton" >{ user }</Button>
        </div>
            :
        <div className="navbar">
            <Button variant="contained" className="navbarButton" href="/">Home</Button>
            <Button variant="contained" className="navbarButton" href="/login">Log In</Button>
            <Button variant="contained" className="navbarButton" href="/signUp">Sign Up</Button>
        </div>
    )
}

export default NavBar;