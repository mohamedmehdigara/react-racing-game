import React from 'react';

const Results = ({ results }) => {
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

