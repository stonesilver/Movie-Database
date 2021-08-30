import React from 'react';
import './socialMediaHandles.styles.scss';

const SocialMediaHandles = ({ facebook_id, twitter_id, instagram_id, homepage, center }) => (
  <div className={`social-media-handles ${center ? 'center' : ''}`}>
    {facebook_id ? (
      <a
        href={`https://facebook.com/${facebook_id}`}
        target='_blank'
        rel='noreferrer noopener'
      >
        <span className='fab fa-facebook-square'></span>
      </a>
    ) : (
      ''
    )}
    {twitter_id ? (
      <a
        href={`https://twitter.com/${twitter_id}`}
        target='_blank'
        rel='noreferrer noopener'
      >
        <span className='fab fa-twitter'></span>
      </a>
    ) : (
      ''
    )}
    {instagram_id ? (
      <a
        href={`https://instagram.com/${instagram_id}`}
        target='_blank'
        rel='noreferrer noopener'
      >
        <span className='fab fa-instagram'></span>
      </a>
    ) : (
      ''
    )}
    {homepage ? (
      <a href={`https://google.com`} target='_blank' rel='noreferrer noopener'>
        <span className='fas fa-link'></span>
      </a>
    ) : (
      ''
    )}
  </div>
);

export default SocialMediaHandles;
