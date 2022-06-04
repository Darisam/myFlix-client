import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import ProfileView from '../profile-view/profile-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import { Menubar } from '../menubar/menubar';

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
            onLoggedOut={() => {
              this.onLoggedOut();
            }}
          />

          <Route
            exact
            path="/"
            render={() => {
              return <MoviesList />;
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match }) => {
              return (
                <MovieView
                  movie={movies.find((m) => m._id === match.params.movieId)}
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
                    onLoggedOut={() => {
                      this.onLoggedOut();
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
