import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [opponentPosition, setOpponentPosition] = useState(0);
  const [raceStarted, setRaceStarted] = useState(false);
  const [raceFinished, setRaceFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const movePlayer = (e) => {
      if (e.keyCode === 32 && !raceFinished) {
        setPlayerPosition((prevPosition) => prevPosition + 10);
      }
    };

    window.addEventListener('keydown', movePlayer);

    return () => {
      window.removeEventListener('keydown', movePlayer);
    };
  }, [raceFinished]);

  useEffect(() => {
    if (raceStarted && !raceFinished) {
      const moveOpponent = setInterval(() => {
        setOpponentPosition((prevPosition) => prevPosition + 5);
      }, 100);

      return () => {
        clearInterval(moveOpponent);
      };
    }
  }, [raceStarted, raceFinished]);

  useEffect(() => {
    if (playerPosition >= 1000) {
      setRaceFinished(true);
      axios.post('/api/results', { result: 'Player Wins' }).catch((error) => {
        console.log(error);
      });
    } else if (opponentPosition >= 1000) {
      setRaceFinished(true);
      axios.post('/api/results', { result: 'Opponent Wins' }).catch((error) => {
        console.log(error);
      });
    }
  }, [playerPosition, opponentPosition]);

  const startRace = () => {
    setRaceStarted(true);
  };

  const goToResults = () => {
    navigate.push('/results');
  };

  return (
    <div>
      <h1>Racing Game</h1>
      <div className="race-track">
        <div className="player" style={{ left: `${playerPosition}px` }} />
        <div className="opponent" style={{ left: `${opponentPosition}px` }} />
      </div>
      {!raceStarted && !raceFinished && (
        <button onClick={startRace}>Start Race</button>
      )}
      {raceFinished && (
        <button onClick={goToResults}>View Results</button>
      )}
    </div>
  );
};

export default Game;
