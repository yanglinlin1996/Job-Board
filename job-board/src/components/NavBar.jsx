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
            <div class="navbar">
                <Button variant="contained" className="navbarButton" style={STYLE} href="/">Home</Button>
                <Button variant="contained" className="navbarButton" style={STYLE} href="/createJob">Create Job</Button>
                <Button variant="contained" className="navbarButton" style={STYLE} href="/favorites">Favorites</Button>
                <Button variant="contained" className="navbarButton" style={STYLE} onClick={ handleLogout } >Log Out</Button>
            </div>
            <div class="user">
                <Avatar className="navbarButton" alt="image" >{ user }</Avatar>
            </div>
        </div>
            :
        <div class="navbar">
            <Button variant="contained" className="navbarButton" style={STYLE} href="/">Home</Button>
            <Button variant="contained" className="navbarButton" style={STYLE} href="/login">Log In</Button>
            <Button variant="contained" className="navbarButton" style={STYLE} href="/signUp">Sign Up</Button>
        </div>
    )
}

export default NavBar;