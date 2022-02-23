import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";

const Characters = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=1Y1oFBMD61701iAK");
                console.log(response.data);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, []);

    return isLoading ? (
        <span>En cours de chargement...</span>
    ) : (
            <div className="App-page characters">
            {
                data.results.map((character, index) => {
                console.log(character);
                return (
                    <div key={index} className="character">
                        <img src={character.thumbnail.path + "." + character.thumbnail.extension} alt={`character-${index}`}/>
                        <div>
                            <h2>{character.name}</h2>
                            <p>{character.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Characters
