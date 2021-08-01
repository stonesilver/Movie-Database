import React from 'react';
import { Link } from 'react-router-dom';
import './nextAndPrevious.styles.scss';

const NextPrevious = ({ previousSeason, nextSeason }) => {
  // console.log(previousSeason, nextSeason);
  return (
    <div className='previous-next-episodes-link'>
      <Link
        to={`/tv/60735-the-flash/seasons/${
          previousSeason ? previousSeason.season_number : ''
        }`}
      >
        <p className='previous-episode'>
          {previousSeason ? (
            <span>
              <span className='fa fa-arrow-left'></span>
              <span>{previousSeason ? previousSeason.name : ''}</span>
            </span>
          ) : (
            ''
          )}
        </p>
      </Link>
      <Link
        to={`/tv/60735-the-flash/seasons/${
          nextSeason ? nextSeason.season_number : ''
        }`}
      >
        <p className='next-episode'>
          {nextSeason ? (
            <span>
              {nextSeason ? nextSeason.name : ''}
              <span className='fa fa-arrow-right'></span>
            </span>
          ) : (
            ''
          )}
        </p>
      </Link>
    </div>
  );
};

export default NextPrevious;
