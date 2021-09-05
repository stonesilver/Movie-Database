import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-circular-progressbar/dist/styles.css';
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
            <div className='trailer-card-img-lazy'>
              <LazyLoadImage
                className='trailer-card-img'
                alt={title}
                effect='blur'
                src={`https://image.tmdb.org/t/p/w780${src}`}
                onMouseOver={() => getMouseEvent(src)}
              />
            </div>
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
