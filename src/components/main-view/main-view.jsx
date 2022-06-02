import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { setMovies, setUser } from '../../actions/actions';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { Menubar } from '../menubar/menubar';

/* User has three possible states: Null if we know the viewer is not logged in , an 
object holding the user data if the user is logged in, and undefined while we don't know
anything yet. */

class MainView extends React.Component {
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken) {
      let username = localStorage.getItem('username');
      this.getUser(accessToken, username);
      this.getMovies(accessToken);
    } else {
      this.props.setUser(null);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    let username = authData.user.Username;
    localStorage.setItem('token', authData.token);
    localStorage.setItem('username', username);
    this.props.setUser(authData.user);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.props.setUser(null);
    window.location.replace('/');
  }

  getMovies(token) {
    axios({
      method: 'get',
      url: 'https://klaus-movies.herokuapp.com/movies',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.props.setMovies(response.data);
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
        this.props.setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 401) {
          this.props.setUser(null); // If the bearer token has expired, go to login.
        }
      });
  }

  render() {
    const { movies, user } = this.props;

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

    if (Object.values(user).length > 0 && movies.length > 0) {
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
              return <MoviesList movies={movies} />;
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match }) => {
              return (
                <MovieView
                  movie={movies.find((m) => m._id === match.params.movieId)}
                  user={user}
                />
              );
            }}
          />

          <Route
            path="/directors/:directorName"
            render={({ match }) => {
              return (
                <DirectorView
                  director={
                    movies.find(
                      (m) => m.Director.Name === match.params.directorName
                    ).Director
                  }
                  movies={movies}
                />
              );
            }}
          />

          <Route
            path="/genres/:genreName"
            render={({ match }) => {
              return (
                <GenreView
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.genreName)
                      .Genre
                  }
                  movies={movies}
                />
              );
            }}
          />

          <Route
            path={`/users/${username}`}
            render={() => {
              return (
                <Col>
                  <ProfileView
                    movies={movies}
                    user={user}
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

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);

MainView.propTypes = {
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

  user: PropTypes.object,

  setMovies: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};
