import React from 'react';
import MovieTvCategory from '../movieTvCategory/movieTvCategory.component';
import './nowPlaying.styles.scss';

const NowPlaying = () => (
  <MovieTvCategory
    title='Now Playing Movies'
    movieType='movie'
    movieCategory='now_playing'
  />
);

export default NowPlaying;
