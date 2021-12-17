import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavoritesResults from './FavoritesResults';

const Favorites = () => {
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