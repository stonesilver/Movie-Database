import React from 'react';
import TopBilledCastCard from '../TopBilledCastCard/TopBilledCastCard.component';
import { Link, withRouter } from 'react-router-dom';
import './top-billed-cast.styles.scss';

const TopBilledCast = ({ cast, type, match }) => {
  const filteredCast = cast.filter(({ profile_path }, index) => index <= 9);
  return (
    <div className='top-billed-cast'>
      <div className='second-grid-title'>
        <h4 className='top-cast-header'>
          {type.release_date ? 'Top Billed Cast' : 'Series Cast'}
        </h4>
      </div>
      {cast.length ? (
        <div>
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
                <TopBilledCastCard
                  key={id}
                  id={id}
                  name={name}
                  roles={roles}
                  character={character}
                  profile_path={profile_path}
                  total_episode_count={total_episode_count}
                />
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
          <div className='full-cast'>
            <Link to={`${match.url}/cast`}>
              <p>Full Cast & Crew</p>
            </Link>
          </div>
        </div>
      ) : (
        <p style={{ color: 'white', fontSize: '0.75rem' }}>
          Cast not currently Available
        </p>
      )}
      <hr />
    </div>
  );
};

export default withRouter(TopBilledCast);
