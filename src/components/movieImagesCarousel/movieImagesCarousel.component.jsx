import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../spinner/spinner.component';
import {
  setOpenTab,
  nextImage,
  previousImage,
  imageOnLoad,
} from '../../redux/movie-images/actions';
import { getImage } from '../../redux/movie-images/selector';
import './movieImagesCarousel.styles.scss';

const MovieImagesCarousel = ({
  display,
  changeDisplay,
  images,
  currentImage,
  nextImage,
  previousImage,
  imageOnLoad,
  imgLoaded,
}) => {
  // console.log('images', images);
  const arrow = useRef(null);
  const location = useLocation();
  const locationCheck = /((^|, )(\/movies|\/people|\/tv|\/collection)\/[0-9])/.test(
    location.pathname
  );
  const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
  useEffect(() => {
    arrow.current.focus();
    if (display && !locationCheck) {
      return changeDisplay;
    }
  }, [locationCheck, display, changeDisplay, currentImage]);

  const handleKeyDown = (event) =>
    event.keyCode === 37
      ? previousImage()
      : event.keyCode === 39
      ? nextImage()
      : '';

  return (
    <div
      className='images-carousel'
      style={{
        display: display && locationCheck ? 'flex' : 'none',
      }}
    >
      <div className='container'>
        <div className='image-container'>
          <img
            style={{ display: imgLoaded ? 'block' : 'none' }}
            src={
              images.length
                ? `https://image.tmdb.org/t/p/w500${images[currentImage].file_path}`
                : ''
            }
            onLoad={() => imageOnLoad()}
            alt='one'
          />

          <Spinner imgLoaded={imgLoaded} />
        </div>

        <div className='image-details'>
          <div className='close' onClick={changeDisplay}>
            <p className='close-btn'>&#10005;</p>
          </div>
          <div className='details-container'>
            <div className='info-status'>
              <p className='header'>Info</p>
              <span className='fas fa-lock'></span>
            </div>
            <hr className='hr-line' />
            <div className='primary movie-images-category'>
              <p className='header'>Primary?</p>
              <span className='fas fa-times-circle'></span>
            </div>
            <div className='added-by movie-images-category'>
              <p className='header'>Added By</p>
              <p className='text'>Unknown</p>
            </div>
            <div className='size movie-images-category'>
              <p className='header'>Size</p>
              <p className='text'>
                <span>
                  {images.length ? `${images[currentImage].width} x` : ''}
                </span>
                <span>{images.length ? images[currentImage].height : ''}</span>
              </p>
            </div>
            <div className='language-container movie-images-category'>
              <p className='header'>Language</p>
              <p className='text'>
                {images.length
                  ? images[currentImage].iso_639_1
                    ? languageNames.of(images[currentImage].iso_639_1)
                    : ''
                  : ''}
              </p>
            </div>
            <div className='tagged-people movie-images-category'>
              <p className='text'>Tagged People</p>
              <span className='fas fa-plus'></span>
            </div>
            <div className='records movie-images-category'>
              <p className='text'>No records have been added.</p>
            </div>
            <div
              className='navigation'
              ref={arrow}
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <span
                style={{
                  visibility: currentImage === 0 ? 'hidden' : 'visible',
                }}
                className='fa fa-arrow-left'
                onClick={previousImage}
              ></span>
              <span
                style={{
                  visibility:
                    images.length - 1 === currentImage ? 'hidden' : 'visible',
                }}
                className='fa fa-arrow-right'
                onClick={nextImage}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  display: state.images.openTab,
  images: getImage(state),
  currentImage: state.images.currentImage,
  imgLoaded: state.images.imgLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  changeDisplay: () => dispatch(setOpenTab()),
  nextImage: () => dispatch(nextImage()),
  previousImage: () => dispatch(previousImage()),
  imageOnLoad: () => dispatch(imageOnLoad()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieImagesCarousel);
