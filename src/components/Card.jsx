import { useNavigate } from 'react-router-dom';

const Card = ({ player }) => {
  const navigate = useNavigate();

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
      <button id='see-all' onClick={() => navigate('/')}>
        Back to all players
      </button>
    </div>
  );
};

export default Card;
