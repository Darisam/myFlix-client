import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './login-view.scss';
import '../../index.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);
    // To Do: Authenticate User
    props.onLoggedIn(username);
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
            type="text"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Form.Group>
        <Button
          className="button-color border border-dark rounded clickable"
          type="submit"
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
          <Button
            type="button"
            className="border border-dark rounded button-color clickable"
            onClick={props.onUnregistered}
          >
            Register Now
          </Button>
        </Col>
      </Row>
    </div>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onUnregistered: PropTypes.func.isRequired,
};
