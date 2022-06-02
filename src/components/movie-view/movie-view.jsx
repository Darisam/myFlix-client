import React from 'react';
import axios from 'axios';

import PropTypes, { nominalTypeHack } from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {
  isMovieFavorite(user, movie) {
    return user.FavoriteMovies.includes(movie._id);
  }

  toggleFavorite(user, movie, onUserChange) {
    const username = user.Username;
    const accessToken = localStorage.getItem('token');

    if (this.isMovieFavorite(user, movie)) {
      axios({
        url: `https://klaus-movies.herokuapp.com/users/${username}/favorites/${movie._id}`,
        method: 'delete',
        headers: { Authorization: `Bearer ${accessToken}` },
        responseType: 'text',
      })
        .then((response) => {
          console.log(response);
          let newFavorites = user.FavoriteMovies.filter(
            (item) => item !== movie._id
          );
          user.FavoriteMovies = newFavorites;
          onUserChange(user);
        })
        .catch((error) => {
          console.erorr(error);
        });
    } else {
      axios({
        url: `https://klaus-movies.herokuapp.com/users/${username}/favorites/${movie._id}`,
        method: 'put',
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => {
          console.log(response);
          user.FavoriteMovies.push(movie._id);
          onUserChange(user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    const { movie, user, onBackClick, onUserChange } = this.props;

    return (
      <div className="movie-view">
        <Row>
          <Col xs="auto">
            <Button size="lg" onClick={onBackClick}>
              &lt;
            </Button>
          </Col>
          <Col xs="auto">
            <h1>{movie.Title}</h1>
          </Col>
          <Col xs="auto">
            <Button
              size="lg"
              className="like-button clickable"
              onClick={() => {
                this.toggleFavorite(user, movie, onUserChange);
              }}
            >
              {this.isMovieFavorite(user, movie) ? '\u2605' : '\u2606'}{' '}
            </Button>
          </Col>
        </Row>

        <Row className="mb-4 mt-5">
          <Col md={5} className="movie-poster p-2 mb-5">
            <img
              crossorigin="anonymous"
              src={movie.ImagePath}
              width="100%"
              alt=""
            />
          </Col>

          <Col md={7} className="pl-5">
            <Row className="movie-director">
              <Col xs={3} className="label ">
                Director:{' '}
              </Col>
              <Col xs={9} className="value ">
                <Link
                  to={`/directors/${movie.Director.Name}`}
                  className="link clickable"
                >
                  {movie.Director.Name}
                </Link>
              </Col>
            </Row>

            <Row className="movie-genre">
              <Col xs={3} className="label ">
                Genre:{' '}
              </Col>
              <Col xs={9} className="value">
                <Link
                  to={`/genres/${movie.Genre.Name}`}
                  className="link clickable"
                >
                  {movie.Genre.Name}
                </Link>
              </Col>
            </Row>

            <Row className="movie-description">
              <Col xs={3} className="label ">
                Description:{' '}
              </Col>
              <Col xs={9} className="value ">
                {movie.Description}
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  className="clickable button-color toggle-button border border-dark rounded mt-5 ml-5"
                  onClick={() => {
                    this.toggleFavorite(user, movie, onUserChange);
                  }}
                >
                  {this.isMovieFavorite(user, movie)
                    ? 'Remove from Favorites'
                    : 'Add to Favorites'}{' '}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,

  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    FavoriteMovies: PropTypes.array.isRequired,
  }).isRequired,

  onUserChange: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};
