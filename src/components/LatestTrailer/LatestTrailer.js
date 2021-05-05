import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import TrailerCard from '../TrailerCard/TrailerCard';

class LatestTrailer extends Component {
  constructor() {
    super();
    this.state = {
      trailers: [],
      trailerBackgroundUrl: '/ruxOWt2iCPM4tV2PY3OuYJHt4Do.jpg',
    };
  }

  componentDidMount = () => {
    fetch(
      'https://api.themoviedb.org/3/tv/on_the_air?api_key=ffefcdcfad7ef5063184883831d5c9f2&language=en-US&page=1'
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          trailers: data.results,
          trailerBackgroundUrl: data.results[0].backdrop_path,
        })
      )
      .catch((err) => console.log(err));
  };

  getMouse = (backDropPath) => {
    this.setState({ trailerBackgroundUrl: backDropPath });
  };

  render() {
    const { trailers, trailerBackgroundUrl } = this.state;
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
        <Row className='mx-0'>
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
              <ToggleButton
                type='radio'
                name='radio'
                value='3'
                className='mr-2'
              >
                On TV
              </ToggleButton>
            </ButtonGroup>
          </Col>
        </Row>
        <Row className='mx-0 overflow-auto flex-row flex-nowrap'>
          {trailers.map(
            ({ backdrop_path, id, name }) => (
              <TrailerCard
                src={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
                title={name}
                key={id}
                overview={name}
                getMouseEvent={() => this.getMouse(backdrop_path)}
              />
            )
          )}
        </Row>
      </Container>
    );
  }
}

export default LatestTrailer;
