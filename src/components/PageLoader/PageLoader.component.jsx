import React from 'react';

import './pageLoader.styles.scss';

const PageLoader = ({ isLoading, hideInternetNotActive, refetchData }) => (
  <div className='blanket-element'>
    <section style={{ display: isLoading ? 'flex' : 'none' }}>
      <span className='loader'></span>
    </section>
    <div style={{ display: !isLoading && !hideInternetNotActive ? 'flex' : 'none' }}>
      <span className='error'>Internet Not Active</span>
      <button className='refresh' onClick={() => refetchData()}>Refresh</button>
      {/* <button className='refresh' onClick={() => window.location.reload()}>Refresh</button> */}
    </div>
  </div>
);

export default PageLoader;
