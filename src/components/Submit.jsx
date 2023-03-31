import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DOG_IMAGE_URL = import.meta.env.VITE_DOG_IMAGE_URL;
const cohortName = import.meta.env.VITE_COHORT_NAME;
const API_URL = `${import.meta.env.VITE_API_URL}/${cohortName}`;

const Submit = ({ setPlayers }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');

  const navigate = useNavigate();

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

  const handleSubmit = async (event) => {
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
      setName('');
      setBreed('');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name:</label>
      <input
        type='text'
        name='name'
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <label htmlFor='breed'>Breed:</label>
      <input
        type='text'
        name='breed'
        value={breed}
        onChange={(event) => setBreed(event.target.value)}
        required
      />
      <button type='submit'>Register</button>
    </form>
  );
};

export default Submit;
