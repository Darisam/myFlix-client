import React from 'react';

export class MovieCard extends React.Component {
  render() {
    const { movie, onCardClick } = this.props;
    return (
      <div
        className="movie-card"
        onClick={() => {
          onCardClick(movie);
        }}
      >
        {movie.Title}
      </div>
    );
  }
}
