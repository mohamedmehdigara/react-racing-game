import React, { useState, useEffect } from 'react';

const RacingTrack = () => {
  const [playerPosition, setPlayerPosition] = useState(0);

  useEffect(() => {
    const movePlayer = setInterval(() => {
      setPlayerPosition((prevPosition) => prevPosition + 5);
    }, 100);

    return () => {
      clearInterval(movePlayer);
    };
  }, []);

  return (
    <div className="racing-track">
      {/* Road and other track elements */}
      <div className="player" style={{ left: `${playerPosition}px` }} />
    </div>
  );
};
 export default RacingTrack;
