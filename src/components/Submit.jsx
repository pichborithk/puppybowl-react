import React, { useState } from 'react';
import { redirect } from 'react-router-dom';

const cohortName = import.meta.env.VITE_COHORT_NAME;
const API_URL = `${import.meta.env.VITE_API_URL}/${cohortName}`;
const DOG_IMAGE_URL = import.meta.env.VITE_DOG_IMAGE_URL;

const Submit = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');

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

  const handleSummit = async (event) => {
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
      return redirect('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSummit}>
      <label htmlFor='name'>Name:</label>
      <input
        type='text'
        name='name'
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor='breed'>Breed:</label>
      <input
        type='text'
        name='breed'
        onChange={(event) => setBreed(event.target.value)}
      />
      <button type='submit'>Register</button>
    </form>
  );
};

export default Submit;
