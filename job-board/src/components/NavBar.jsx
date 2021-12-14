import React from 'react';
import Button from '@mui/material/Button';

const NavBar = (props) => {
    const { currentUser, handleLogout } = props;
    console.log("current user in navbar: ", currentUser);

    return (
        currentUser
            ?
        <div className="navbar">
            <Button variant="contained" className="navbarButton" href="/">Home</Button>
            <Button variant="contained" className="navbarButton" href="/login">Create Job</Button>
            <Button variant="contained" className="navbarButton" href="/logout">Log Out</Button>
            <Button variant="contained" className="navbarButton" href="/favorites">Favorites</Button>
            <Button variant="contained" className="navbarButton" >{ currentUser }</Button>
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