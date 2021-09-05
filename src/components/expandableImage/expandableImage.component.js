import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setOpenTab } from '../../redux/movie-images/actions';
import { useLocation } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import fetchImages from '../../redux/movie-images/fetchImages';
import './expandableImage.styles.scss';

const ExpandableImage = ({
  posterPath,
  showImages,
  fetchImages,
  stream,
  backgroundColor,
  title,
}) => {
  const location = useLocation();
  const url = `https://api.themoviedb.org/3/${
    /tv/.test(location.pathname)
      ? 'tv'
      : /collection/.test(location.pathname)
      ? 'collection'
      : /people/.test(location.pathname)
      ? 'person'
      : 'movie'
  }/${location.pathname
    .match(/\d{1,}/)
    .join('')}/images?api_key=${process.env.REACT_APP_API_URL}`;
  return (
    <div className='left-container'>
      <div
        className='image-container'
        onClick={async () => {
          await showImages();
          await fetchImages(url);
        }}
      >
        <div height={'100%'} offset={120} className='image-container2'>
          <img
            src={
              posterPath
                ? `https://image.tmdb.org/t/p/w342${posterPath}`
                : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`
            }
            alt={title}
            className='movie-image'
          />
        </div>
        <div className='expand'>
          <div className='expand-content'>
            <p className='expand-text'>
              <i className='fas fa-expand-arrows-alt'></i> Expand
            </p>
          </div>
        </div>
      </div>
      {stream ? (
        <div
          className='now-streaming'
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          <p className='streaming-text'>Watch Now</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchImages: fetchImages,
      showImages: setOpenTab,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(withRouter(ExpandableImage));
