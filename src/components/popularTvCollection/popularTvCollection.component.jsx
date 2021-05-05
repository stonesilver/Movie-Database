import React from 'react';
import MovieTvCategory from '../movieTvCategory/movieTvCategory.component';
import './popularTvCollection.styles.scss';

const PopularTvCollection = () => (
  <MovieTvCategory
    title='Popular Tv Shows'
    movieType='tv'
    movieCategory='popular'
  />
);

export default PopularTvCollection;
