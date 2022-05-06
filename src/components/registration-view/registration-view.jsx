import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');

  const validateUsername = (username) => {
    return { isNotValid: username === '', message: 'Please enter a username.' };
  };

  const validateEmail = (email) => {
    return {
      isNotValid: !email.includes('@'),
      message: 'Please enter a valid E-mail address.',
    };
  };

  const validatePassword = (password) => {
    return {
      isNotValid: password.length < 8,
      message: 'The password needs to be at least 8 characters long.',
    };
  };

  const handleSubmit = () => {
    if (validateUsername(Username).isNotValid) {
      alert(validateUsername(Username).message);
    } else if (validateEmail(Email).isNotValid) {
      alert(validateEmail(Email).message);
    } else if (validatePassword(Password).isNotValid) {
      alert(validatePassword(Password).message);
    } else {
      let newUser = { Username, Password, Email, Birthday };
      console.log(newUser);
      // To do: Submit new user to movie.api
      props.onRegistered(Username);
    }
  };

  return (
    <form>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        type="text"
        autoFocus
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <br />
      <label htmlFor="email">E-mail:</label>
      <input
        id="email"
        type="email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="text"
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
