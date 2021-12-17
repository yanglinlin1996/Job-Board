import React, { useState } from 'react';
import NavBar from './NavBar';
import MainContent from './MainContent';
import { TOKEN_KEY } from '../ constants';
import { useNavigate } from 'react-router';

const App = () => {
    const curToken = localStorage.getItem(TOKEN_KEY);

    const [ user, setUser ] = useState(curToken? curToken : "");
    
    const loggedIn = token => {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
            setUser(token);
            console.log("User is logged in successfully!");
        }
    }
    //const navigate = useNavigate();
    const logout = () => {
        console.log("user logged out!");
        localStorage.removeItem(TOKEN_KEY);
        setUser('');
        //navigate('/');
    }

    return (
        <div>
            <NavBar handleLogout={ logout } user={ user }/>
            <MainContent handleLoggedIn={ loggedIn } user={ user }/>
        </div>
    );
}

export default App;