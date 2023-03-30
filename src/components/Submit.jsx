import React, { useState } from 'react';

const Submit = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');

  return (
    <form
    // onSubmit={(event) => handleSummit(event, name, breed)}
    >
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
