import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from '../assets/images/marvel-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
    const [displayNav, setDisplayNav] = useState(false);
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {/* <FontAwesomeIcon icon="fa-magnifying-glass" /> */}
            <input
                className="App-search"
                type="text"
                placeholder="Recherche"
            ></input>
            <FontAwesomeIcon className="menu" icon="bars" onClick={() => setDisplayNav(!displayNav)}/>
            <nav className={displayNav ? "nav-display": "nav-hide"}>
                <ul>
                    <li onClick={() => setDisplayNav(!displayNav)}>
                        <Link to="/">Personnages</Link>
                    </li>
                    <li onClick={() => setDisplayNav(!displayNav)}>
                        <Link to="/comics">Comics</Link>
                    </li>
                    <li onClick={() => setDisplayNav(!displayNav)}>
                        <Link to="/favoris">Favoris</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
