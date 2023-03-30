import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Submit = ({ handleSubmit }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');

  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (event) => {
        await handleSubmit(event, name, breed);
        setName('');
        setBreed('');
        navigate(`/`, { replace: true });
      }}
    >
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
