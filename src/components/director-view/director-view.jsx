import React from 'react';

import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { MovieCard } from '../movie-card/movie-card';

export function DirectorView(props) {
  const { director, movies, onBackClick } = props;

  return (
    <div class="director-view">
      <Row>
        <Col sm={2}>
          <Button size="lg" onClick={onBackClick}>
            &lt;
          </Button>
        </Col>
        <Col sm={8} lg={6}>
          <h1>{director.Name}</h1>
          <Row className="mb-3">
            <Col>Born in {director.Birth}</Col>
            <Col>{director.Death ? `Died in ${director.Death}` : ''}</Col>
          </Row>
          <h2>
            <small>Biography</small>
          </h2>
          <p>{director.Bio}</p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col className="lead font-weight-bold">
          Some Movies by {director.Name}
        </Col>
      </Row>

      <Row className="mt-3 justify-content-center justify-content-sm-start">
        {movies
          .filter((movie) => movie.Director.Name === director.Name)
          .map((movie) => (
            <Col
              key={movie._id}
              xl={2}
              lg={3}
              md={4}
              sm={6}
              xs={10}
              className="p-2"
            >
              <MovieCard movie={movie} profile={false} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

DirectorView.propTypes = {
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

  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string,
  }).isRequired,

  onBackClick: PropTypes.func.isRequired,
};
