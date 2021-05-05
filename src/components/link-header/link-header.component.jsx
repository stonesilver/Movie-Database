import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getImageColors } from '../../assets/Clarifai';
import './link-header.styles.scss';

const LinkHeader = ({
  movieData: {
    title,
    name,
    release_date,
    first_air_date,
    air_date,
    poster_path,
    still_path,
  },
  match: { url, params },
  backLink,
  linkText,
}) => {
  const [backgroundColor, setBackgroundColor] = useState([]);
  const path = poster_path || still_path;
  useEffect(() => {
    (async () => {
      return setBackgroundColor(
        await getImageColors(`https://image.tmdb.org/t/p/w1280${path}`)
      );
    })();
  }, [path]);
  console.log('backgroundColor', backgroundColor);
  console.log('kjkjkjkjkjkjkjkjkjkjkj', backLink);
  return (
    <div
      className='cast-header'
      style={{
        background: `linear-gradient(${backgroundColor[1]}, ${backgroundColor[1]})`,
      }}
    >
      <div className='container'>
        <div className='img-container'>
          <Link to={`${url.replace(backLink, '')}`} className='link'>
            <img
              src={`https://image.tmdb.org/t/p/w154${
                poster_path || still_path
              }`}
              alt={title ? title : name}
            />
          </Link>
        </div>
        <div className='title-and-link'>
          <p className='title'>
            {params.episodeNumber ? (
              <span className='season-x-episode'>{`${params.seasonNumber}X${params.episodeNumber}`}</span>
            ) : (
              ''
            )}
            <Link to={`${url.replace(backLink, '')}`}>
              <span className='title-text'>{title ? title : name}</span>
              <span className='release-date'>
                {release_date
                  ? `(${new Date(release_date).getFullYear()})`
                  : first_air_date
                  ? `(${new Date(first_air_date).getFullYear()})`
                  : `(${new Date(air_date).getFullYear()})`}
              </span>
            </Link>
          </p>
          <Link to={`${url.replace(backLink, '')}`}>
            <p className='link'>
              <span className='fas fa-arrow-left'></span>
              {`Back to ${linkText}`}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LinkHeader);
