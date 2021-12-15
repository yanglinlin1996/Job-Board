import React, { useState } from 'react';
import NavBar from './NavBar';
import MainContent from './MainContent';
import { TOKEN_KEY } from '../ constants';

const App = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    
    const loggedIn = token => {
        if (token) {
            setIsLoggedIn(true);
            localStorage.setItem(TOKEN_KEY, token);
            console.log("User is logged in successfully!");
        }
    }

    const logout = () => {
        console.log("user logged out!");
        setIsLoggedIn(false);
        localStorage.removeItem(TOKEN_KEY);
    }

    return (
        <div>
            <NavBar isLoggedIn={ isLoggedIn } handleLogout={ logout }/>
            <MainContent isLoggedIn={ isLoggedIn } handleLoggedIn={ loggedIn }/>
        </div>
    );
}

export default App;