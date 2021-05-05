import React from 'react';
import './searchPageLeftColumn.styles.scss';

const SearchPageLeftColumn = ({
  movie,
  tv,
  people,
  company,
  keyword,
  collection,
  network,
  setSearchResultOnDisplayOnClick,
  tabSelected,
}) => (
  <div className='search-page-left-column'>
    <div className='search-page-left-column-container'>
      <div className='header-and-icon'>
        <p className='header'>search Results</p>
        <span className='far fa-question-circle'></span>
      </div>
      <div className='search-page-language'>
        <div
          className={`search-language-tab ${
            tabSelected === 'tv' ? 'selected-language' : ''
          }`}
          onClick={() => setSearchResultOnDisplayOnClick(tv ? tv : [], 'tv')}
        >
          <span>TV Shows</span>
          <span className='count'>
            {tv.total_results ? tv.total_results.toLocaleString() : 0}
          </span>
        </div>
        <div
          className={`search-language-tab ${
            tabSelected === 'movie' ? 'selected-language' : ''
          }`}
          onClick={() =>
            setSearchResultOnDisplayOnClick(movie ? movie : [], 'movie')
          }
        >
          <span>Movies</span>
          <span className='count'>
            {movie.total_results ? movie.total_results.toLocaleString() : 0}
          </span>
        </div>
        <div
          className={`search-language-tab ${
            tabSelected === 'people' ? 'selected-language' : ''
          }`}
          onClick={() =>
            setSearchResultOnDisplayOnClick(people ? people : [], 'people')
          }
        >
          <span>People</span>
          <span className='count'>
            {people.total_results ? people.total_results.toLocaleString() : 0}
          </span>
        </div>
        <div
          className={`search-language-tab ${
            tabSelected === 'company' ? 'selected-language' : ''
          }`}
          onClick={() =>
            setSearchResultOnDisplayOnClick(company ? company : [], 'company')
          }
        >
          <span>Companies</span>
          <span className='count'>
            {company.total_results ? company.total_results.toLocaleString() : 0}
          </span>
        </div>
        <div
          className={`search-language-tab ${
            tabSelected === 'keyword' ? 'selected-language' : ''
          }`}
          onClick={() =>
            setSearchResultOnDisplayOnClick(keyword ? keyword : [], 'keyword')
          }
        >
          <span>Keywords</span>
          <span className='count'>
            {keyword.total_results ? keyword.total_results.toLocaleString() : 0}
          </span>
        </div>
        <div
          className={`search-language-tab ${
            tabSelected === 'collection' ? 'selected-language' : ''
          }`}
          onClick={() =>
            setSearchResultOnDisplayOnClick(
              collection ? collection : [],
              'collection'
            )
          }
        >
          <span>Collections</span>
          <span className='count'>
            {collection.total_results
              ? collection.total_results.toLocaleString()
              : 0}
          </span>
        </div>
        <div
          className={`search-language-tab ${
            tabSelected === 'network' ? 'selected-language' : ''
          }`}
          onClick={() =>
            setSearchResultOnDisplayOnClick(network ? network : [], 'network')
          }
        >
          <span>Networks</span>
          <span className='count'>
            {network.total_results ? network.total_results.toLocaleString() : 0}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default SearchPageLeftColumn;
