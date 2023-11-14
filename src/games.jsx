// Games.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGeneration } from './actions';

const Games = () => {
  const dispatch = useDispatch();
  const generations = useSelector((state) => state.generations);

  const handleGenerationClick = (generationId) => {
    dispatch(selectGeneration(generationId));
  };

  return (
    <div>
      <h2>Games Component</h2>
      <ul>
        {generations.map((generation) => (
          <li key={generation.id} onClick={() => handleGenerationClick(generation.id)}>
            {generation.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Games;
