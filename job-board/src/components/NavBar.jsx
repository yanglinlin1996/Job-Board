import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import '../styles/NavBar.css';

const NavBar = (props) => {
    const { handleLogout, user } = props;

    return (
        user
            ?
        <div class="navbarBox">
            <div class="navbar">
                <Button variant="contained" className="navbarButton" href="/">Home</Button>
                <Button variant="contained" className="navbarButton" href="/createJob">Create Job</Button>
                <Button variant="contained" className="navbarButton" onClick={ handleLogout } >Log Out</Button>
                <Button variant="contained" className="navbarButton" href="/favorites">Favorites</Button>
            </div>
            <div class="user">
                <Avatar className="navbarButton" alt="image" >{ user }</Avatar>
            </div>
        </div>
            :
        <div class="navbar">
            <Button variant="contained" className="navbarButton" href="/">Home</Button>
            <Button variant="contained" className="navbarButton" href="/login">Log In</Button>
            <Button variant="contained" className="navbarButton" href="/signUp">Sign Up</Button>
        </div>
    )
}

export default NavBar;