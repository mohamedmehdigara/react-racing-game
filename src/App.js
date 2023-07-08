import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import Results from './components/Results';

const App = () => {
  const [results, setResults] = useState([]);

  const startGame = () => {
    // Add any initialization or API calls to start the game and update results if needed
    setResults([]);
  };

  const updateResults = (newResult) => {
    setResults((prevResults) => [...prevResults, newResult]);
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
          
        
        <Route path="/game" element={<Game updateResults={updateResults} />}/>
          
        
        <Route path="/results" element={<Results results={results} />}/>
          
        
      </Routes>
    </Router>
  );
};

export default App;
