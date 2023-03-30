import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import Teammates from './Teammates';

const cohortName = import.meta.env.VITE_COHORT_NAME;
const API_URL = `${import.meta.env.VITE_API_URL}/${cohortName}`;

const PlayerDetail = () => {
  const { playerId } = useParams();

  const [player, setPlayer] = useState({});
  const [teammates, setTeammates] = useState([]);

  useEffect(() => {
    async function fetchPlayerDetail() {
      let currentPlayer;
      try {
        const response = await fetch(`${API_URL}/players/${playerId}`);
        const result = await response.json();
        if (result.error) throw result.error;
        currentPlayer = result.data.player;
        setPlayer(result.data.player);
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await fetch(`${API_URL}/teams`);
        const result = await response.json();
        if (result.error) throw result.error;
        const team = result.data.teams.filter(
          (t) => t.id === currentPlayer.teamId
        );
        setTeammates([...team[0].players]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPlayerDetail();
  }, [playerId]);

  return (
    <div className='player-detail'>
      <Card player={player} />
      <Teammates player={player} teammates={teammates} />
    </div>
  );
};

export default PlayerDetail;
