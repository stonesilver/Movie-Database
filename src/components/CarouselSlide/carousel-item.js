import React from 'react';

const CarouselSlide = ({ id, title, backdrop_path }) => (
  <a
    href={`/movies/${id}-${title
      .match(/\w|\s/g)
      .join('')
      .replace(/\s/g, '-')
      .toLowerCase()}`}
    key={id}
    className='carousel-link'
  >
    <img
      src={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
      className='coverflow__image'
      alt=''
    />
  </a>
);

export default CarouselSlide;
