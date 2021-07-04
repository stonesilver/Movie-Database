import React from 'react';
import './youtube.styles.scss';

const YoutubeIframe = ({ history, match }) => {
  const closeModal = () => {
    history.goBack();
  };
  return (
    <div className='youtube-iframe'>
      <div className='frame-container'>
        <span onClick={() => closeModal()}>
          &times;
        </span>
        <iframe
          width='100%'
          height='100%'
          src={`https://www.youtube.com/embed/${match.params.youtubeID}`}
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title='iframe'
        ></iframe>
      </div>
    </div>
  );
};

export default YoutubeIframe;
