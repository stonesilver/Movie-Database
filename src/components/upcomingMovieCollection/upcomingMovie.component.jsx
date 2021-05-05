import React from 'react';
import './upcomingMovie.styles.scss';
import MovieTvCategory from '../movieTvCategory/movieTvCategory.component';

const UpComingMovie = () => (
  <MovieTvCategory
    title='Upcoming Movies'
    movieType='movie'
    movieCategory='upcoming'
  />
);

export default UpComingMovie;
