import React, { useEffect, useState } from 'react';

const cohortName = import.meta.env.VITE_COHORT_NAME;
const API_URL = `${import.meta.env.VITE_API_URL}/${cohortName}/`;

const CardList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}players`)
      .then((res) => res.json())
      .then((result) => setPlayers(result.data.players))
      .catch(console.error);
  }, []);

  return (
    <div className='card-list'>
      {players.map((player) => {
        return (
          <div className='player-card' key={player.id}>
            <div className='header-info'>
              <p className='pup-title'>{player.name}</p>
              <p className='pup-number'>#{player.id}</p>
            </div>
            {players.length > 1 ? (
              ''
            ) : (
              <div className='team-info'>
                <p>Team: {player.team ? player.team.name : 'Unassigned'}</p>
                <p>Breed: {player.breed}</p>
              </div>
            )}
            <img
              src={player.imageUrl}
              alt={player.breed}
              className='puppy-photo'
              //   onClick={() => handlingViewDetail(player.id)}
            />
            {players.length > 1 ? (
              <button
                className='remove-button'
                // onClick={() => handlingRemovePlayer(player.id)}
              >
                Remove from roster
              </button>
            ) : (
              <button
                id='see-all'
                //   onClick={() => handlingRenderPlayers()}
              >
                Back to all players
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CardList;
