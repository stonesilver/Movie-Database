import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Link, useLocation } from 'react-router-dom';
import './trailer-card.styles.scss';

const TrailerCard = ({ src, title, overview, getMouseEvent, videoLink }) => {
  const location = useLocation();
  return (
    <div className='trailer-col'>
      <div className='trailer-card'>
        <Link
          to={{
            pathname: `/play/${videoLink}`,
            state: { background: location },
          }}
          className='img-container'
        >
          {src && (
            <LazyLoad offset={120} className='trailer-card-img-lazy'>
              <img
                className='trailer-card-img'
                alt={title}
                src={`https://image.tmdb.org/t/p/w780${src}`}
                onMouseOver={() => getMouseEvent(src)}
              />
            </LazyLoad>
          )}
          <div className='play'></div>
        </Link>
        <div className='trailer-card-body'>
          <div className='trailer-card-title'>{title}</div>
          <div className='trailer-card-text '>{overview}</div>
        </div>
      </div>
    </div>
  );
};

export default TrailerCard;
