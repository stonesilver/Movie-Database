import React from 'react';
import LazyLoad from 'react-lazy-load';
import './trailer-card.styles.scss';

const TrailerCard = ({ src, title, overview, getMouseEvent }) => {
  return (
    <div className='trailer-col'>
      <div className='trailer-card'>
        <div className='img-container'>
          <LazyLoad offset={120} className='trailer-card-img-lazy'>
              <img
                className='trailer-card-img'
                alt={title}
                src={`https://image.tmdb.org/t/p/w780${src}`}
                onMouseOver={() => getMouseEvent(src)}
              />
          </LazyLoad>
          <div className='play'></div>
        </div>
        <div className='trailer-card-body'>
          <div className='trailer-card-title'>{title}</div>
          <div className='trailer-card-text '>
            {overview}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerCard;
