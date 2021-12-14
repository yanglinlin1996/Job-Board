import React from 'react';
import Home from './Home';
import LoginForm from './LoginForm';
import SignUp from './SignUpForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const MainContent = (props) => {
    const { isLoggedIn, handleLoggedIn } = props;

    return (
        <div className='mainContent'>
            <Router>
                <Routes>
                    <Route path="/" element={<Home isLoggedIn={ isLoggedIn } />} />
                    <Route path="/login" element={<LoginForm handleLoggedIn={ handleLoggedIn } />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/logout" element={<Home isLoggedIn={ isLoggedIn } />} />
                </Routes>
            </Router>
            
        </div>
    )
}

export default MainContent;