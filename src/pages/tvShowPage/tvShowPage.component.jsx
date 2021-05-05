import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PopularTvCollection from '../../components/popularTvCollection/popularTvCollection.component';
import AiringTodayTvShows from '../../components/airingTodayTvCollection/airingTodayTvcollection.component';
import OnTvShows from '../../components/onTvCollection/onTvCollection.component';
import TopRatedTvShows from '../../components/topRatedTvCollection/topRatedTvCollection.component';
import MovieDetails from '../../components/movieDetail/movieDetail.component';
import CastDetail from '../../components/castDetails/cast-detail.component';
import tvSeasons from '../../components/tv-seasons/tv-seasons.component';
import SeasonsEpisodes from '../../components/season-episodes/season-episodes.component';
import SeasonCast from '../../components/season-cast/season-cast.component';
import BackdropsPostersVideos from '../../components/backdropsPostersVideos/backdropsPostersVideos.component';
import YoutubeIframe from '../../components/youtube/youtube.component';
import PageNotFound from '../../components/404Page/404Page.component';
import './tvShowPage.styles.scss';

const TvShowPage = ({ match: { path } }) => (
  <div className='tv-page'>
    <Switch>
      <Route exact path={path} component={PopularTvCollection} />
      <Route
        exact
        path={`${path}/airing-today`}
        component={AiringTodayTvShows}
      />
      <Route exact path={`${path}/on-tv`} component={OnTvShows} />
      <Route exact path={`${path}/top-rated`} component={TopRatedTvShows} />
      <Route exact path={`${path}/:movieDetail/cast`} component={CastDetail} />
      <Route
        path={`${path}/:movieDetail/images/:imageType`}
        component={BackdropsPostersVideos}
      />
      <Route
        exact
        path={`${path}/:movieDetail/seasons`}
        component={tvSeasons}
      />
      <Route
        exact
        path={`${path}/:movieDetail/seasons/:seasonNumber`}
        component={SeasonsEpisodes}
      />
      <Route
        exact
        path={`${path}/:movieDetail/seasons/:seasonNumber/episode/:episodeNumber/images/:imageType`}
        component={BackdropsPostersVideos}
      />
      <Route
        exact
        path={`${path}/:movieDetail/seasons/:seasonNumber/episode/:episodeNumber/cast`}
        component={SeasonCast}
      />
      <Route
        exact
        path={`${path}/:movieDetail/seasons/:seasonNumber/episode/:episodeNumber/:episodeVideos`}
        component={BackdropsPostersVideos}
      />
      <Route path={`${path}/:movieDetail`} component={MovieDetails} />
      <Route component={PageNotFound} />
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

export default TvShowPage;
