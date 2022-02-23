import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import Display from '../components/Display';

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
                <Display results={data.results} typeName={"character"}/>
        </div>
    );
}

export default Characters
