import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavoritesResults from './FavoritesResults';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    const findAllFavorites = () => {
        axios.get("/api/user/getFavoriteJobsByUser").then(response => {setFavorites(response.data)}).catch(error => console.log(error));
        console.log(favorites);
    };
    
    useEffect(findAllFavorites, []);

    return (
        <div class="content">
            <div className='titleContainer'>
                <h3>Your Favorite Job List:</h3>
            </div>
            <FavoritesResults favoriteJobs={favorites}></FavoritesResults>
            
        </div>
    )
}

export default Favorites;