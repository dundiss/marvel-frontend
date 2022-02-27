import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import Display from '../components/Display';
import { useParams } from 'react-router';

const Character = ({ setShowLogin, favorites, setFavorites }) => {
    const [data, setData] = useState([]);
    const [comics, setComics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                //const response = await axios.get(`http://localhost:3000/character/${id}`);
                const response = await axios.get(`https://diakary-marvel.herokuapp.com/character/${id}`);
                console.log(response.data);
                const copyData = [...data];
                copyData.push(response.data);
                setData(copyData);
                if (response.data.comics) {
                    //console.log("has comics");
                    const copyComics = [...comics];
                    for await (const comicId of response.data.comics) {
                        //const comicInfo = await axios.get(`http://localhost:3000/comic/${comicId}`);
                        const comicInfo = await axios.get(`https://diakary-marvel.herokuapp.com/comic/${comicId}`);
                        console.log(comicInfo.data);
                        copyComics.push(comicInfo.data);
                        
                    }

                    setComics(copyComics);
                }
                
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
        <div className="App-page character-info">
            {data && <Display results={data} favorites={favorites} setFavorites={setFavorites} />}
            <div className="character-comics">
                {comics && <Display setShowLogin={setShowLogin} results={comics} favorites={favorites} setFavorites={setFavorites} />}
            </div>
                
        </div>
    );
}

export default Character
