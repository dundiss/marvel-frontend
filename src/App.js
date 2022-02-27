import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Characters from "./pages/Characters"
import Character from "./pages/Character"
import Comics from "./pages/Comics"
import { useState } from 'react';
// import FontAwesone
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faBars, faStar } from '@fortawesome/free-solid-svg-icons';
import Favorites from './pages/Favorites';
library.add(faMagnifyingGlass, faBars, faStar);


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [favorites, setFavorites] = useState({});
  
  return (
    <div className="App">
      <Router>
        <Header showLogin={showLogin} setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Characters setShowLogin={setShowLogin} favorites={favorites} setFavorites={setFavorites}/>} />
          <Route path="/comics" element={<Comics setShowLogin={setShowLogin} favorites={favorites} setFavorites={setFavorites}/>} />
          <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites} setShowLogin={setShowLogin}/>} />
          <Route path="/character/:id" element={<Character Favorites favorites={favorites} setFavorites={setFavorites} setShowLogin={setShowLogin}/>} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
