import React from 'react';

import './blanket-element.styles.scss';

const BlanketElement = ({ isLoading, hideInternetNotActive }) => (
  <div className='blanket-element'>
    <section style={{ display: isLoading ? 'flex' : 'none' }}>
      <span className='loader'></span>
    </section>
    <div style={{ display: !isLoading && !hideInternetNotActive ? 'flex' : 'none' }}>
      <span className='error'>Internet Not Active</span>
      <button className='refresh' onClick={() => window.location.reload()}>Refresh</button>
    </div>
  </div>
);

export default BlanketElement;
