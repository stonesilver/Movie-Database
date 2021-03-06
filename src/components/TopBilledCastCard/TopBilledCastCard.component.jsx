import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-circular-progressbar/dist/styles.css';
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
        <div className='cast-card-img'  offset={120}>
          <LazyLoadImage
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w185${profile_path}`
                : `https://upload.wikimedia.org/wikipedia/commons/3/34/PICA.jpg`
            }
            alt={name}
            className='cast-image'
            effect='blur'
          />
        </div>
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
