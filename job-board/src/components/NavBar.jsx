import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import '../styles/NavBar.css';
import { STYLE } from '../constants.js'; 

const NavBar = (props) => {
    const { handleLogout, user } = props;

    return (
        user
            ?
        <div class="navbarBox">
            <div class="navbar-1">
                <Button variant="contained" className="navbarButton" style={STYLE} href="/">Home</Button>
                <Button variant="contained" className="navbarButton" style={STYLE} href="/createJob">Create Job</Button>
                <Button variant="contained" className="navbarButton" style={STYLE} href="/favorites">Favorites</Button>
                <Button variant="contained" className="navbarButton" style={STYLE} onClick={ handleLogout } href="/">Log Out</Button>
            </div>
            <div class="user">
                <Avatar className="navbarButton" alt="image" style={STYLE}>{ user }</Avatar>
            </div>
        </div>
            :
        <div class="navbarBox">
            <div class="navbar-2">
            <Button variant="contained" className="navbarButton" style={STYLE} href="/">Home</Button>
            <Button variant="contained" className="navbarButton" style={STYLE} href="/login">Log In</Button>
            <Button variant="contained" className="navbarButton" style={STYLE} href="/signUp">Sign Up</Button>
        </div>
        </div>
        
    )
}

export default NavBar;