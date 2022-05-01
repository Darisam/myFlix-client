import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: 'The Silence of the Lambs',
          Description:
            'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
          Director: 'Jonathan Demme',
          Genre: 'Thriller',
          ImagePath: '../../img/placeholder.png',
        },
        {
          _id: 2,
          Title: 'The Terminator',
          Description:
            'A human-like robot is sent from a future wher machines rule Earth to kill the mother of the future leader of the resistance against the machines before he is born.',
          Director: 'James Cameron',
          Genre: 'Action',
          ImagePath: '../../img/placeholder.png',
        },
        {
          _id: 3,
          Title: 'Spirited Away',
          Description:
            "10 year old girl Chihiro enter the spirit world after her parents have been turned into pigs by the witch Yubaba. She takes a job in Yubaba's bathhouse in the hope of undoing the enchantment and finding a way to return to the human world.",
          Director: 'Hayao Miyazaki',
          Genre: 'Animated',
          ImagePath: '../../img/placeholder.png',
        },
      ],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({ selectedMovie: newSelectedMovie });
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
