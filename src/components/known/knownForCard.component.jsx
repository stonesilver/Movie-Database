import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-circular-progressbar/dist/styles.css';
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
      <div className='known-for-card-img-container' offset={100}>
        <LazyLoadImage
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w780${poster_path}`
              : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`
          }
          alt={title ? title : name}
          className='known-for-card-img'
          effect='blur'
        />
      </div>
      <div className='known-for-card-body'>
        <p className='movie-name'>{title ? title : name}</p>
      </div>
    </Link>
  </div>
);

export default KnownForCard;
