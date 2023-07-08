import React, { useState, useEffect } from 'react';

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [playerSpeed, setPlayerSpeed] = useState(0);
  const [isAccelerating, setIsAccelerating] = useState(false);
  const [isBraking, setIsBraking] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'ArrowLeft') {
        // Steer left
        setPlayerPosition((prevPosition) => prevPosition - 10);
      } else if (event.code === 'ArrowRight') {
        // Steer right
        setPlayerPosition((prevPosition) => prevPosition + 10);
      } else if (event.code === 'ArrowUp') {
        // Start accelerating
        setIsAccelerating(true);
      } else if (event.code === 'ArrowDown') {
        // Start braking
        setIsBraking(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'ArrowUp') {
        // Stop accelerating
        setIsAccelerating(false);
      } else if (event.code === 'ArrowDown') {
        // Stop braking
        setIsBraking(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const accelerationRate = 0.5; // Adjust the acceleration rate as needed
    const brakeRate = 1.5; // Adjust the brake rate as needed

    const updatePlayerMovement = setInterval(() => {
      // Update player's speed
      if (isAccelerating && playerSpeed < 10) {
        setPlayerSpeed((prevSpeed) => prevSpeed + accelerationRate);
      } else if (isBraking && playerSpeed > 0) {
        setPlayerSpeed((prevSpeed) => prevSpeed - brakeRate);
      }

      // Update player's position based on speed
      setPlayerPosition((prevPosition) => prevPosition + playerSpeed);

      // Limit player's position within the track boundaries
      // Add appropriate logic to prevent the player from going off the track

      // ...

    }, 16); // Adjust the interval as needed (60 FPS is approximately 16ms)

    return () => {
      clearInterval(updatePlayerMovement);
    };
  }, [isAccelerating, isBraking, playerSpeed]);

  return (
    <div>
      <h1>Racing Game</h1>
      <div className="racing-track">
        {/* Render the player element */}
        <div className="player" style={{ left: `${playerPosition}px` }} />
      </div>
      {/* Other game components and UI elements */}
    </div>
  );
};

export default Game;
