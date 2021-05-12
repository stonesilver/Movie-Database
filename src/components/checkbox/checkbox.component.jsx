import React from 'react';
import { Link } from 'react-router-dom';
import './checkbox.styles.scss';

const Checkbox = ({
  checkboxOnClick,
  title,
  id,
  poster_path,
  name,
  overview,
  showLabel,
  vote_average,
  character,
}) => (
  <div className='checkbox'>
    <input
      type='radio'
      onChange={(e) => checkboxOnClick(e)}
      value={[title || name, character]}
      name='radio'
    />
    {(showLabel.title === title || showLabel.title === name) && showLabel.character === character ? (
      <div className='checkbox-movie-detail'>
        <Link
          to={`${name ? '/tv' : '/movies'}/${id}-${
            title
              ? title.match(/\w|\s/g).join('').replace(/\s/g, '-').toLowerCase()
              : name.match(/\w|\s/g).join('').replace(/\s/g, '-').toLowerCase()
          }`}
          className='checkbox-movie-detail-img-container movie-link'
        >
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w154${poster_path}`
                : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`
            }
            alt={name || title}
          />
        </Link>
        <div className='checkbox-movie-detail-container'>
          <div className='checkbox-movie-detail-header-and-ratings'>
            <Link
              to={`${name ? '/tv' : '/movies'}/${id}-${
                title
                  ? title
                      .match(/\w|\s/g)
                      .join('')
                      .replace(/\s/g, '-')
                      .toLowerCase()
                  : name
                      .match(/\w|\s/g)
                      .join('')
                      .replace(/\s/g, '-')
                      .toLowerCase()
              }`}
              className='checkbox-movie-detail-header movie-link'
            >
              {name || title}
            </Link>
            <span className='checkbox-movie-detail-rating'>
              <span className='score'>
                {vote_average !== 0 ? vote_average : '0.0'}
              </span>
              <span className='fas fa-star'></span>
            </span>
          </div>
          <div className='checkbox-movie-detail-overview'>
            <p className='overview-text'>
              {overview.length > 120
                ? `${overview.slice(0, 120)}...`
                : overview}
            </p>
          </div>
        </div>
      </div>
    ) : (
      ''
    )}
  </div>
);

export default Checkbox;
