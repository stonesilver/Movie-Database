import React from 'react';
import Checkbox from '../checkbox/checkbox.component';
import { Link } from 'react-router-dom';
import './personCreditCategory.styles.scss';

const PersonCreditCategory = ({
  year,
  checkboxOnClick,
  stateId,
  dropdwon,
  category,
  showLabel,
}) =>
  year.length ? (
    <div className='person-credits-container'>
      <div className='person-category'>
        <h5 className='person-category-header'>{category}</h5>
        {dropdwon ? (
          <div className='person-category-select'>
            <div className='dropdown-title'>
              All
              <div className='dropdown'>
                <p>Movies</p>
                <p>Tv Show</p>
              </div>
            </div>
            <div className='dropdown-title'>
              Department
              <div className='dropdown'>
                <p>Acting</p>
                <p>Production</p>
                <p>Crew</p>
                <p>Directing</p>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      {year.map((cast, index) => (
        <div className='sectional-year' key={index}>
          {cast.map(
            (
              {
                id,
                title,
                name,
                character,
                job,
                poster_path,
                overview,
                release_date,
                first_air_date,
                vote_average,
              },
              index
            ) => (
              <div className='sectional-year-details' key={index}>
                <div className='year'>
                  <p className='year-content'>
                    {release_date
                      ? new Date(release_date).getFullYear()
                      : first_air_date
                      ? new Date(first_air_date).getFullYear()
                      : '-'}
                  </p>
                </div>
                <Checkbox
                  checkboxOnClick={checkboxOnClick}
                  title={title}
                  id={id}
                  poster_path={poster_path}
                  name={name}
                  character={index}
                  overview={overview}
                  vote_average={vote_average}
                  showLabel={showLabel}
                />

                <div className='movie-and-character'>
                  <p className='movie-and-character-content'>
                    <Link
                      to={`${name ? '/tv' : '/movies'}/${id}-${
                        title || name
                          ? (title || name).match(/\w|\s/g)
                            ? (title || name)
                                .match(/\w|\s/g)
                                .join('')
                                .replace(/\s/g, '-')
                                .toLowerCase()
                            : name || title
                          : name || title
                      }`}
                      key={id}
                      className='movie-link'
                    >
                      {title ? title : name}
                    </Link>
                    <span className='character'>
                      {character
                        ? ` as ${character}`
                        : job
                        ? `  ...${job}`
                        : ''}
                    </span>
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  ) : (
    ''
  );

export default PersonCreditCategory;
