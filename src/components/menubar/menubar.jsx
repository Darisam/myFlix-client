import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './menubar.scss';

const mapStateToProps = (state) => {
  return { user: state.user };
};

function Menubar(props) {
  const { user, onLoggedOut } = props;
  const username = user.Username;

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

export default connect(mapStateToProps)(Menubar);

Menubar.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    FavoriteMovies: PropTypes.array.isRequired,
  }).isRequired,
  onLoggedOut: PropTypes.func.isRequired,
};
