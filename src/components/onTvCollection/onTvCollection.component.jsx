import React from 'react';
import MovieTvCategory from '../movieTvCategory/movieTvCategory.component';
import './onTvCollection.styles.scss';

const OnTvShows = () => (
  <MovieTvCategory
    title='Currently Airing Tv Shows'
    movieType='tv'
    movieCategory='on_the_air'
  />
);

export default OnTvShows;
