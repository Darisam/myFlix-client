import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({ selectedMovie: newSelectedMovie });
  }

  componentDidMount() {
    axios
      .get('https://klaus-movies.herokuapp.com/movies')
      .then((response) => {
        this.setState({ movies: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) {
      return (
        <MovieView
          movie={selectedMovie}
          onBackClick={() => {
            this.setSelectedMovie(null);
          }}
        />
      );
    }

    if (movies.length === 0) {
      return <div className="main-view">The list is empty</div>;
    }

    return (
      <div className="main-view">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onCardClick={(clickedMovie) => {
              this.setSelectedMovie(clickedMovie);
            }}
          />
        ))}
      </div>
    );
  }
}
