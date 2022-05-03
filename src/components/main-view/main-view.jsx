import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
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

  setSelectedMovie(newSelectedMovie) {
    this.setState({ selectedMovie: newSelectedMovie });
  }

  onLoggedIn(user) {
    this.setState({ user });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) {
      return (
        <LoginView
          onLoggedIn={(user) => {
            this.onLoggedIn(user);
          }}
        />
      );
    }

    if (movies.length === 0) {
      return <div className="main-view" />;
    }

    if (selectedMovie) {
      return (
        <MovieView
          movie={selectedMovie}
          onBackClick={() => {
            this.setSelectedMovie(null);
          }}
        />
      );
    } else {
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
}
