import React from 'react';
import MovieTvCategory from '../movieTvCategory/movieTvCategory.component';
import './topRatedTvCollection.styles.scss';

const TopRatedTvShows = () => (
  <MovieTvCategory
    title='Top Rated Tv Shows'
    movieType='tv'
    movieCategory='top_rated'
  />
);

export default TopRatedTvShows;
