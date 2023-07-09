import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Racing Game</h1>
      <p>Get ready to compete against opponents in an exciting racing adventure!</p>
      <Link to="/game">
        <button>Start Game</button>
      </Link>
    </div>
  );
};

export default Home;
