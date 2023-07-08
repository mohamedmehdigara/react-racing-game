import React from 'react';

const Home = ({ startGame }) => {
  return (
    <div>
      <h1>Welcome to the Racing Game</h1>
      <p>Get ready to compete against opponents in an exciting racing adventure!</p>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default Home;

