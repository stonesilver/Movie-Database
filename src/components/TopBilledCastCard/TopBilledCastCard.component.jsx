import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import './TopBilledCastCard.styles.scss';

const TopBilledCastCard = ({
  id,
  name,
  profile_path,
  character,
  roles,
  total_episode_count,
}) => {
  return (
    <Link
      to={`/people/${id}-${(name.match(/\w|\s/g).join('') || name)
        .replace(/\s/g, '-')
        .toLowerCase()}`}
      className='cast-card'
    >
        <LazyLoad className='cast-card-img' height={'100%'} offset={120}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w185${profile_path}`
                : `https://upload.wikimedia.org/wikipedia/commons/3/34/PICA.jpg`
            }
            alt={name}
            className='cast-image'
          />
        </LazyLoad>
      <div className='cast-card-body'>
        <p className='original-name'>{name}</p>
        <p className='cast-name'>
          {character ? character : roles ? roles[0].character : ''}
        </p>
        {total_episode_count ? (
          <p className='total-episode-count'>
            {`${total_episode_count} Episodes`}
          </p>
        ) : (
          ''
        )}
      </div>
    </Link>
  );
};

export default TopBilledCastCard;
