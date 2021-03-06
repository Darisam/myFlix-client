import React from 'react';

import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, profile, movieDelete } = this.props;
    return (
      <Link to={`/movies/${movie._id}`} className="card-color movie-link">
        <Card className="movie-card card-color clickable">
          <Card.Img
            variant="top"
            crossorigin="anonymous"
            src={movie.ImagePath}
          />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
          </Card.Body>

          {profile ? (
            <Button
              type="button"
              className="clickable mx-auto mb-2 rounded button-color border border-dark"
              onClick={(event) => {
                event.preventDefault();
                movieDelete();
              }}
            >
              Remove
            </Button>
          ) : (
            ''
          )}
        </Card>
      </Link>
    );
  }
}

MovieCard.propTypes = {
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
  profile: PropTypes.bool.isRequired,
  movieDelete: PropTypes.func,
};
