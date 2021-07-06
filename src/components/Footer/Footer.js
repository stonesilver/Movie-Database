import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.styles.scss';

const Footer = () => {
   return (
      <Container fluid className='footer'>
         <Row className='footer-row'>
            <Col className='footer-column'>
               <h5 className='column-header'>THE BASICS</h5>
               <div>
                  <p className='footer-paragraph'>About MDB</p>
               </div>
               <div>
                  <p className='footer-paragraph'>Contact Us</p>
               </div>
               <div>
                  <p className='footer-paragraph'>Support Forums</p>
               </div>
               <div>
                  <p className='footer-paragraph'>API</p>
               </div>
               <div>
                  <p className='footer-paragraph'>System Status</p>
               </div>
            </Col>
            <Col className='footer-column'>
               <h5 className='column-header'>GET INVOLVED</h5>
               <div>
                  <p className='footer-paragraph'> Contribution</p>
               </div>
               <div>
                  <p className='footer-paragraph'>3rd party Application</p>
               </div>
               <div>
                  <p className='footer-paragraph'>Add New Movie</p>
               </div>
               <div>
                  <p className='footer-paragraph'>Add New TV Show</p>
               </div>
            </Col>
            <Col className='footer-column'>
               <h5 className='column-header'>COMMUNITY</h5>
               <div>
                  <p className='footer-paragraph'>Guidelines</p>
               </div>
               <div>
                  <p className='footer-paragraph'>Discussions</p>
               </div>
               <div>
                  <p className='footer-paragraph'>Leaderboard</p>
               </div>
            </Col>
            <Col className='footer-column'>
               <h5 className='column-header'>LEGAL</h5>
               <div>
                  <p className='footer-paragraph'>Terms of Use</p>
               </div>
               <div>
                  <p className='footer-paragraph'>API Terms of Use</p>
               </div>
               <div>
                  <p className='footer-paragraph'>Privacy Policy</p>
               </div>
            </Col>
         </Row>
      </Container>
   );
};

export default Footer;
