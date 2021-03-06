import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-circular-progressbar/dist/styles.css';
import { useParams } from 'react-router-dom';
import './backdrop-card.styles.scss';

const BackdropCard = ({ file_path, width, height, iso_639_1 }) => {
  const { imageType } = useParams();
  const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
  return (
    <div className='backdropcard-container'>
      <div
        className={`img-container ${
          imageType === 'posters' ? 'poster-size' : ''
        }`}
      >
        <LazyLoadImage
          src={`https://image.tmdb.org/t/p/w342${file_path}`}
          alt='card'
          effect='blur'
        />
      </div>
      <div className='info-and-icon backdropcard-category'>
        <p className='title'>Info</p>
        <span className='fa fa-lock'></span>
      </div>
      <div className='added-by-size-language backdropcard-category'>
        <p className='title'>Added By</p>
        <p className='text'>Fuzzy Dunlop</p>
      </div>
      <div className='added-by-size-language backdropcard-category'>
        <p className='title'>Size</p>
        <p className='text'>
          {`${width}X${height}`} <span className='fas fa-check'></span>
        </p>
      </div>
      <div className='added-by-size-language backdropcard-category'>
        <p className='title'>Language</p>
        <div className='language'>
          <p className='text'>
            {languageNames.of(`${iso_639_1}`) === 'null' ||
            languageNames.of(`${iso_639_1}`) === 'xx'
              ? 'No Language'
              : languageNames.of(`${iso_639_1}`)}
          </p>
          <span className='fas fa-caret-down'></span>
        </div>
      </div>
    </div>
  );
};

export default BackdropCard;
