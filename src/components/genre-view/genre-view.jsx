import React from 'react';

import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = (state) => {
  return { movies: state.movies };
};

function GenreView(props) {
  const { genre, movies } = props;

  return (
    <div className="genre-view">
      <Row>
        <Col sm={2}>
          <Button
            size="lg"
            onClick={() => {
              history.back();
            }}
          >
            &lt;
          </Button>
        </Col>
        <Col sm={8} lg={6}>
          <h1 className="mb-3">{genre.Name}</h1>

          <h2>
            <small>Description</small>
          </h2>
          <p>{genre.Description}</p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col className="lead font-weight-bold">
          Some Movies in the {genre.Name} genre:
        </Col>
      </Row>

      <Row className="mt-3 justify-content-center justify-content-sm-start">
        {movies
          .filter((movie) => movie.Genre.Name === genre.Name)
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
              <MovieCard movie={movie} fromProfileView={false} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default connect(mapStateToProps)(GenreView);

GenreView.propTypes = {
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

  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
