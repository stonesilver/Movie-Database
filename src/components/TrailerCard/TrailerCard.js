import React from 'react';
import { Col, Card } from 'react-bootstrap';
import LazyLoad from 'react-lazy-load';
import './trailer-card.styles.scss';

const TrailerCard = ({ src, title, overview, getMouseEvent }) => {
  return (
    <Col className='trailer-col'>
      <Card className='trailer-card'>
        <div className='img-container'>
          <LazyLoad
            height={'100%'}
            offset={700}
            className='trailer-card-img-lazy'
          >
            <Card.Img
              className='trailer-card-img'
              variant='top'
              src={src}
              onMouseOver={getMouseEvent}
            />
          </LazyLoad>
          <div className='play'></div>
        </div>
        <Card.Body className='trailer-card-body'>
          <Card.Title className='trailer-card-title'>{title}</Card.Title>
          <Card.Text className='trailer-card-text text-justify rounded'>
            {overview}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TrailerCard;
