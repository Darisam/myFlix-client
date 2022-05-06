import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

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
    <Form className="mt-4 registration-form" onSubmit={handleSubmit}>
      <Form.Group controlId="registerUsername" className="mb-3">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="registerEmail" className="mb-3">
        <Form.Label>E-mail:</Form.Label>
        <Form.Control
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="registerPassword" className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="text"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="registerBirthday" className="mb-3">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          onChange={(event) => {
            setBirthday(event.target.value);
          }}
        />
      </Form.Group>
      <Button
        className="button-color border border-dark rounded mt-3 clickable"
        type="button"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  onRegistered: PropTypes.func.isRequired,
};
