import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  NavDropdown,
} from 'react-bootstrap';
import './navbar.styles.scss';
import { Link } from 'react-router-dom';

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
      search: searchParams.toString()
    });
  }

  const onEnterKeyDown = (e, key, value) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
    if (e.keyCode === 13 && searchValue) {
      e.preventDefault();
      // history.push(`/search?query=${searchValue}`);
      appendQuery(key, value)
      // setSearchValue('');
    }
  };

  const onFormSubmit = (e, key, value) => {
    e.preventDefault();
    if (!searchValue) return;
    appendQuery(key, value)
    // setSearchValue('');
  };


  return (
    // bg='dark' variant='dark'
    <Navbar collapseOnSelect expand='md' variant='dark' className='bg-colour'>
      <Link to='/'>
        <Navbar.Brand className='text-warning font-weight-bold'>
          Movie Database
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto ml-auto'>
          <NavDropdown title='Movies' id='collasible-nav-dropdown'>
            <NavDropdown.Item href='/movies'>Popular</NavDropdown.Item>
            <NavDropdown.Item href='/movies/upcoming'>
              Upcoming
            </NavDropdown.Item>
            <NavDropdown.Item href='/movies/now-playing'>
              Now Playing
            </NavDropdown.Item>
            <NavDropdown.Item href='/movies/top-rated'>
              Top Rated
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Tv Shows' id='collasible-nav-dropdown'>
            <NavDropdown.Item href='/tv'>Popular</NavDropdown.Item>
            <NavDropdown.Item href='/tv/airing-today'>
              Airing Today
            </NavDropdown.Item>
            <NavDropdown.Item href='/tv/on-tv'>On TV</NavDropdown.Item>
            <NavDropdown.Item href='/tv/top-rated'>Top Rated</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='People' id='collasible-nav-dropdown'>
            <NavDropdown.Item href='/people'>Popular People</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='More' id='collasible-nav-dropdown'>
            <NavDropdown.Item href='action-10'>Discussions</NavDropdown.Item>
            <NavDropdown.Item href='action-11'>Leaderboard</NavDropdown.Item>
            <NavDropdown.Item href='action-12'>Support</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl
            type='text'
            placeholder='Search'
            className='mr-sm-2 form-control'
            value={searchValue}
            onChange={onSearchChange}
            onKeyDown={(e) => onEnterKeyDown(e, 'page', 1)}
          />
          <Button variant='outline-light' onClick={(e) => onFormSubmit(e, 'page', 1)}>
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
