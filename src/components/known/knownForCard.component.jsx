import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import './knownForCard.styles.scss';

const KnownForCard = ({ name, title, poster_path, id }) => (
  <div className='known-for-card'>
    <Link
      to={`/${name ? 'tv' : 'movies'}/${id}-${
        title
          ? title.match(/\w|\s/g).join('').replace(/\s/g, '-').toLowerCase()
          : name.match(/\w|\s/g).join('').replace(/\s/g, '-').toLowerCase()
      }`}
      className='known-for-card-link'
    >
      <LazyLoad className='known-for-card-img-container' offset={100}>
        <img
          src={`https://image.tmdb.org/t/p/w185${poster_path}`}
          alt={title ? title : name}
          className='known-for-card-img'
        />
      </LazyLoad>
      <div className='known-for-card-body'>
        <p className='movie-name'>{title ? title : name}</p>
      </div>
    </Link>
  </div>
);

export default KnownForCard;
