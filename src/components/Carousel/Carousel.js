import React, { useState, useEffect, Fragment } from 'react';
import { carousel } from '../../assets/carousel';
import CarouselSlide from '../CarouselSlide/carousel-item';
import './carousel.styles.scss';

const CarouselDisplay = () => {
  const [posterPath, setPosterPath] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_URL}&region=US&page=1&primary_release_date.gte=2021-01-01&primary_release_date.lte=2021-05-01`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosterPath(data.results);
        carousel();
      })
      .catch((err) => console.log(err));
  }, [posterPath.length]);
  console.log({ posterPath });

  return (
    <section className='body-container'>
      <div className='nine columns'>
        <div className='coverflow top10 bot10'>
          <span className='prev-arrow'></span>
          <Fragment>
            {posterPath
              .filter((poster, index) => poster.backdrop_path && index <= 9)
              .map(({ id, backdrop_path, title }) => (
                <CarouselSlide
                  id={id}
                  key={id}
                  title={title}
                  backdrop_path={backdrop_path}
                />
              ))}
          </Fragment>
          <span className='next-arrow'></span>
        </div>
      </div>
    </section>
  );
};

export default CarouselDisplay;
