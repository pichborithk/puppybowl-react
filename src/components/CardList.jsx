import { useNavigate } from 'react-router-dom';

const cohortName = import.meta.env.VITE_COHORT_NAME;
const API_URL = `${import.meta.env.VITE_API_URL}/${cohortName}`;

const CardList = ({ players, setPlayers }) => {
  const navigate = useNavigate();

  const removePlayer = async (playerId) => {
    try {
      const response = await fetch(`${API_URL}/players/${playerId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.error) throw result.error;
      console.log('Success remove');
    } catch (error) {
      console.error(
        `Whoops, trouble removing player #${playerId} from the roster!`,
        err
      );
    }
    try {
      const response = await fetch(`${API_URL}/players`);
      const result = await response.json();
      if (result.error) throw result.error;
      setPlayers(result.data.players);
    } catch (error) {
      console.error(error);
    }
  };

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
