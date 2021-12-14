import React, { useState } from 'react';
import NavBar from './NavBar';
import MainContent from './MainContent';

const App = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ currentUser, setCurrentUser ] = useState('');
    
    const loggedIn = user => {
        if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
            console.log(user, "is logged in successfully!");
        }
    }

    const logout = () => {
        console.log("user logged out!");
        setIsLoggedIn(false);
        setCurrentUser('');
    }

    return (
        <div>
            <NavBar currentUser={ currentUser } handleLogout={ logout }/>
            <MainContent isLoggedIn={ isLoggedIn } handleLoggedIn={ loggedIn }/>
        </div>
    );
}

export default App;