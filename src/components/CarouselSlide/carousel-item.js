import React from 'react';
// import { Carousel } from 'react-bootstrap';

const CarouselSlide = ({ id, title, backdrop_path }) => (
  // <Carousel.Item>
  //    <img className='d-block w-100' src={src} alt={alt} />
  //    <Carousel.Caption>
  //       <h3 className='text-primary'>{title}</h3>
  //       <p className='text-primary'>{overview}</p>
  //    </Carousel.Caption>
  // </Carousel.Item>

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
