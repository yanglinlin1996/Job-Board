import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import LoginForm from './LoginForm';
import SignUp from './SignUpForm';
import CreateJob from './CreateJob';
import UpdateJob from './UpdateJob';
import Favorites from './Favorites';
import JobDetails from './JobDetails';

const MainContent = (props) => {
    const { handleLoggedIn, user } = props;
    console.log("user in main content is: ", user);

    return (
        <div className='mainContent'>
            <Router>
                <Routes>
                    <Route path="/" element={<Home user={user} />} />
                    <Route path="/login" element={<LoginForm handleLoggedIn={ handleLoggedIn } />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/createJob" element={<CreateJob />} />
                    <Route path="/updateJob" element={<UpdateJob />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/jobDetails" element={<JobDetails />}/>
                </Routes>
            </Router>
            
        </div>
    )
}

export default MainContent;