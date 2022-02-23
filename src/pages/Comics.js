import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import Display from '../components/Display';

const Comics = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=1Y1oFBMD61701iAK");
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
        <div className="App-page comics">
            <Display results={data.results} typeName={"comic"} />
        </div>
    );
}

export default Comics
