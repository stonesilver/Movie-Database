import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import HomepageCategoryLink from '../homepageCategoryLinks/homepageCategoryLinks.component';
import TrailerCard from '../TrailerCard/TrailerCard';
import './LatestTrailer.styles.scss';

const LatestTrailer = () => {
  const [trailers, setTrailers] = useState([]);
  const [trailerBackgroundUrl, setTrailerBackgroundUrl] = useState(
    '/ruxOWt2iCPM4tV2PY3OuYJHt4Do.jpg'
  );
  const categoryName = 'Lastest Trailer';
  const selectFirst = 'Streaming';
  const [side, setSide] = useState({
    [categoryName]: selectFirst,
  });
  const categoryArray = [
    {
      name: 'Streaming',
      categoryLink: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_URL}&language=en-US&page=1`,
    },
    {
      name: 'In Theater',
      categoryLink: `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_URL}`,
    },
    {
      name: 'On TV',
      categoryLink: `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_URL}`,
    },
  ];

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_URL}&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setTrailers(data.results);
        setTrailerBackgroundUrl(data.results[0].backdrop_path);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleStreamChange = (url, name) => {
    setSide({ [categoryName]: name });
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTrailers(data.results))
      .catch((err) => console.log(err));
    return setTrailers([]);
  };

  const getMouse = (backDropPath) => {
    setTrailerBackgroundUrl(backDropPath);
  };
  return (
    <Container
      fluid
      className='mt-3 p-2 latest-trailer'
      style={{
        backgroundImage: `linear-gradient(rgba(39, 39, 41, 0.8), rgba(36, 36, 39, 0.8)),
          url("https://image.tmdb.org/t/p/w780${trailerBackgroundUrl}")`,
        backgroundSize: 'cover',
      }}
    >
      <HomepageCategoryLink
        categoryArray={categoryArray}
        side={side}
        setSide={setSide}
        categoryName={categoryName}
        handleStreamChange={handleStreamChange}
      />
      {/* <Row className='mx-0'>
        <Col sm=''>
          <h3 className='text-white ml-2 d-flex'>Latest Trailers</h3>
        </Col>
        
        <Col className='d-flex justify-content-end px-0'>
          <ButtonGroup toggle>
            <ToggleButton
              type='radio'
              name='radio'
              defaultChecked
              value='1'
              className='mr-2'
            >
              Streaming
            </ToggleButton>
            <ToggleButton
              type='radio'
              name='radio'
              value='2'
              className='rounded-top mr-2'
            >
              In Theater
            </ToggleButton>
            <ToggleButton type='radio' name='radio' value='3' className='mr-2'>
              On TV
            </ToggleButton>
          </ButtonGroup>
        </Col>
      </Row> */}
      <Row className='mx-0 overflow-auto flex-row flex-nowrap'>
        {trailers.map(({ backdrop_path, id, name }) => (
          <TrailerCard
            src={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
            title={name}
            key={id}
            overview={name}
            getMouseEvent={() => getMouse(backdrop_path)}
          />
        ))}
      </Row>
    </Container>
  );
};

export default LatestTrailer;
