import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import { CSSTransitionGroup } from 'react-transition-group';
import 'react-circular-progressbar/dist/styles.css';
import './movie-card.styles.scss';

const MovieCard = ({
  src,
  rating,
  movieTitle,
  tvTitle,
  releaseDate,
  firstAirDate,
  id,
  loading,
  homepage,
}) => {
  const progress = rating * 10;
  let date =
    releaseDate || firstAirDate
      ? new Date(
          `${releaseDate ? releaseDate : firstAirDate}`.replace(/-/g, ',')
        )
          .toDateString()
          .slice(4)
      : '';
  const movieType = movieTitle ? movieTitle : tvTitle;
  const removeSpecialCharacters = movieType
    ? movieType.match(/\w|\s/g)
      ? movieType.match(/\w|\s/g).join('')
      : movieType
    : '';
  const formattedTitle = movieType
    ? removeSpecialCharacters.replace(/\s/g, '-')
    : '';
  return (
    <CSSTransitionGroup
      transitionName='fade'
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}
    >
      <div className='movie-and-tv-card'>
        <Link
          to={`/${
            tvTitle ? 'tv' : 'movies'
          }/${id}-${formattedTitle.toLowerCase()}`}
          className={`movie-and-tv-card-link ${
            loading ? 'image-background' : ''
          }`}
        >
          {!loading ? (
            <LazyLoad className='movie-and-tv-card-img-container' offset={5}>
              <img
                src={src}
                className='movie-and-tv-card-image'
                alt={movieTitle || tvTitle}
              />
            </LazyLoad>
          ) : (
            ''
          )}
        </Link>
        <div className='circular-progressbar'>
          <CircularProgressbar
            value={progress ? progress : 0}
            text={progress ? progress : 'NR'}
            background={true}
            styles={buildStyles({
              pathColor: progress >= 70 ? 'green' : 'yellow',
              strokeLinecap: 'butt',
              textSize: progress > 1 ? '50px' : '40px',
              textColor: 'white',
              backgroundColor: 'black',
            })}
          />
        </div>
        <div className='movie-and-tv-card-body'>
          <div
            className={`movie-and-tv-card-title ${loading ? 'loading' : ''}`}
          >{`${movieType ? movieType : ''}`}</div>
          <div className={`movie-and-tv-card-text ${loading ? 'loading' : ''}`}>
            {date ? date : ''}
          </div>
        </div>
      </div>
    </CSSTransitionGroup>
  );
};

export default MovieCard;
