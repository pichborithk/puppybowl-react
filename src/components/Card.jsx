import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const cohortName = import.meta.env.VITE_COHORT_NAME;
const API_URL = `${import.meta.env.VITE_API_URL}/${cohortName}`;

const Card = () => {
  const { playerId } = useParams();

  const navigate = useNavigate();

  const [player, setPlayer] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/players/${playerId}`)
      .then((res) => res.json())
      .then((result) => setPlayer(result.data.player))
      .catch(console.error);
  }, []);

  return (
    <div className='player-card' key={player.id}>
      <div className='header-info'>
        <p className='pup-title'>{player.name}</p>
        <p className='pup-number'>#{player.id}</p>
      </div>
      <div className='team-info'>
        <p>Team: {player.team ? player.team.name : 'Unassigned'}</p>
        <p>Breed: {player.breed}</p>
      </div>
      <img src={player.imageUrl} alt={player.breed} className='puppy-photo' />
      <button id='see-all' onClick={() => navigate('/', { replace: true })}>
        Back to all players
      </button>
    </div>
  );
};

export default Card;
