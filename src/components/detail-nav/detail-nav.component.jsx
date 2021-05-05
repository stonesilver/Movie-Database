import React from 'react';

import { Nav, NavDropdown } from 'react-bootstrap';

import './movie-detail-nav.styles.scss';

const DetailNav = () => (
  <div className='nav-container'>
    <Nav variant='pills' activeKey='1'>
      <NavDropdown title='Overview' id='nav-dropdown'>
        <NavDropdown.Item eventKey='4.1'>Main</NavDropdown.Item>
        <NavDropdown.Item eventKey='4.2'>Alternative Titles</NavDropdown.Item>
        <NavDropdown.Item eventKey='4.3'>Cast & Crew</NavDropdown.Item>
        <NavDropdown.Item eventKey='4.4'>Release Dates</NavDropdown.Item>
        <NavDropdown.Item eventKey='4.1'>Transitions</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey='4.1'>Changes</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title='Media' id='nav-dropdown'>
        <NavDropdown.Item eventKey='4.1'>Backdrops</NavDropdown.Item>
        <NavDropdown.Item eventKey='4.2'>Posters</NavDropdown.Item>
        <NavDropdown.Item eventKey='4.3'>Videos</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title='Fandom' id='nav-dropdown'>
        <NavDropdown.Item eventKey='4.1'>Discussions</NavDropdown.Item>
        <NavDropdown.Item eventKey='4.2'>Reviews</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title='Share' id='nav-dropdown'>
        <NavDropdown.Item eventKey='4.1'>Share Link</NavDropdown.Item>
        <NavDropdown.Item eventKey='4.2'>Facebook</NavDropdown.Item>
        <NavDropdown.Item eventKey='4.3'>Tweet</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </div>
);

export default DetailNav;
