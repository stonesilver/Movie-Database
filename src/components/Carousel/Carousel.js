import React, { useState, useEffect, Fragment } from 'react';
// import { Carousel, Container, Row, Col } from 'react-bootstrap';
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
      .then((data) => setPosterPath(data.results))
      .catch((err) => console.log(err));
  }, [posterPath.length]);
  console.log('posterPath', posterPath);

  carousel();

  return (
    // <Container fluid className='bg-dark mt-2 carousel'>
    //   <Row>
    //     <Col>
    //       <Carousel>
    //         {posterPath
    //           .filter((poster, index) => poster.backdrop_path && index <= 10)
    //           .map(({ id, backdrop_path, original_title, overview }, i) => (
    //             <Carousel.Item key={id}>
    //               <img
    //                 className='d-block w-100'
    //                 src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
    //                 alt={`poster ${i + 1}`}
    //               />

    //               <Carousel.Caption>
    //                 <h3 className='text-warning'>{original_title}</h3>
    //                 <p className='text-warning carousel-overview'>{overview}</p>
    //               </Carousel.Caption>
    //             </Carousel.Item>
    //           ))}
    //       </Carousel>
    //     </Col>
    //   </Row>
    // </Container>

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
