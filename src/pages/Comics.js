import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import Display from '../components/Display';

const Comics = ({setShowLogin, favorites, setFavorites}) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [page, SetPage] = useState(1);
    const limit = 100;

    const handlePreviousPage = () => {
        if (page > 1) {
            console.log("handlePreviousPage");
            SetPage(page - 1);
        }
    }

    const handleNextPage = () => {
        if (data && data.count) {
            console.log("NextPage");
            if (data.count > (100 * page)) {
                SetPage(page + 1);
            }
        }
        else {
            console.log("NextPagee-else");
            SetPage(1);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const skip = ((page - 1) * limit);

                const response = await axios.get(
                    //"http://localhost:3000/comics",
                    "https://diakary-marvel.herokuapp.com/comics",
                    {
                        params: { limit: limit, skip: skip }
                    });
                console.log(response.data);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, [page]);

    const handleSearch = async (event) => {
        try {
            const text = event.target.value;
            setSearchText(text);
            const skip = ((page - 1) * limit);
            
            const response = await axios.get(
                //"http://localhost:3000/comics",
                "https://diakary-marvel.herokuapp.com/comics",
                {
                    params: { title: text, limit: limit, skip: skip }
                });
            
            console.log(response.data);
            if (response.data) {
                setData(response.data);
            }

        } catch (error) {
            console.log(error.response);
        }
    }

    return isLoading ? (
        <span>En cours de chargement...</span>
    ) : (
        <div className="App-page comics">
            {data.results &&
            <>
                <input onChange={handleSearch} className="search-comics" type="text" value={searchText} placeholder="Recherche de comics par titre"></input>
                    {data.results && <Display setShowLogin={setShowLogin} results={data.results} favorites={favorites} setFavorites={setFavorites} />}
                    <div className="pagination">
                        {(page > 1) && <button onClick={handlePreviousPage}>Précédent</button>}
                        {data && (data.count > (page * 100)) && <button onClick={handleNextPage}>Suivant</button>}
                    </div>
            </>}
                
        </div>
    );
}

export default Comics
