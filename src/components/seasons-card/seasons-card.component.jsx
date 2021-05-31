import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { airDateFormat } from '../../assets/airDateFormat';
import './seasons-card.styles.scss';

const SeasonsCard = ({
  seasonDetail: {
    air_date,
    episode_count,
    name,
    overview,
    poster_path,
    season_number,
  },
  originalName,
  match: { url },
}) => {
  const [year, month, day] = airDateFormat(air_date);
  return (
    <div className='season-details'>
      <div className='season-card'>
        <Link to={`${url}/${season_number}`} className='image-container'>
          <img
            src={`https://image.tmdb.org/t/p/w154${poster_path}`}
            alt={name}
            className='img'
          />
        </Link>
        <div className='season-body'>
          <div className='title'>
            <Link to={`${url}/${season_number}`}>
              <h3 className='season-number'>{name}</h3>
            </Link>

            <span className='season-year'>
              {new Date(air_date).getFullYear()}
            </span>
            <span>|</span>
            <span className='season-episodes'>{`${episode_count} Episodes`}</span>
          </div>
          <div className='season-premiered'>
            <p className='premiered-details'>
              <span>{name}</span> of <span>{originalName}</span> premiered on{' '}
              <span>{`${day} ${month} ${year} `}</span>
            </p>
          </div>
          <div className='overview'>
            <p className='overview-details'>{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SeasonsCard);
