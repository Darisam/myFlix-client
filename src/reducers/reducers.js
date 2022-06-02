import { combineReducers } from 'redux';

import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.value;

    case ADD_TO_FAVORITES:
      if (state.FavoriteMovies.includes(action.value)) {
        return state;
      } else {
        const newFavorites = [...state.FavoriteMovies, action.value];
        return { ...state, FavoriteMovies: newFavorites };
      }

    case REMOVE_FROM_FAVORITES: {
      const newFavorites = state.FavoriteMovies.filter(
        (movieId) => movieId !== action.value
      );
      return { ...state, FavoriteMovies: newFavorites };
    }

    default:
      return state;
  }
}

/*function newUserdata(state = {}, action) {
  switch (action.type) {
    case SET_NEW_USERNAME:
      return { ...state, Username: action.value };
    case SET_NEW_PASSWORD:
      return { ...state, Password: action.value };
    case SET_NEW_EMAIL:
      return { ...state, Email: action.value };
    case SET_NEW_BIRTHDAY:
      return { ...state, Birthday: action.value };
    case CLEAR_USERDATA:
      return {};
    default:
      return state;
  }
}

function error(state = {}, action) {
  switch (action.type) {
    case SET_ERROR:
      return action.value;
    default:
      return state;
  }
}*/

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
});

export default moviesApp;
