import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import Results from './components/Results';
import "./App.css"

const App = () => {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/game" element={<Game/>} />
      <Route path="/results" element={<Results/>} />

      </Routes>
    </Router>
  );
};

export default App;
