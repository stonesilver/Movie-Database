import React from 'react';

import './join-us.styles.scss';

import { Container, Row, Col, Button } from 'react-bootstrap';

const JoinUs = () => {
   return (
      <Container fluid className='join-us'>
         <h2>Join Us Today</h2>
         <Row className='join-details'>
            <Col lg={7}>
               <p>
                  Get access to maintain your own
                  <span className='custom-span'>
                     {' '}
                     custom personal list, track what you've seen
                  </span>
                  , search and filter for
                  <span className='custom-span'> what to watch next</span>-
                  regardless if it's in the theatres, on tv or available on
                  popular streaming services like Netflix Amazon Prime Video,
                  Disney Plus , and Now TV.
               </p>
            </Col>
            <Col lg={5}>
               <ul>
                  <li>Enjoy TMDb ad free</li>
                  <li>Maintain a personal watchlist</li>
                  <li>
                     Filter by your subscribed streaming services and find
                     something to watch
                  </li>
                  <li>Log the movies and TV shows you've seen</li>
                  <li>Build custom lists</li>
                  <li>Contribute to and improve our database</li>
               </ul>
            </Col>
         </Row>
         <Row>
            <Col className='d-flex justify-content-center align-items-center'>
               <Button variant='primary'>Sign Up</Button>
            </Col>
         </Row>
      </Container>
   );
};

export default JoinUs;
