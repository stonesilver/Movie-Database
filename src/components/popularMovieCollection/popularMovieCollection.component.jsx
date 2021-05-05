import React from 'react';
import MovieTvCategory from '../movieTvCategory/movieTvCategory.component';
import './popularMovieCollection.styles.scss';

const PopularMoviesCollection = () => (
  <MovieTvCategory
    title='Popular Movies'
    movieType='movie'
    movieCategory='popular'
  />
);

export default PopularMoviesCollection;
