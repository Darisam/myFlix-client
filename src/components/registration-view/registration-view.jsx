import React, { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

export function RegistrationView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const newUserValid = () => {
    let usernameValid = /^[a-zA-Z0-9]{5,}$/.test(username);
    let passwordValid = password.length > 7;
    let emailValid = email.includes('@');

    setUsernameErr(
      usernameValid
        ? ''
        : 'Please enter a Username containing at least five characters and only alphanumeric characters.'
    );
    setPasswordErr(
      passwordValid
        ? ''
        : 'You need to set a password that contains at least eight characters.'
    );
    setEmailErr(emailValid ? '' : 'Please enter a valid email address.');

    return usernameValid && passwordValid && emailValid;
  };

  const handleSubmit = () => {
    if (newUserValid()) {
      let userData = { Username: username, Password: password, Email: email };
      if (birthday) {
        userData.Birthday = birthday;
      }
      axios({
        method: 'post',
        url: 'https://klaus-movies.herokuapp.com/users',
        data: userData,
      })
        .then((response) => {
          const reply = response.data;
          console.log(reply);
          window.open('/', '_self');
        })
        .catch((error) => {
          console.error(error.response);
        });
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
        {usernameErr && <p className="text-warning">{usernameErr}</p>}
      </Form.Group>
      <Form.Group controlId="registerEmail" className="mb-3">
        <Form.Label>E-mail:</Form.Label>
        <Form.Control
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        {emailErr && <p className="text-warning">{emailErr}</p>}
      </Form.Group>
      <Form.Group controlId="registerPassword" className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {passwordErr && <p className="text-warning">{passwordErr}</p>}
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
