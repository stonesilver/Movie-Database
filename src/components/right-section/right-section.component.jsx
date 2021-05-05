import React from 'react';
import SocialMediaHandles from '../socialMediaHandles/socialMediaHandles.component';
import './right-section.styles.scss';

const RightSection = ({
  status,
  budget,
  revenue,
  keywords,
  original_language,
  network,
  type,
  backgroundColor,
  externalID,
}) => {
  const {facebook_id, twitter_id, instagram_id} = externalID
  return (
  <div className='right-section-container'>
    <SocialMediaHandles
      facebook_id={facebook_id}
      twitter_id={twitter_id}
      instagram_id={instagram_id}
      homepage={''}
    />
    <div className='right-section-details'>
    {status ? (
      <div className='release-status container'>
        <p className='status header'>Status</p>
        <p className='released value'>{status}</p>
      </div>
    ) : (
      ''
    )}

    {network && network.length ? (
      <div className='network container'>
        <p className='header'>Network</p>
        <div className='network-img'>
          <img
            src={`https://image.tmdb.org/t/p/w92${network[0].logo_path}`}
            alt=''
          />
        </div>
      </div>
    ) : (
      ''
    )}

    {type ? (
      <div className='type container'>
        <p className='header'>Type</p>
        <p className='value'>{type}</p>
      </div>
    ) : (
      ''
    )}

    {original_language ? (
      <div className='original-language container'>
        <p className='header'>Original Language</p>
        <p className='language value'>
          {original_language === 'en' ? 'English' : 'Other Languages'}
        </p>
      </div>
    ) : (
      ''
    )}

    {budget ? (
      <div className='budget-details container'>
        <p className='budget header'>Budget</p>
        <p className='budget-amount value'>
          {budget ? `$${budget.toLocaleString()}` : '-'}
        </p>
      </div>
    ) : (
      ''
    )}

    {revenue ? (
      <div className='revenue-details container'>
        <p className='revenue header'>Revenue</p>
        <p className='revenue-amount value'>
          {revenue ? `$${revenue.toLocaleString()}` : '-'}
        </p>
      </div>
    ) : (
      ''
    )}

    {keywords.length ? (
      <div className='keywords'>
        <div className='keyword-title'>
          <p>Keywords</p>
        </div>
        <div className='keywords-flexed'>
          {keywords
            ? keywords.map(({ id, name }) => (
                <div
                  className='keyword'
                  key={id}
                  style={{
                    backgroundColor: backgroundColor[0],
                    border: `1px solid ${backgroundColor}`,
                  }}
                >
                  <p style={{ color: backgroundColor[2] }}>{name}</p>
                </div>
              ))
            : ''}
        </div>
      </div>
    ) : (
      ''
    )}
    </div>

    <div className='content-score'>
      <div className='content-score-title'>
        <p>Content Score</p>
      </div>
      <div className='score'>
        <p
          className='score-digit'
          style={{
            backgroundColor: backgroundColor,
            border: `1px solid ${backgroundColor}`,
          }}
        >
          100
        </p>
        <p className='score-text'>Yes! Looking good!</p>
      </div>
    </div>
  </div>
)};

export default RightSection;
