import React, { useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  NavDropdown,
} from 'react-bootstrap';
import './navbar.styles.scss';

const NavigationBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const location = useLocation();

  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const appendQuery = (key, value) => {
    let pathname = '/search';
    // returns path: '/app/books'
    let searchParams = new URLSearchParams(location.search);
    // returns the existing query string: '?type=fiction&author=fahid'
    searchParams.set('query', searchValue);
    searchParams.set(key, value);
    history.push({
      pathname: pathname,
      search: searchParams.toString(),
    });
  };

  const onEnterKeyDown = (e, key, value) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
    if (e.keyCode === 13 && searchValue) {
      e.preventDefault();
      appendQuery(key, value);
      // setSearchValue('');
    }
  };

  const onFormSubmit = (e, key, value) => {
    e.preventDefault();
    if (!searchValue) return;
    appendQuery(key, value);
    // setSearchValue('');
  };

  return (
    // bg='dark' variant='dark'
    <Navbar collapseOnSelect expand='lg' variant='dark' className='bg-colour'>
      <LinkContainer to='/'>
        <Navbar.Brand className='text-warning font-weight-bold brandName'>
          Movie Database
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto ml-auto'>
          <NavDropdown title='Movies' id='collasible-nav-dropdown'>
            <NavDropdown.Item as={Link} to='/movies'>
              Popular
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/movies/upcoming'>
              Upcoming
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/movies/now-playing'>
              Now Playing
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/movies/top-rated'>
              Top Rated
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Tv Shows' id='collasible-nav-dropdown'>
            <NavDropdown.Item as={Link} to='/tv'>
              Popular
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/tv/airing-today'>
              Airing Today
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/tv/on-tv'>
              On TV
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/tv/top-rated'>
              Top Rated
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='People' id='collasible-nav-dropdown'>
            <NavDropdown.Item as={Link} to='/people'>
              Popular People
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='More' id='collasible-nav-dropdown'>
            <NavDropdown.Item href='#'>Discussions</NavDropdown.Item>
            <NavDropdown.Item href='#'>Leaderboard</NavDropdown.Item>
            <NavDropdown.Item href='#'>Support</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form>
          <FormControl
            type='text'
            placeholder='Search'
            className='mr-sm-2 form-control'
            value={searchValue}
            onChange={onSearchChange}
            onKeyDown={(e) => onEnterKeyDown(e, 'page', 1)}
          />
          <Button
            variant='outline-light'
            onClick={(e) => onFormSubmit(e, 'page', 1)}
          >
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
