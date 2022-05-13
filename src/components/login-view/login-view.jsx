import React, { useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    axios({
      method: 'post',
      url: 'https://klaus-movies.herokuapp.com/login',
      params: { Username: username, Password: password },
    })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="login-form mt-4">
      <Form>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Form.Group>
        <Button
          className="button-color border border-dark rounded clickable"
          type="button"
          onClick={handleSubmit}
        >
          Log In
        </Button>
      </Form>

      <Row className="mt-5 justify-content-end">
        <Col xs="auto">
          <p className="font-weight-bold lead">Not registered?</p>
        </Col>
        <Col xs="auto">
          <Link to={'/registration'}>
            <Button
              type="button"
              className="border border-dark rounded button-color clickable"
              role="presentation"
            >
              Register Now
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
