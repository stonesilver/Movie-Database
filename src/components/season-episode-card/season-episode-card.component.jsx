import React, { useState, useEffect } from 'react';
import CollectionCard from '../collectionCard/collection-card.component';
import { withRouter, Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import { airDateFormat } from '../../assets/airDateFormat';
import './season-episode-card.styles.scss';

const SeasonEpisodeCard = ({
  episode_number,
  vote_average,
  name,
  air_date,
  overview,
  crew,
  guest_stars,
  still_path,
  match: { params, url },
}) => {
  const [year, month, day] = airDateFormat(air_date);
  const [expand, setExpand] = useState(false);
  const [episodeImages, setEpisodeImages] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${params.movieDetail.match(
        /\d{1,}/
      )}/season/${
        params.seasonNumber
      }/episode/${episode_number}/images?api_key=${process.env.REACT_APP_API_URL}`
    )
      .then((res) => res.json())
      .then((data) => setEpisodeImages(data.stills))
      .catch((err) => console.log(err));
  }, [params.movieDetail, params.seasonNumber, episode_number]);

  const expandOnClick = () => {
    setExpand(!expand);
  };
  return (
    <div className='episodes-card'>
      <div className='image-and-details'>
        <div className='img-container'>
          <LazyLoad height={'100%'} offset={120}>
            <img
              src={
                still_path
                  ? `https://image.tmdb.org/t/p/original${still_path}`
                  : `https://www.marinavillakohsamui.com/modules/flexi/images/no-image.jpg`
              }
              alt={name}
            />
          </LazyLoad>
        </div>

        <div className='episode-title-and-air-date'>
          <div className='title'>
            <div className='left'>
              <span className='number-count'>{episode_number}.</span>
              <div className='icon-and-rating'>
                <i className='fas fa-star'></i>
                <span className='rating'>{vote_average}</span>
              </div>{' '}
              <span className='episode-title'>{name}</span>
            </div>
            <p className='air-date'>{`${day} ${month} ${year}`}</p>
          </div>
          <p className='overview'>{overview}</p>
        </div>
      </div>
      <div
        className='expanded-view'
        style={{ display: expand ? 'block' : 'none' }}
      >
        <div className='expanded-view-links'>
          <Link
            to={`${url}/episode/${episode_number}/videos`}
            className='videos view-links'
          >
            <p>Videos</p>
          </Link>
          <Link
            to={`${url}/episode/${episode_number}/images/backdrops`}
            className='Images view-links'
          >
            <p>Images</p>
          </Link>
          <div className='Changes view-links'>
            <p>Changes</p>
          </div>
          <div className='Report view-links'>
            <p>Report</p>
          </div>
        </div>
        <div className='expanded-view-container'>
          <div className='crew'>
            <p className='header'>
              Crew <span className='crew-count'>{crew.length}</span>
            </p>
            <p className='directed-by'>Directed by:</p>
            <p className='written-by'>Written by: No writer has been added.</p>
          </div>
          <div className='guest-stars'>
            <p className='header'>
              <span className='header-text'>Guest Stars</span>
              <span className='count'>{guest_stars.length}</span>
            </p>
            <div className='guest-stars-container'>
              {guest_stars
                ? guest_stars.map(
                    (
                      { id, profile_path, name, character, gender, roles },
                      index
                    ) => (
                      <CollectionCard
                        key={index}
                        type='feature'
                        id={id}
                        name={name}
                        gender={gender}
                        characterName={
                          character
                            ? character
                            : Array.isArray(roles)
                            ? roles[0].character
                            : ''
                        }
                        posterPath={profile_path}
                      />
                    )
                  )
                : ''}
            </div>
          </div>
          <div className='full-cast-and-crew'>
            <Link to={`${url}/episode/${episode_number}/cast`}>
              <p>Full Cast & Crew</p>
            </Link>
          </div>
        </div>
        <div className='episode-images'>
          <div className='episode-images-headers'>
            <div className='episode-images-count'>
              <p className='count'>
                Episode Images{' '}
                <span>{episodeImages.length ? episodeImages.length : ''}</span>
              </p>
            </div>
            <div className='view-all-episode-images'>
              <Link to={`${url}/episode/${episode_number}/images/backdrops`}>
                <p className='view-all'>View All Episode Images</p>
              </Link>
            </div>
          </div>
          <div className='images-container'>
            {episodeImages.map(({ file_path }, index) => (
              <LazyLoad offset={70} className='container' key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${file_path}`}
                  alt={`${index + 1}`}
                  className='images-container-img'
                />
              </LazyLoad>
            ))}
          </div>
        </div>
      </div>
      <div className='expand' onClick={expandOnClick}>
        <p className='expand-text-icon'>
          <span>{expand ? 'See Less' : 'Expand'}</span>
          <span
            className='fas fa-angle-down'
            style={{ transform: expand ? 'rotate(180deg)' : '' }}
          ></span>
        </p>
      </div>
    </div>
  );
};

export default withRouter(SeasonEpisodeCard);
