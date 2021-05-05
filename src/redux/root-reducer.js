import { combineReducers } from 'redux';

import movieImagesReducer from './movie-images/movie.images.reducer';

export default combineReducers({
  images: movieImagesReducer,
});
