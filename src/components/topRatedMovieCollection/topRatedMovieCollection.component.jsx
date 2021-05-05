import React from 'react';
import './topRatedMovieCollection.styles.scss';
import MovieTvCategory from '../movieTvCategory/movieTvCategory.component';

const TopRatedMovies = () => (
  <MovieTvCategory
    title='Top Rated Movies'
    movieType='movie'
    movieCategory='top_rated'
  />
);

export default TopRatedMovies;
