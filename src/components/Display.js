import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from "js-cookie";
import { useState } from 'react';
const Display = ({ results, typeName }) => {
    const [favorites, setFavorites] = useState(Cookies.get("favorites") || null);

    return (
        <>
            {
                results.map((element, index) => {
                    //console.log(element);
                    return (
                        <div key={index} className={`element ${typeName}`}>
                            <img src={element.thumbnail.path + "." + element.thumbnail.extension} alt={`${typeName}-${index}`} />
                            <div>
                                {element.name ? <h2>{element.name}</h2> : element.title && <h2>{element.title}</h2>}
                                <p>{element.description}</p>
                                <FontAwesomeIcon className={(favorites && favorites[element._id]) ? "star-selected" : "star-not-selected"} icon="star"
                                    onClick={() => {
                                        const copyFavorites = { ...favorites };
                                        if (copyFavorites[element._id]) {
                                            delete copyFavorites[element._id];
                                        }
                                        else {
                                            copyFavorites[element._id] = true;
                                        }

                                        if (Object.keys(copyFavorites).length === 0) {
                                            Cookies.remove("favorites");
                                            setFavorites(null);
                                        }
                                        else {
                                            Cookies.set("favorites", copyFavorites);
                                            setFavorites(copyFavorites);
                                        }

                                        console.log(Cookies.get("favorites"));
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
