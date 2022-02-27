import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from "js-cookie";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Display = ({ setShowLogin, results, favorites, setFavorites }) => {
    const navigate = useNavigate();

    useEffect(() => {
        
        
    }, [favorites, setShowLogin]);

    const getCategory = (element)=>{
        let category = "character"
        if (element.title) {
            category = 'comic';
        }
        
        return category;
    }
    return (
        <>
            {
                results.map((element, index) => {
                    //console.log(element);
                    const category = getCategory(element);
                    return (
                        <div key={index} className={`element ${category}`}>
                            {element.thumbnail && element.thumbnail.path && <img onClick={ () => {
                                if (category === 'character') {
                                    navigate(`/character/${element._id}`);
                                }
                            }}
                                src={element.thumbnail.path + "." + element.thumbnail.extension}
                                alt={`${category}-${index}`} />}
                            <div>
                                {element.name ? <h2>{element.name}</h2> : element.title && <h2>{element.title}</h2>}
                                <p>{element.description}</p>
                                <FontAwesomeIcon className={(favorites && favorites[element._id]) ? "star-selected" : "star-not-selected"} icon="star"
                                    onClick={async () => {
                                        const copyFavorites = { ...favorites };
                                        const userToken = Cookies.get("userToken");
                                        if (userToken) {
                                            if (copyFavorites[element._id]) {
                                                delete copyFavorites[element._id];
                                                const response = await axios.delete(
                                                    //`http://localhost:3000/favorite/delete/${category}/${element._id}`,
                                                    `https://diakary-marvel.herokuapp.com/favorite/delete/${category}/${element._id}`,
                                                    {
                                                        headers: {
                                                            "Authorization": "Bearer " + Cookies.get("userToken"),
                                                        }
                                                    }
                                                );
                                                setFavorites(copyFavorites);
                                            }
                                            else {
                                                copyFavorites[element._id] = true;
                                                //Cookies.set("favorites", copyFavorites);
                                                const response = await axios.put(
                                                    //`http://localhost:3000/favorite/add/${category}/${element._id}`, {},
                                                    `https://diakary-marvel.herokuapp.com/favorite/add/${category}/${element._id}`, {},
                                                    {
                                                        headers: {
                                                            "Authorization": "Bearer " + Cookies.get("userToken"),
                                                        }
                                                    }
                                                );
                                                setFavorites(copyFavorites);
                                            }

                                            if (Object.keys(copyFavorites).length === 0) {
                                                setFavorites({});
                                            }
                                        }
                                        else {
                                            setShowLogin(true);
                                        }
                                        
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
        </>
    )
}

export default Display
