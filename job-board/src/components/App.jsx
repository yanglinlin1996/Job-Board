import React, { useState } from 'react';
import NavBar from './NavBar';
import MainContent from './MainContent';
import { TOKEN_KEY } from '../ constants';

const App = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(localStorage.getItem(TOKEN_KEY) ? true : false);
    
    const loggedIn = token => {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
            setIsLoggedIn(true);
            console.log("User is logged in successfully!");
        }
    }

    const logout = () => {
        console.log("user logged out!");
        localStorage.removeItem(TOKEN_KEY);
        setIsLoggedIn(false);
    }

    return (
        <div>
            <NavBar isLoggedIn={ isLoggedIn } handleLogout={ logout }/>
            <MainContent isLoggedIn={ isLoggedIn } handleLoggedIn={ loggedIn }/>
        </div>
    );
}

export default App;