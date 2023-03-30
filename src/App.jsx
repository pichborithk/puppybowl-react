import { Routes, Route } from 'react-router-dom';
import CardList from './components/CardList';
import Card from './components/Card';
import Submit from './components/Submit';
import './scss/app.scss';
import { useEffect, useState } from 'react';

const cohortName = import.meta.env.VITE_COHORT_NAME;
const API_URL = `${import.meta.env.VITE_API_URL}/${cohortName}`;
const DOG_IMAGE_URL = import.meta.env.VITE_DOG_IMAGE_URL;

const App = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/players`)
      .then((res) => res.json())
      .then((result) => setPlayers(result.data.players))
      .catch(console.error);
  }, []);

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

  const fetchTeamId = async () => {
    try {
      const response = await fetch(`${API_URL}/teams`);
      const result = await response.json();
      if (result.error) throw result.error;
      const team =
        result.data.teams[0].players.length >
        result.data.teams[1].players.length
          ? result.data.teams[1]
          : result.data.teams[0];
      console.log(team);
      return team.id;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDogImage = async () => {
    try {
      const response = await fetch(DOG_IMAGE_URL);
      const URL = (await response.json()).message;
      console.log(URL);
      return URL;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event, name, breed) => {
    event.preventDefault();
    if (!name || !breed) return;
    try {
      const teamId = await fetchTeamId();
      const imageUrl = await fetchDogImage();
      const playerObj = { name, breed, teamId, imageUrl };
      await fetch(`${API_URL}/players/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerObj),
      });
      const response = await fetch(`${API_URL}/players`);
      const result = await response.json();
      if (result.error) throw result.error;
      setPlayers(result.data.players);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='App'>
      <h1>PuppyBowl</h1>
      <Submit handleSubmit={handleSubmit} />
      <Routes>
        <Route
          path='/'
          element={<CardList players={players} removePlayer={removePlayer} />}
        />
        <Route path='/players/:playerId' element={<Card />} />
      </Routes>
    </div>
  );
};

export default App;
