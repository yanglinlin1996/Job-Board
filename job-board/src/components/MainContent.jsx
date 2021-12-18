import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import SearchResults from './SearchResults';
import LoginForm from './LoginForm';
import SignUp from './SignUpForm';
import CreateJob from './CreateJob';
import UpdateJob from './UpdateJob';
import Favorites from './Favorites';
import JobDetails from './JobDetails';
import '../styles/MainContent.css';

const MainContent = (props) => {
    const { handleLoggedIn, user } = props;

    return (
        <div class='mainContent'>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/search/:searchWord" element={<SearchResults />} />
                    <Route exact path="/login" element={<LoginForm handleLoggedIn={ handleLoggedIn } />} />
                    <Route exact path="/signUp" element={<SignUp handleLoggedIn={ handleLoggedIn } />} />
                    <Route exact path="/createJob" element={<CreateJob />} />
                    <Route exact path="/updateJob" element={<UpdateJob />} />
                    <Route exact path="/favorites" element={<Favorites />} />
                    <Route exact path="/jobDetails/:jobId/:isFavorite" element={<JobDetails user={user} />}/>
                </Routes>
            </Router>
        </div>
    )
}

export default MainContent;