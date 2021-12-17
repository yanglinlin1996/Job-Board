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

const MainContent = (props) => {
    const { handleLoggedIn, user } = props;
    console.log("user in main content is: ", user);

    return (
        <div className='mainContent'>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/:searchWord" element={<SearchResults />} />
                    <Route exact path="/login" element={<LoginForm handleLoggedIn={ handleLoggedIn } />} />
                    <Route exact path="/signUp" element={<SignUp />} />
                    <Route exact path="/createJob" element={<CreateJob />} />
                    <Route exact path="/updateJob/:jobId" element={<UpdateJob />} />
                    <Route exact path="/favorites" element={<Favorites />} />
                    <Route exact path="/jobDetails/:jobId" element={<JobDetails user={user} />}/>
                    <Route render={() => <h1>Page not found!</h1>} />
                </Routes>
            </Router>
            
        </div>
    )
}

export default MainContent;