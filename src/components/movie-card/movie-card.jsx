import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './movie-card.scss';
import '../../index.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onCardClick } = this.props;
    return (
      <Card
        className="movie-card clickable card-color"
        onClick={() => {
          onCardClick(movie);
        }}
      >
        <Card.Img variant="top" crossorigin="anonymous" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button
            onClick={() => {
              onCardClick(movie);
            }}
            className="sr-only sr-only-focusable"
          >
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
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

  onCardClick: PropTypes.func.isRequired,
};
