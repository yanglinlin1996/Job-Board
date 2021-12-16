import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import LoginForm from './LoginForm';
import SignUp from './SignUpForm';
import CreateJob from './CreateJob';
import Favorites from './Favorites';
import JobDetails from './JobDetails';

const MainContent = (props) => {
    const { isLoggedIn, handleLoggedIn } = props;

    return (
        <div className='mainContent'>
            <Router>
                <Routes>
                    <Route path="/" element={<Home isLoggedIn={ isLoggedIn } />} />
                    <Route path="/login" element={<LoginForm handleLoggedIn={ handleLoggedIn } />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/createJob" element={<CreateJob />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/jobDetails" element={<JobDetails />}/>
                </Routes>
            </Router>
            
        </div>
    )
}

export default MainContent;