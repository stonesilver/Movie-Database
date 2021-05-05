import React from 'react';

import './spinner.styles.scss';

const Spinner = ({imgLoaded}) => (
  <div
    className='spinner'
    style={{ position: !imgLoaded ? 'absolute' : 'relative' }}
  >
    <div className='lds-spinner'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Spinner;
