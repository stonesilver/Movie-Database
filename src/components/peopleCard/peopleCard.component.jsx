import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import './peopleCard.styles.scss';

const PeopleCard = ({ name, src, knownFor, id, height }) => {
  const removeSpecialCharacters = name.match(/\w|\s/g).join('');
  const formattedTitle = removeSpecialCharacters.replace(/\s/g, '-');
  return (
    <Link to={`/people/${id}-${formattedTitle.toLowerCase()}`}>
      <div className='person-card'>
        <LazyLoad className='person-card-img' offset={100}>
          <img src={src} alt={name} className='card-img' />
        </LazyLoad>
        <div className='person-card-body'>
          <p className='person-name'>{name}</p>
          <div className='person-known-for'>
            <p>
              {knownFor.map((movie) =>
                movie.original_title
                  ? `${movie.original_title}, `
                  : `${movie.name}, `
              )}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PeopleCard;
