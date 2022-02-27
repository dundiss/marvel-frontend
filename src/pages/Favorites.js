import React from 'react'
import { useState, useEffect } from "react";
import Display from '../components/Display';
import Cookies from "js-cookie";
import axios from 'axios';

const Favorites = ({ favorites, setFavorites, setShowLogin}) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const userToken = Cookies.get("userToken");
            if (userToken) {
                //console.log("userToken found");
                try {
                    //const response = await axios.get("http://localhost:3000/favorites",
                    const response = await axios.get("https://diakary-marvel.herokuapp.com/favorites",
                        {
                            headers: {
                                "Authorization": "Bearer " + userToken,
                            }
                        });
                    //console.log(response.data);
                    if (response.data) {
                        setData(response.data);
                    }
                    
                    setIsLoading(false);
                } catch (error) {
                    console.log(error.response);
                }
            }
            else {
                setShowLogin(true);
            }
        };
        fetchData();
    }, [favorites]);

    return isLoading ? (
        <span>En cours de chargement...</span>
    ) : (
        <div className="App-page favorites">
                {data.results && <Display results={data.results} favorites={favorites} setFavorites={setFavorites} />}
                {(data.count === 0) && <p style={{ color: "white" }}>Il n'y aucun favori enregistré pour cet utilisateur !</p>}
        </div>
    );
}

export default Favorites
