import React from 'react';
import './searchPagePagination.styles.scss';

const SearchPagePagination = ({ totalPages, fetchPaination, query }) => {
  return totalPages > 1 ? (
    <div className='pagination'>
      <div className='pagination-container'>
        {parseInt(query) - 3 > 0 ? (
          <span data-page={parseInt(query) - 3}
            className={`pagination-span ${
              parseInt(query) - 3 === parseInt(query)
                ? 'pagination-span-active'
                : ''
            }`}
            onClick={(e) => fetchPaination(e, parseInt(query) - 3)}
          >
            {parseInt(query) - 3}
          </span>
        ) : (
          ''
        )}
        {parseInt(query) - 2 > 0 ? (
          <span data-page={parseInt(query) - 2}
            className={`pagination-span ${
              parseInt(query) - 2 === parseInt(query)
                ? 'pagination-span-active'
                : ''
            }`}
            onClick={(e) => fetchPaination(e, parseInt(query) - 2)}
          >
            {parseInt(query) - 2}
          </span>
        ) : (
          ''
        )}
        {parseInt(query) - 1 > 0 ? (
          <span data-page={parseInt(query) - 1}
            className={`pagination-span ${
              parseInt(query) - 1 === parseInt(query)
                ? 'pagination-span-active'
                : ''
            }`}
            onClick={(e) => fetchPaination(e, parseInt(query) - 1)}
          >
            {parseInt(query) - 1}
          </span>
        ) : (
          ''
        )}
        <span data-page={query}
          className={`pagination-span ${
            parseInt(query) ? 'pagination-span-active' : ''
          }`}
          onClick={(e) => fetchPaination(e, parseInt(query))}
        >
          {query}
        </span>
        {parseInt(query) + 1 <= totalPages ? (
          <span data-page={parseInt(query) + 1}
            className={`pagination-span ${
              parseInt(query) + 1 === parseInt(query)
                ? 'pagination-span-active'
                : ''
            }`}
            onClick={(e) => fetchPaination(e, parseInt(query) + 1)}
          >
            {parseInt(query) + 1}
          </span>
        ) : (
          ''
        )}
        {parseInt(query) + 2 <= totalPages ? (
          <span data-page={parseInt(query) + 2}
            className={`pagination-span ${
              parseInt(query) + 2 === parseInt(query)
                ? 'pagination-span-active'
                : ''
            }`}
            onClick={(e) => fetchPaination(e, parseInt(query) + 2)}
          >
            {parseInt(query) + 2}
          </span>
        ) : (
          ''
        )}
        {parseInt(query) + 3 <= totalPages ? (
          <span data-page={parseInt(query) + 3}
            className={`pagination-span ${
              parseInt(query) + 3 === parseInt(query)
                ? 'pagination-span-active'
                : ''
            }`}
            onClick={(e) => fetchPaination(e, parseInt(query) + 3)}
          >
            {parseInt(query) + 3}
          </span>
        ) : (
          ''
        )}

        {/* <span className='pagination-span' onClick={() => fetchPaination('page', 1)}>1</span>
        <span className='pagination-span' onClick={() => fetchPaination('page', 2)}>2</span>
        <span className='pagination-span' onClick={() => fetchPaination('page', 3)}>3</span>
        <span className='pagination-span' onClick={() => fetchPaination('page', 4)}>4</span>
        <span className='pagination-span' onClick={() => fetchPaination('page', 5)}>5</span>
        <span className='pagination-span' onClick={() => fetchPaination('page', 6)}>6</span> */}
      </div>
    </div>
  ) : (
    ''
  );
};

export default SearchPagePagination;
