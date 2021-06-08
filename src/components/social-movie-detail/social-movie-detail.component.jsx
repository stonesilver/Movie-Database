import React, { useState } from 'react';
import Image from '../../card-img.jpg';
import './social-movie-detail.styles.scss';

const Social = ({ reviews, movieData }) => {
  const [socialTab, setSocialTab] = useState('review');

  const reviewOnClick = () => {
    setSocialTab('review');
  };

  const discussionOnClick = () => {
    setSocialTab('discussion');
  };

  const random = parseInt(Math.random() * reviews.length);
  return (
    <div className='social'>
      <div className='third-grid'>
        <div className='third-grid-nav'>
          <ul className='tabs'>
            <li className='social'>Social</li>
            <div className='social-tab'>
              <li
                style={{
                  borderBottom:
                    socialTab === 'review' ? '1px solid transparent' : '',
                  borderRight:
                    socialTab === 'review' ? '1px solid transparent' : '',
                }}
                onClick={() => reviewOnClick()}
                className='reviews'
              >
                Reviews <span>{reviews.length}</span>
              </li>
              <li
                style={{
                  borderBottom:
                    socialTab === 'discussion' ? '1px solid transparent' : '',
                  borderLeft:
                    socialTab === 'discussion' ? '1px solid transparent' : '',
                }}
                className='discussions'
                onClick={() => discussionOnClick()}
              >
                Discussions
              </li>
            </div>
          </ul>
        </div>
        {reviews.length ? (
          <div className='tab-content'>
            <div
              id='review'
              style={{
                display: `${socialTab === 'review' ? 'block' : 'none'}`,
              }}
            >
              <div className='review-container'>
                <div className='img-avatar'>
                  <div className='user-avatar'>
                    <span>
                      {reviews.length
                        ? reviews[random].author[0].toUpperCase()
                        : ''}
                    </span>
                  </div>
                </div>
                <div className='review-body'>
                  <div className='reviewer-details'>
                    <p className='reviewer-name'>
                      {`A review by ${
                        reviews.length ? reviews[random].author : ''
                      }`}
                    </p>
                    <p className='user-rating'>
                      <i className='fas fa-star'></i> 6.0
                    </p>
                  </div>
                  <div className='review-date'>
                    <p>{`Written by ${
                      reviews.length ? reviews[random].author : ''
                    }`}</p>
                  </div>

                  <div className='review-text'>
                    <p>{reviews.length ? reviews[random].content : ''}</p>
                  </div>
                </div>
              </div>

              <div className='read-all-reviews'>
                <p>Read All Reviews</p>
              </div>
            </div>
            <div
              id='discussion'
              style={{
                display: `${socialTab === 'discussion' ? 'block' : 'none'}`,
              }}
            >
              <div className='trend-container'>
                <div className='avatar-discussion-title'>
                  <img src={Image} alt='discussion avatar' />
                  <p className='discussion-title'>CGI Fire</p>
                </div>
                <p className='discussion-status'>Open</p>
                <p className='discussion-contributors'>3</p>
                <div className='contributor-details'>
                  <p className='date-created'>Jul 16, 2020 at 10:18 PM</p>
                  <p className='creator-name'>by TheVorlon</p>
                </div>
              </div>
              <div className='trend-container'>
                <div className='avatar-discussion-title'>
                  <img src={Image} alt='discussion avatar' />
                  <p className='discussion-title'>CGI Fire</p>
                </div>
                <p className='discussion-status'>Open</p>
                <p className='discussion-contributors'>3</p>
                <div className='contributor-details'>
                  <p className='date-created'>Jul 16, 2020 at 10:18 PM</p>
                  <p className='creator-name'>by TheVorlon</p>
                </div>
              </div>
              <div className='trend-container'>
                <div className='avatar-discussion-title'>
                  <img src={Image} alt='discussion avatar' />
                  <p className='discussion-title'>CGI Fire</p>
                </div>
                <p className='discussion-status'>Open</p>
                <p className='discussion-contributors'>3</p>
                <div className='contributor-details'>
                  <p className='date-created'>Jul 16, 2020 at 10:18 PM</p>
                  <p className='creator-name'>by TheVorlon</p>
                </div>
              </div>
              <div className='go-to-discussions'>
                <p>Go To Discussions</p>
              </div>
            </div>
          </div>
        ) : (
          <div>{`We don't have any reviews for ${
            movieData.title || movieData.name
          }`}</div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Social;
