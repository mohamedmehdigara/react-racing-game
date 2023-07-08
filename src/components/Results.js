import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('/api/results')
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Race Results</h1>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
