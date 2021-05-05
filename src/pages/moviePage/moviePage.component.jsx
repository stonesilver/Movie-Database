import React from 'react';
import PopularMoviesCollection from '../../components/popularMovieCollection/popularMovieCollection.component';
import UpComingMovie from '../../components/upcomingMovieCollection/upcomingMovie.component';
import NowPlaying from '../../components/nowPlayingMovieCollection/nowPlaying.component';
import TopRatedMovies from '../../components/topRatedMovieCollection/topRatedMovieCollection.component';
import MovieDetails from '../../components/movieDetail/movieDetail.component';
import YoutubeIframe from '../../components/youtube/youtube.component';
import BackdropsPostersVideos from '../../components/backdropsPostersVideos/backdropsPostersVideos.component';
import CastDetail from '../../components/castDetails/cast-detail.component';
import { Route, Switch } from 'react-router-dom';
import './moviePage.styles.scss';

const MoviePage = ({ match: { path } }) => (
  <div className='movie-page'>
    <Switch>
      <Route exact path={path} component={PopularMoviesCollection} />
      <Route exact path={`${path}/now-playing`} component={NowPlaying} />
      <Route exact path={`${path}/upcoming`} component={UpComingMovie} />
      <Route exact path={`${path}/top-rated`} component={TopRatedMovies} />
      <Route exact path={`${path}/:movieDetail/cast`} component={CastDetail} />
      <Route
        path={`${path}/:movieDetail/images/:imageType`}
        component={BackdropsPostersVideos}
      />
      <Route path={`${path}/:movieDetail`} component={MovieDetails} />
    </Switch>
    <Route
      exact
      path={`${path}/:movieDetail/play/:youtubeID`}
      component={YoutubeIframe}
    />
    <Route
      exact
      path={`${path}/:movieDetail/images/:imageType/play/:youtubeID`}
      component={YoutubeIframe}
    />
  </div>
);

export default MoviePage;
