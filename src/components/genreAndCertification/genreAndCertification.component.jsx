import React from 'react';
import './genreAndCertification.styles.scss';

const GenreAndCertification = ({ type, genreCertificationOnClick, value, dataAttr }) => {
  return (
    <div
      className='category'
      //   style={{
      //     backgroundColor: backgroundAndColor ? '#ffffff' : '',
      //     color: backgroundAndColor ? '#000000' : '',
      //   }}
      onClick={(e) => genreCertificationOnClick(e, value)}
      data-name={dataAttr}
    >
      {type}
    </div>
  );
};

export default GenreAndCertification;
