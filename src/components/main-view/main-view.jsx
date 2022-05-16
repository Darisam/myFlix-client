import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { Menubar } from '../menubar/menubar';

/* User has three possible states: Null if we know the viewer is not logged in , an 
object holding the user data if the user is logged in, and undefined while we don't know
anything yet. */

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: undefined,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken) {
      let username = localStorage.getItem('username');
      this.getUser(accessToken, username);
      this.getMovies(accessToken);
    } else {
      this.setState({ user: null });
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    let username = authData.user.Username;
    localStorage.setItem('token', authData.token);
    localStorage.setItem('username', username);
    this.setState({ user: authData.user });
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({ user: null });
    window.location.replace('/');
  }

  getMovies(token) {
    axios({
      method: 'get',
      url: 'https://klaus-movies.herokuapp.com/movies',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({ movies: response.data });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  getUser(token, username) {
    axios({
      method: 'get',
      url: `https://klaus-movies.herokuapp.com/users/${username}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response.data);
        this.setState({ user: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { movies, user } = this.state;

    if (user === null) {
      return (
        <Router>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <LoginView
                  onLoggedIn={(username) => {
                    this.onLoggedIn(username);
                  }}
                />
              );
            }}
          />

          <Route
            path="/registration"
            render={() => {
              return <RegistrationView />;
            }}
          />
        </Router>
      );
    }

    if (user && movies.length > 0) {
      const username = user.Username;

      return (
        <Router>
          <Menubar
            username={username}
            onLoggedOut={() => {
              this.onLoggedOut();
            }}
          />

          <Route
            exact
            path="/"
            render={() => {
              return (
                <div>
                  <Row className="justify-content-center mt-4">
                    {movies.map((movie) => (
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
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              return (
                <MovieView
                  movie={movies.find((m) => m._id === match.params.movieId)}
                  user={user}
                  onBackClick={() => {
                    history.goBack();
                  }}
                  onUserChange={(user) => {
                    this.setState({ user: user });
                  }}
                />
              );
            }}
          />

          <Route
            path="/directors/:directorName"
            render={({ match, history }) => {
              return (
                <DirectorView
                  director={
                    movies.find(
                      (m) => m.Director.Name === match.params.directorName
                    ).Director
                  }
                  movies={movies}
                  onBackClick={() => {
                    history.goBack();
                  }}
                />
              );
            }}
          />

          <Route
            path="/genres/:genreName"
            render={({ match, history }) => {
              return (
                <GenreView
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.genreName)
                      .Genre
                  }
                  movies={movies}
                  onBackClick={() => {
                    history.goBack();
                  }}
                />
              );
            }}
          />

          <Route
            path={`/users/${username}`}
            render={({ history }) => {
              return (
                <Col>
                  <ProfileView
                    movies={movies}
                    user={user}
                    onBackClick={() => {
                      history.goBack();
                    }}
                    onLoggedOut={() => {
                      this.onLoggedOut();
                    }}
                    onUserChange={(user) => {
                      this.setState({ user: user });
                    }}
                  />
                </Col>
              );
            }}
          />
        </Router>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
