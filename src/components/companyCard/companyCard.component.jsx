import React from 'react';
import './companyCard.styles.scss';

const CompanyCard = ({ logo_path, name, origin_country }) => (
  <div className='company-card'>
    {logo_path ? (
      <span className='img-container'>
        <img src={`https://image.tmdb.org/t/p/w154${logo_path}`} alt={name} />
        {origin_country ? <span className='origin-country'>US</span> : ''}
      </span>
    ) : (
      <span className='company-name'>
        {name}{' '}
        {origin_country ? <span className='origin-country'>
          {origin_country}
        </span> : ''}
      </span>
    )}
  </div>
);

export default CompanyCard;
