import { useNavigate } from 'react-router-dom';

const CardList = ({ players, removePlayer }) => {
  const navigate = useNavigate();

  return (
    <div className='card-list'>
      {players.map((player) => {
        return (
          <div className='player-card' key={player.id}>
            <div className='header-info'>
              <p className='pup-title'>{player.name}</p>
              <p className='pup-number'>#{player.id}</p>
            </div>
            <img
              src={player.imageUrl}
              alt={player.breed}
              className='puppy-photo'
              onClick={() => navigate(`/players/${player.id}`)}
            />
            <button
              className='remove-button'
              onClick={() => removePlayer(player.id)}
            >
              Remove from roster
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CardList;
