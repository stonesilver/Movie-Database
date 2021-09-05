import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-circular-progressbar/dist/styles.css';
import './peopleCard.styles.scss';

const PeopleCard = ({ name, src, knownFor, id, height }) => {
  const removeSpecialCharacters = name.match(/\w|\s/g).join('');
  const formattedTitle = removeSpecialCharacters.replace(/\s/g, '-');
  return (
    <Link to={`/people/${id}-${formattedTitle.toLowerCase()}`}>
      <div className='person-card'>
        <div className='person-card-img' offset={100}>
          <LazyLoadImage
            src={src}
            alt={name}
            className='card-img'
            effect='blur'
          />
        </div>
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
