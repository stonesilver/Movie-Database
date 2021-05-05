import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './videoCard.styles.scss';

const VideoCard = ({ videoKey, name, type, match }) => (
  <div className='video-card'>
    <div className='image-container'>
      <Link to={`${match.url}${`/play/${videoKey}`}`}>
        <div className='play-icon'>
          <div className='play-container'>
            <span className='play'></span>
          </div>
        </div>
      </Link>
      <img
        src={`https://img.youtube.com/vi/${videoKey}/mqdefault.jpg`}
        alt='warner'
        className='video-card-img'
      />
    </div>
    <div className='video-details'>
      <div className='top'>
        <p className='video-title'>{name}</p>
        <p className='details'>
          <span className='type'>{type}</span>
          <span className='date'>8 December 2019</span>
        </p>
      </div>
      <div className='bottom'>
        <p className='details'>
          <span className='fab fa-youtube'></span>
          <span className='provider'>Warner Bros Pictures</span>
          <span className='far fa-check-circle'></span>
        </p>
      </div>
    </div>
  </div>
);

export default withRouter(VideoCard);
