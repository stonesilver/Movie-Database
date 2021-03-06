import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-circular-progressbar/dist/styles.css';
import { airDateFormat } from '../../assets/airDateFormat';
import './collection-card.styles.scss';

const CollectionCard = ({
  type,
  title,
  releaseDate,
  overview,
  posterPath,
  profile_path,
  name,
  characterName,
  department,
  gender,
  id,
  totalEpisodeCount,
  known_for_department,
  tabSelected,
}) => {
  const [year, month, day] = releaseDate ? airDateFormat(releaseDate) : '';
  const titleOrName = title ? title : name;
  return (
    <div className='collection-cards'>
      {type ? (
        <Link
          to={`/people/${id}-${
            name
              ? name.match(/\w|\s/g).join('').replace(/\s/g, '-').toLowerCase()
              : ''
          }`}
        >
          <div className='featured-collection-card'>
            <div className='collection-card-img'>
                <LazyLoadImage
                  src={
                    posterPath || profile_path
                      ? `https://image.tmdb.org/t/p/w185${posterPath}`
                      : gender === 1
                      ? `https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407_960_720.png`
                      : gender === 0
                      ? `https://icon-library.com/images/no-user-image-icon/no-user-image-icon-25.jpg`
                      : `https://www.flaticon.com/svg/static/icons/svg/18/18148.svg`
                  }
                  alt={name}
                  effect='blur'
                />
            </div>
            <div className='collection-card-body'>
              <p className='name'>{name}</p>
              <p className='character-name'>
                {`${
                  characterName
                    ? characterName
                    : department
                    ? department
                    : known_for_department
                    ? known_for_department
                    : ''
                }`}
                {totalEpisodeCount ? (
                  <span className='episodes'>{`(${totalEpisodeCount} Episodes)`}</span>
                ) : (
                  ''
                )}
              </p>
            </div>
          </div>
        </Link>
      ) : (
        <div className='movie-collection-container'>
          <div className='movie-collection-container-link'>
            <div className='movie-collection-card'>
              <div className='collection-card-img'>
                  <Link
                    to={`/${
                      tabSelected === 'collection'
                        ? 'collection'
                        : name
                        ? 'tv'
                        : 'movies'
                    }/${id}-${
                      titleOrName.match(/\w|\s/g)
                        ? titleOrName
                            .match(/\w|\s/g)
                            .join('')
                            .replace(/\s/g, '-')
                            .toLowerCase()
                        : ''
                    }`}
                  >
                    <LazyLoadImage
                      src={
                        posterPath
                          ? `https://image.tmdb.org/t/p/w154${posterPath}`
                          : `https://www.marinavillakohsamui.com/modules/flexi/images/no-image.jpg`
                      }
                      alt={title}
                      effect='blur'
                    />
                  </Link>
              </div>
              <div className='collection-card-body'>
                <Link
                  to={`/${name ? 'tv' : 'movies'}/${id}-${
                    titleOrName.match(/\w|\s/g)
                      ? titleOrName
                          .match(/\w|\s/g)
                          .join('')
                          .replace(/\s/g, '-')
                          .toLowerCase()
                      : ''
                  }`}
                  className='movie-name'
                >
                  {title}
                </Link>
                <p className='release-date'>
                  {day ? `${day} ${month} ${year}` : ''}
                </p>
                <p className='movie-overview'>
                  {overview && overview.length > 270
                    ? [...overview.slice(0, 270), '.....']
                    : overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionCard;
