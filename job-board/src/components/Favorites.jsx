import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import FavoritesResults from './FavoritesResults';

const Favorites = (props) => {
    // const { isLoggedIn } = props;
    // const [favorites, setFavorites] = useState([]);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
      
    //     const username = "wsz";
    //     axios.get("/api/user/getFavoriteJobsByUser/" + username).then(response => {setFavorites(response.data)}).catch(error => console.log(error));
    //     console.log(favorites);
    // };
    
    // return (
    //     <div>
    //         <div className='titleContainer'>
    //             Your Favorite Job List:
    //         </div>
    //         <Button type="submit" variant="contained" onClick={handleSubmit}>Lookup</Button>
    //         <div className='displaySearchResults'>
    //             Favorites show here...
    //         </div>
    //         <FavoritesResults favoriteJobs={favorites}></FavoritesResults>
            
    //     </div>
    // )
    const { isLoggedIn } = props;
    const [favorites, setFavorites] = useState([]);

    const findAllFavorites = () => {
        const username = "wsz";
        axios.get("/api/user/getFavoriteJobsByUser").then(response => {setFavorites(response.data)}).catch(error => console.log(error));
        console.log(favorites);
    };
    
    useEffect(findAllFavorites, []);

    return (
        <div>
            <div className='titleContainer'>
                Your Favorite Job List:
            </div>
            <FavoritesResults favoriteJobs={favorites}></FavoritesResults>
            
        </div>
    )
}

export default Favorites;