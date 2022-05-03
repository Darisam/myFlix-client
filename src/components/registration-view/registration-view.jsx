import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');

  const handleSubmit = () => {
    let newUser = { Username, Password, Email, Birthday };
    console.log(newUser);
    // To do: Submit new user to movie.api
    props.onRegistered(Username);
  };

  return (
    <form>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        type="text"
        required
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <br />
      <label htmlFor="email">E-mail:</label>
      <input
        id="email"
        type="email"
        required
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="text"
        required
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <br />
      <label htmlFor="birthday">Birthday:</label>
      <input
        id="birthday"
        type="date"
        onChange={(event) => {
          setBirthday(event.target.value);
        }}
      />
      <br />
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

RegistrationView.propTypes = {
  onRegistered: PropTypes.func.isRequired,
};
