import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import PropTypes from 'prop-types';

import './menubar.scss';

export function Menubar(props) {
  const { username, onLoggedOut } = props;

  if (!username) {
    return <div></div>;
  }

  return (
    <Navbar
      variant="dark"
      collapseOnSelect
      expand="md"
      className="justify-content-end lead font-weight-bold"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto text-right">
          <Nav.Link
            as={NavLink}
            to="/"
            eventKey="1"
            className="clickable navlink"
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to={`/users/${username}`}
            className="ml-3 clickable navlink"
            eventKey="2"
            active
          >
            Profile
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/"
            onClick={onLoggedOut}
            className="ml-3 clickable navlink"
            eventKey="3"
          >
            Log Out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

Menubar.propTypes = {
  username: PropTypes.string.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
};
