import React, { useState, useEffect } from 'react';
import RacingTrack from '../scenes/RacingTrack';

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [opponentPositions, setOpponentPositions] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const trackWidth = 400; // Width of the racing track
  const playerSpeed = 5; // Speed of the player
  const opponentSpeed = 4; // Speed of the opponents

  // Function to handle keyboard events
  const handleKeyDown = (event) => {
    if (event.code === 'ArrowLeft') {
      // Move player to the left
      movePlayer(-playerSpeed);
    } else if (event.code === 'ArrowRight') {
      // Move player to the right
      movePlayer(playerSpeed);
    }
  };

  // Function to move the player
  const movePlayer = (delta) => {
    setPlayerPosition((prevPosition) => {
      let newPosition = prevPosition + delta;
      // Ensure player stays within the track boundaries
      newPosition = Math.max(0, Math.min(newPosition, trackWidth));
      return newPosition;
    });
  };

  // Function to move the opponents
  const moveOpponents = () => {
    setOpponentPositions((prevPositions) => {
      const newPositions = prevPositions.map((position) => position + opponentSpeed);
      return newPositions;
    });
  };

  useEffect(() => {
    // Event listener for keyboard events
    window.addEventListener('keydown', handleKeyDown);

    // Game loop to move opponents
    const gameLoop = setInterval(() => {
      if (!gameOver) {
        moveOpponents();
      }
    }, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(gameLoop);
    };
  }, [gameOver]);

  // Check collision between player and opponents
  useEffect(() => {
    const checkCollision = () => {
      const playerRect = document.getElementById('player').getBoundingClientRect();
      const opponentRects = Array.from(document.getElementsByClassName('opponent'));

      opponentRects.forEach((opponentRect) => {
        const collision = intersectRect(playerRect, opponentRect.getBoundingClientRect());
        if (collision) {
          setGameOver(true);
          console.log('Collision detected!');
        }
      });
    };

    // Intersection detection between two rectangles
    const intersectRect = (rect1, rect2) => {
      return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
      );
    };

    checkCollision();
  }, [playerPosition]);

  return (
    <div>
      <h1>Racing Game</h1>
      <RacingTrack/>
      <div className="track">
        <div
          id="player"
          className="player"
          style={{ left: `${playerPosition}px` }}
        />
        {opponentPositions.map((position, index) => (
          <div
            key={index}
            className="opponent"
            style={{ left: `${position}px` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
