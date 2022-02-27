import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from '../assets/images/marvel-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from "js-cookie";
import Signup from '../pages/Sigup';
import Login from '../pages/Login';
import { useNavigate } from "react-router-dom";

const Header = ({showLogin, setShowLogin}) => {
    const [displayNav, setDisplayNav] = useState(false);
    const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
    const [showSignup, setShowSignup] = useState(false);    
    const [nextPage, setNextPage] = useState({});
    const navigate = useNavigate();

    const handleOnClickLogin = () => {
        if (showSignup) {
            setShowSignup(false);
        }

        if (userToken === null) {
            //console.log("not connected");
            setShowLogin(true);
        }
        else {
            //console.log("connected");
            setUserToken(null);
            setShowLogin(false);
            Cookies.remove("userToken");
            Cookies.remove("userId");
            navigate("/");
        }
    }

    const handleOnClickSignup = () => {
        if (showLogin) {
            setShowLogin(false);
        }
        setShowSignup(true);
    }
    return (
        <>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="bars-buttons">
                    <FontAwesomeIcon className="menu" icon="bars" onClick={() => setDisplayNav(!displayNav)} />
                    <nav className={displayNav ? "nav-display" : "nav-hide"}>

                        <ul>
                            <li onClick={() => setDisplayNav(!displayNav)}>
                                <Link className="menu-btn" to="/">Personnages</Link>
                            </li>
                            <li onClick={() => setDisplayNav(!displayNav)}>
                                <Link className="menu-btn" to="/comics">Comics</Link>
                            </li>
                            <li onClick={() => setDisplayNav(!displayNav)}>
                                <Link className="menu-btn" to="/favorites">Favoris</Link>
                            </li>
                            {(userToken !== null) ?
                                <li onClick={handleOnClickLogin} className="toDisconnect">
                                    <Link className="menu-btn" to="">Se déconnecter</Link>
                                </li>
                                :
                                <>
                                    <li onClick={handleOnClickLogin} className="toDisconnect">
                                        <Link className="menu-btn" to="#">Se connecter</Link>
                                    </li>
                                    <li onClick={handleOnClickSignup}>
                                        <Link className="menu-btn" to="#">S'inscrire</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </nav>
                </div>
                     
            </header>
            
            {!userToken && showLogin &&
            <Login
                setUserToken={setUserToken}
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                setShowSignup={setShowSignup}
                nextPage={nextPage}
                setNextPage={setNextPage}>
            </Login>}
            {!userToken && showSignup && <Signup
                setUserToken={setUserToken}
                showSignup={showSignup}
                setShowSignup={setShowSignup}
                setShowLogin={setShowLogin}
                nextPage={nextPage}
                setNextPage={setNextPage}>
            </Signup>}
        </>
    )
}

export default Header
