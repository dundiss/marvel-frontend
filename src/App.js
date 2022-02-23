import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Characters from "./pages/Characters"
import Comics from "./pages/Comics"

// import FontAwesone
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faBars, faStar } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass, faBars, faStar);


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
