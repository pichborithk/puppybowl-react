import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Submit from './components/Submit';
import CardList from './components/CardList';
import PlayerDetail from './components/PlayerDetail';

import './scss/app.scss';

const cohortName = import.meta.env.VITE_COHORT_NAME;
const API_URL = `${import.meta.env.VITE_API_URL}/${cohortName}`;

const App = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/players`)
      .then((res) => res.json())
      .then((result) => setPlayers(result.data.players))
      .catch(console.error);
  }, []);

  return (
    <div className='App'>
      <h1>
        <Link to='/'>PuppyBowl</Link>
      </h1>
      <Submit setPlayers={setPlayers} />
      <Routes>
        <Route
          path='/'
          element={<CardList players={players} setPlayers={setPlayers} />}
        />
        <Route path='/players/:playerId' element={<PlayerDetail />} />
      </Routes>
    </div>
  );
};

export default App;
