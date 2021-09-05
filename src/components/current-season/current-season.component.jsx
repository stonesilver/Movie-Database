import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './current-season.styles.scss';

const CurrentSeason = ({ season, match: { url } }) => {
  const newSeason = season[season.length - 1];
  return (
    <div className='current-season'>
      <h5 className='header'>Current Season</h5>
      <div className='season'>
        <div className='img-container'>
            <Link to={`${url}/seasons/${newSeason.season_number}`}>
              <img
                src={
                  newSeason.poster_path
                    ? `https://image.tmdb.org/t/p/w154${newSeason.poster_path}`
                    : `https://www.marinavillakohsamui.com/modules/flexi/images/no-image.jpg`
                }
                alt={newSeason.name}
              />
            </Link>
        </div>
        <div className='season-detail'>
          <Link to={`${url}/seasons/${newSeason.season_number}`}>
            <h5>{newSeason.name}</h5>
          </Link>
          <p className='episodes'>
            <span>
              {newSeason.air_date
                ? new Date(newSeason.air_date).getFullYear()
                : 'Not yet started'}
            </span>{' '}
            | <span>{`${newSeason.episode_count} Episodes`}</span>
          </p>
          <p className='season-overview'>{newSeason.overview}</p>
        </div>
      </div>
      <div className='view-all-seasons'>
        <Link to={`${url}/seasons`}>
          <p className='all-seasons'>View All Seasons</p>
        </Link>
      </div>
      <hr />
    </div>
  );
};

export default withRouter(CurrentSeason);
