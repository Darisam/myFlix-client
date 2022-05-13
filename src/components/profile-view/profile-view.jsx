import React, { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PropTypes } from 'prop-types';

import { MovieCard } from '../movie-card/movie-card';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      updatedUsername: '',
      updatedPassword: '',
      updatedEmail: '',
      updatedBirthday: '',
      passwordErr: '',
      emailErr: '',
    };
  }

  // The data are valid if they pass the test or if they weren't changed at all.

  updatedDataValid() {
    let { updatedPassword, updatedEmail } = this.state;
    let passwordValid = updatedPassword ? updatedPassword.length > 7 : true;
    let emailValid = updatedEmail ? updatedEmail.includes('@') : true;
    this.setState({
      passwordErr: passwordValid
        ? ''
        : 'You need to set a password that contains at least eight characters.',
    });
    this.setState({
      emailErr: emailValid ? '' : 'Please enter a valid email address.',
    });
    return passwordValid && emailValid;
  }

  handleUpdate(username, onUserChange) {
    if (this.updatedDataValid()) {
      const {
        updatedUsername,
        updatedPassword,
        updatedEmail,
        updatedBirthday,
      } = this.state;
      const accessToken = localStorage.getItem('token');
      const updatedUserData = {};

      if (updatedUsername) {
        updatedUserData.Username = updatedUsername;
      }
      if (updatedPassword) {
        updatedUserData.Password = updatedPassword;
      }
      if (updatedEmail) {
        updatedUserData.Email = updatedEmail;
      }
      if (updatedBirthday) {
        updatedUserData.Birthday = updatedBirthday;
      }

      if (updatedUserData !== {}) {
        axios({
          url: `https://klaus-movies.herokuapp.com/users/${username}`,
          method: 'put',
          headers: { Authorization: `Bearer ${accessToken}` },
          data: updatedUserData,
        })
          .then((response) => {
            console.log(response.data);
            onUserChange(response.data);
            if (updatedUsername) {
              localStorage.setItem('username', response.data.Username);
              window.location.replace(`/users/${response.data.Username}`);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  handleUserDelete(username, onLoggedOut) {
    const accessToken = localStorage.getItem('token');

    axios({
      url: `https://klaus-movies.herokuapp.com/users/${username}`,
      method: 'delete',
      headers: { Authorization: `Bearer ${accessToken}` },
      responseType: 'text',
    })
      .then((response) => {
        console.log(response);
        onLoggedOut();
        window.location.replace('/');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleMovieDelete(user, movieId, onUserChange) {
    const accessToken = localStorage.getItem('token');
    let username = user.Username;

    axios({
      method: 'delete',
      url: `https://klaus-movies.herokuapp.com/users/${username}/favorites/${movieId}`,
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        console.log(response);
        let newFavorites = user.FavoriteMovies.filter(
          (entry) => entry !== movieId
        );
        user.FavoriteMovies = newFavorites;
        onUserChange(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { onBackClick, onLoggedOut, onUserChange, user, movies } = this.props;
    const { passwordErr, emailErr } = this.state;

    if (Object.values(user).length === 0) {
      return <div></div>;
    }

    return (
      <div className="profile-view">
        <Row>
          <Col xs="auto">
            <Button size="lg" onClick={onBackClick}>
              &lt;
            </Button>
          </Col>
          <Col xs="auto">
            <h1>Profile</h1>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={8}>
            <Form className="mt-4 update-form">
              <Form.Group controlId="updateUsername" className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={user.Username}
                  onChange={(event) => {
                    this.setState({
                      updatedUsername: event.target.value || '',
                    });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="updateEmail" className="mb-3">
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={user.Email}
                  onChange={(event) => {
                    this.setState({ updatedEmail: event.target.value || '' });
                  }}
                />
                {emailErr && <p className="text-warning">{emailErr}</p>}
              </Form.Group>
              <Form.Group controlId="updatePassword" className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(event) => {
                    this.setState({
                      updatedPassword: event.target.value || '',
                    });
                  }}
                />
                {passwordErr && <p className="text-warning">{passwordErr}</p>}
              </Form.Group>
              <Form.Group controlId="updateBirthday" className="mb-3">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={user.Birthday ? user.Birthday.slice(0, 10) : ''}
                  onChange={(event) => {
                    this.setState({
                      updatedBirthday: event.target.value || '',
                    });
                  }}
                />
              </Form.Group>

              <Row>
                <Col xs="auto">
                  <Button
                    className="button-color border border-dark rounded mt-3 clickable"
                    type="button"
                    onClick={() => {
                      this.handleUpdate(user.Username, onUserChange);
                    }}
                  >
                    Update
                  </Button>
                </Col>

                <Col xs="auto" className="ml-auto">
                  <Button
                    className="button-color border border-dark mt-3 rounded clickable"
                    onClick={() => {
                      this.handleUserDelete(user.Username, onLoggedOut);
                    }}
                  >
                    Delete User
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col xs="auto">
            <h2>Favorite Movies</h2>
          </Col>
        </Row>

        <Row className="mt-2 justify-content-center justify-content-sm-start">
          {movies
            .filter((movie) => user.FavoriteMovies.includes(movie._id))
            .map((movie) => (
              <Col
                key={movie._id}
                xl={2}
                lg={3}
                md={4}
                sm={6}
                xs={10}
                className="p-2  text-center"
              >
                <MovieCard movie={movie} />

                <Button
                  className="button-color border border-dark mt-1 rounded clickable"
                  type="button"
                  onClick={() =>
                    this.handleMovieDelete(user, movie._id, onUserChange)
                  }
                >
                  Remove
                </Button>
              </Col>
            ))}
        </Row>
      </div>
    );
  }
}

ProfileView.propTypes = {
  onLoggedOut: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onUserChange: PropTypes.func.isRequired,

  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string,
      }).isRequired,
      Featured: PropTypes.bool.isRequired,
    })
  ).isRequired,

  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    FavoriteMovies: PropTypes.array.isRequired,
  }).isRequired,
};
