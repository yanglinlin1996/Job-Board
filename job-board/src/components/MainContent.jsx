import React from 'react';
import Home from './Home';
import LoginForm from './LoginForm';
import SignUp from './SignUpForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const MainContent = () => {

    return (
        <div className='mainContent'>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signUp" element={<SignUp />} />
                </Routes>
            </Router>
            
        </div>
    )
}

export default MainContent;