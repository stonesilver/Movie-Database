import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Link, withRouter } from 'react-router-dom';
import './top-billed-cast.styles.scss';

const TopBilledCast = ({ cast, type, match }) => {
  const filteredCast = cast.filter(
    ({ profile_path }, index) => index <= 9
  );
  return (
    <div className='top-billed-cast'>
      <div className='second-grid-title'>
        <h4 className='top-cast-header'>
          {type.release_date ? 'Top Billed Cast' : 'Series Cast'}
        </h4>
      </div>
      {cast.length ? (
        <div>
          <LazyLoad height={'100%'} offset={120}>
            <div className='cast-card-scroll'>
              {filteredCast.map(
                ({
                  id,
                  name,
                  character,
                  profile_path,
                  roles,
                  total_episode_count,
                }) => (
                  <Link
                    to={`/people/${id}-${(name.match(/\w|\s/g).join('') || name)
                      .replace(/\s/g, '-')
                      .toLowerCase()}`}
                    key={id}
                    className='cast-card'
                  >
                      <div className='cast-card-img'>
                        <LazyLoad height={'100%'} offset={120}>
                          <img
                            src={
                              profile_path
                                ? `https://image.tmdb.org/t/p/w185${profile_path}`
                                : `https://upload.wikimedia.org/wikipedia/commons/3/34/PICA.jpg`
                            }
                            alt={name}
                            className='cast-image'
                          />
                        </LazyLoad>
                      </div>
                      <div className='cast-card-body'>
                        <p className='original-name'>{name}</p>
                        <p className='cast-name'>
                          {character
                            ? character
                            : roles
                            ? roles[0].character
                            : ''}
                        </p>
                        {total_episode_count ? (
                          <p className='total-episode-count'>
                            {`${total_episode_count} Episodes`}
                          </p>
                        ) : (
                          ''
                        )}
                      </div>
                  </Link>
                )
              )}
              {filteredCast.length > 8 ? (
                <div className='view-more'>
                  <Link to={`${match.url}/cast`}>
                    <p className='view-more-text'>
                      View More <i className='fas fa-arrow-right'></i>
                    </p>
                  </Link>
                </div>
              ) : (
                ''
              )}
            </div>
          </LazyLoad>
          <div className='full-cast'>
            <Link to={`${match.url}/cast`}>
              <p>Full Cast & Crew</p>
            </Link>
          </div>
        </div>
      ) : (
        <p style={{ color: 'white' }}>Cast not currently Available</p>
      )}
      <hr />
    </div>
  );
};

export default withRouter(TopBilledCast);
