import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './movie-view.scss';
import '../../index.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <Row className="justify-content-center mb-4">
          <Col xs={8} className="movie-poster p-2">
            <img
              crossorigin="anonymous"
              src={movie.ImagePath}
              width="100%"
              alt=""
            />
          </Col>
        </Row>
        <Row className="movie-title justify-content-center">
          <Col xs="auto">
            <h1>{movie.Title}</h1>
          </Col>
        </Row>
        <Row className="movie-director">
          <Col xs={3} className="label">
            Director:{' '}
          </Col>
          <Col xs={9} className="value">
            {movie.Director.Name}
          </Col>
        </Row>
        <Row className="movie-description">
          <Col xs={3} className="label">
            Description:{' '}
          </Col>
          <Col xs={9} className="value">
            {movie.Description}
          </Col>
        </Row>
        <Row className="movie-genre">
          <Col xs={3} className="label">
            Genre:{' '}
          </Col>
          <Col xs={9} className="value">
            {movie.Genre.Name}
          </Col>
        </Row>
        <Row className="back-button justify-content-end mt-3">
          <Col xs="auto">
            <Button
              onClick={onBackClick}
              className="button-color clickable border border-dark rounded clickable"
              size="sm"
            >
              Back to Main View
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

MovieView.propTypes = {
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

  onBackClick: PropTypes.func.isRequired,
};
