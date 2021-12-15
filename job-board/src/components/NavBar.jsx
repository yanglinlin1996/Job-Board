import React from 'react';
import Button from '@mui/material/Button';
import { TOKEN_KEY } from '../ constants';

const NavBar = (props) => {
    const { isLoggedIn, handleLogout } = props;
    console.log("current user in navbar: ", localStorage.getItem(TOKEN_KEY));
    console.log("is logged in value is: ", isLoggedIn);

    return (
        isLoggedIn
            ?
        <div className="navbar">
            <Button variant="contained" className="navbarButton" href="/">Home</Button>
            <Button variant="contained" className="navbarButton" href="/createJob">Create Job</Button>
            <Button variant="contained" className="navbarButton" onClick={ handleLogout } >Log Out</Button>
            <Button variant="contained" className="navbarButton" href="/favorites">Favorites</Button>
            <Button variant="contained" className="navbarButton" >{ localStorage.getItem(TOKEN_KEY) }</Button>
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