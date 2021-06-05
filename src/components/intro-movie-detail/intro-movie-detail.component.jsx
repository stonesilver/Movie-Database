import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link, withRouter } from 'react-router-dom';
import ExpandableImage from '../expandableImage/expandableImage.component';
import './intro-movie-detail.styles.scss';

const IntroDetail = ({
  movieData,
  crew,
  video,
  match,
  showRating,
  UserProgress,
  revenue,
  streamTunneled,
  mediaQuery,
  backgroundColor,
}) => {
  const {
    title,
    name,
    backdrop_path,
    poster_path,
    overview,
    vote_average,
    tagline,
    release_date,
    first_air_date,
    runtime,
    episode_run_time,
    genres,
    created_by,
    parts,
  } = movieData;
  const crewMembers = crew
    ? crew.filter(
        (crewMember) =>
          crewMember.job === 'Director' ||
          crewMember.job === 'Screenplay' ||
          crewMember.job === 'Story'
      )
    : '';
  const progress = UserProgress ? UserProgress : Math.round(vote_average) * 10;
  return (
    <div
      className='first-grid'
      style={{
        backgroundImage:
          movieData && backgroundColor
            ? `linear-gradient(${backgroundColor[0]}, ${backgroundColor[0]}),
        url("https://image.tmdb.org/t/p/w780${backdrop_path}")`
            : `linear-gradient(rgba(39, 39, 41, 0.8), rgba(36, 36, 39, 0.8)),
        url(${Image})`,
      }}
    >
      <div
        className='left'
        style={{ background: mediaQuery ? backgroundColor[0] : 'transparent' }}
      >
        <ExpandableImage
          posterPath={poster_path}
          stream={streamTunneled}
          backgroundColor={backgroundColor[2]}
          title={title || name}
        />
      </div>
      <div className='right'>
        <div className='title' style={{ background: mediaQuery ? backgroundColor[0] : 'transparent' }}>
          <h2 className='movie-name'>
            {title ? title : name}{' '}
            {release_date || first_air_date ? (
              <span className='filter'>
                {release_date
                  ? `(${new Date(release_date).getFullYear()})`
                  : `(${new Date(first_air_date).getFullYear()})`}
              </span>
            ) : (
              ''
            )}
          </h2>
        </div>
        <div className='release-detail' style={{ background: mediaQuery ? backgroundColor[0] : 'transparent' }}>
          {showRating ? <p className='rating padded filter'>R</p> : ''}
          {release_date || first_air_date ? (
            <p className='release-date padded'>
              {release_date ? release_date : first_air_date} (US)
            </p>
          ) : (
            ''
          )}
          <ul className='list genre'>
            {genres
              ? genres.map((genre) => (
                  <li className='list-item' key={genre.id}>
                    {genre.name}
                  </li>
                ))
              : ''}
          </ul>
          <ul className='list runtime'>
            {runtime > 0 ? (
              <li>
                {runtime
                  ? `${
                      parseInt(runtime) >= 60 ? parseInt(runtime / 60) : '00'
                    }hr : ${
                      parseInt(runtime) >= 60 ? parseInt(runtime % 60) : runtime
                    }min`
                  : `${
                      parseInt(episode_run_time) >= 60
                        ? parseInt(episode_run_time / 60)
                        : '00'
                    }hr : ${
                      parseInt(episode_run_time) >= 60
                        ? parseInt(episode_run_time % 60)
                        : episode_run_time
                    }min`}
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
        <div className='movie-rating' style={{ background: mediaQuery ? backgroundColor[0] : 'transparent' }}>
          <div className='movie-score'>
            <div className='circular-progressbar'>
              <CircularProgressbar
                value={progress ? progress : 0}
                text={progress ? progress : 'NR'}
                background={true}
                styles={buildStyles({
                  pathColor: progress >= 70 ? 'green' : 'yellow',
                  strokeLinecap: 'butt',
                  textSize: progress > 1 ? '55px' : '40px',
                  textColor: 'white',
                  backgroundColor: 'transparent',
                })}
              />
            </div>

            <div className='movie-score-text'>
              <p className='user text'>User</p>
              <p className='score text'>Score</p>
            </div>
          </div>
          {showRating ? (
            <div>
              <div className='login-rating'>
                <div className='custom-list list-circle'>
                  <i className='fas fa-list'></i>
                </div>
                <div className='favourite-list list-circle'>
                  <i className='fas fa-heart'></i>
                </div>
                <div className='watchlist list-circle'>
                  <i className='fas fa-bookmark'></i>
                </div>
                <div className='rate-movie list-circle'>
                  <i className='fas fa-star'></i>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {video && video.length ? (
            <Link
              to={`${match.url}${
                video[0].key[0] === '/'
                  ? `/play${video[0].key}`
                  : `/play/${video[0].key}`
              }`}
              className='play-trailer'
            >
              <p className='play'>
                <i className='fas fa-play'></i> Play Trailer
              </p>
            </Link>
          ) : (
            ''
          )}
        </div>
        {tagline ? (
          <div className='tagline'>
            <p className='tagline-text filter'>{tagline}</p>
          </div>
        ) : (
          ''
        )}
        <div className='overview'>
          <h4 className='overview-header'>Overview</h4>
          <p className='overview-text'>{overview}</p>
        </div>
        {created_by || crewMembers ? (
          <div className='mini-cast'>
            {created_by
              ? created_by.map(({ id, job, name }) => (
                  <div className='cast' key={id}>
                    <p className='name'>{name}</p>
                    <p className='role'>Creator</p>
                  </div>
                ))
              : crewMembers.map(({ id, job, name }, index) => (
                  <div className='cast' key={index}>
                    <p className='name'>{name}</p>
                    <p className='role'>{job}</p>
                  </div>
                ))}
          </div>
        ) : (
          ''
        )}
        {parts ? (
          <div className='number-of-movies'>
            <h6>
              Number of Movies: <span>{parts ? parts.length : ''}</span>
            </h6>
            <p className='movie-revenue'>
              Revenue: <span>${revenue}</span>
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default withRouter(IntroDetail);
