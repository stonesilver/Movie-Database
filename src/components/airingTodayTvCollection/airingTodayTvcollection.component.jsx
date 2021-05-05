import React from 'react';
import MovieTvCategory from '../movieTvCategory/movieTvCategory.component';
import './airingTodayTvCollection.styles.scss';

const AiringTodayTvShows = () => (
  <MovieTvCategory
    title='Tv Shows Airing Today'
    movieType='tv'
    movieCategory='airing_today'
  />
);

export default AiringTodayTvShows;
