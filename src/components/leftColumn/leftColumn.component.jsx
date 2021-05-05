import React from 'react';
import GenreAndCertification from '../genreAndCertification/genreAndCertification.component';
import './leftColumn.styles.scss';

const LeftColumn = ({
  sortTab,
  filterTab,
  formState,
  tvGenreArray,
  movieGenreArray,
  certificationArray,
  onClickHandler,
  onSubmit,
  onChange,
  genreCertificationOnClick,
  movieType
}) => {
  const { popularitySelectValue, isRelease, fromDate, toDate } = formState;
  const genreType = movieType === 'movie' ? movieGenreArray : tvGenreArray
  return (
    <div className='left-column'>
      <form onSubmit={onSubmit}>
        <div className='sort main'>
          <div className='header' onClick={() => onClickHandler('sort')}>
            <p className='text'>Sort</p>
            <p
              className='icon'
              style={{ transform: sortTab ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              &#10095;
            </p>
          </div>
          <div
            className='hidden-content'
            style={{ display: sortTab ? 'block' : 'none' }}
          >
            <div className='popularity-sort'>
              <label htmlFor='popularity'>Sort Result By</label>
              <select
                id='popularity'
                value={popularitySelectValue}
                onChange={onChange}
                name='popularitySelectValue'
              >
                <option value='popularity.desc'>Popularity Descending</option>
                <option value='popularity.asc'>Popularity Ascending</option>
                <option value='vote_average.desc'>Rating Descending</option>
                <option value='vote_average.asc'>Rating Ascending</option>
                <option value='release_date.desc'>
                  Release Date Descending
                </option>
                <option value='release_date.asc'>Release Date Ascending</option>
                <option value='original_title.desc'>Title (A-Z)</option>
                <option value='original_title.asc'>Title (Z-A)</option>
              </select>
            </div>
          </div>
        </div>
        <div className='filters main'>
          <div className='header' onClick={() => onClickHandler()}>
            <p className='text'>Filters</p>
            <p
              className='icon'
              style={{
                transform: filterTab ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              &#10095;
            </p>
          </div>
          <div
            className='hidden-content'
            style={{ display: filterTab ? 'block' : 'none' }}
          >
            <div className='release-dates'>
              <p className='sub-header'>Release Dates</p>
              <div className='search-all-release'>
                <input
                  type='checkbox'
                  id='release'
                  name='isRelease'
                  checked={isRelease}
                  onChange={onChange}
                />
                <label htmlFor='release'>Search all releases? </label>
              </div>
              <div className='release-date-from'>
                <label htmlFor='from'>from</label>
                <input
                  type='date'
                  id='from'
                  name='fromDate'
                  value={fromDate}
                  onChange={onChange}
                ></input>
              </div>
              <div className='release-date-to'>
                <label htmlFor='to'>to</label>
                <input
                  type='date'
                  id='to'
                  name='toDate'
                  value={toDate}
                  onChange={onChange}
                ></input>
              </div>
            </div>
            <div className='genre-certification'>
              <p className='sub-header'>Genre</p>
              <div className='container'>
                {genreType.map(({ id, name }) => (
                  <GenreAndCertification
                    type={name}
                    key={id}
                    genreCertificationOnClick={genreCertificationOnClick}
                    value={true}
                    dataAttr={id}
                  />
                ))}
              </div>
            </div>
            <div className='genre-certification'>
              <p className='sub-header'>Certification</p>
              <div className='container'>
                {certificationArray.map((certification, index) => (
                  <GenreAndCertification
                    type={certification}
                    key={index}
                    genreCertificationOnClick={genreCertificationOnClick}
                    value={false}
                    dataAttr={certification}
                  />
                ))}
              </div>
            </div>
            <div className='userscore-usersvote-runtime'></div>
          </div>
        </div>
        <div className='where-to-watch main'>
          <div className='header'>
            <p className='text'>Where To Watch</p>
            <p className='icon'>&#10095;</p>
          </div>
        </div>
        <div className='search-button'>
          <input type='submit' value='Search' />
        </div>
      </form>
    </div>
  );
};

export default LeftColumn;
