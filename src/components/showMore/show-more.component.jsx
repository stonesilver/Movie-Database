import React from 'react';

import './show-more.styles.scss';

const ShowMore = ({ showMorePage, isClicked }) => (
  <div className='show-more' >
    {!isClicked ? (
      <div className='show-more-content' onClick={showMorePage}>Show More</div>
    ) : (
      <div className='show-more-loading'></div>
    )}
  </div>
);

export default ShowMore;