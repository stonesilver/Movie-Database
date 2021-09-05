import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-circular-progressbar/dist/styles.css';
import { Link, useRouteMatch } from 'react-router-dom';
import './media-movie-detail.styles.scss';

const Media = ({ videos, images: { backdrops, posters } }) => {
  const [media, setMedia] = useState('most popular');
  const [viewAll, setViewAll] = useState('');
  const { url } = useRouteMatch();

  const mostPopularOnClick = () => {
    setViewAll('');
    setMedia('most popular');
  };

  const videosOnClick = () => {
    setViewAll('videos');
    return videos.length ? setMedia('videos') : '';
  };

  const backDropsOnClick = () => {
    setViewAll('backdrops');
    return backdrops.length ? setMedia('backdrops') : '';
  };

  const postersOnClick = () => {
    setViewAll('posters');
    return posters.length ? setMedia('posters') : '';
  };

  // console.log('videos', videos);
  const filteredVideos = videos.filter((video, index) => index <= 5);
  const filteredBackdrops = backdrops.filter((video, index) => index <= 9);
  const filteredPosters = posters.filter((video, index) => index <= 9);
  return (
    <div className='media-component'>
      <div className='media-grid'>
        <div className='media-grid-nav'>
          <ul className='tabs'>
            <li className='media'>Media</li>
            <div className='media-category-container'>
              <div className='media-category'>
                <li
                  style={{
                    borderBottom:
                      media === 'most popular' ? '1px solid transparent' : '',
                    borderRight:
                      media === 'most popular' ? '1px solid transparent' : '',
                  }}
                  onClick={() => mostPopularOnClick()}
                  className='most-popular'
                >
                  Most Popular
                </li>
                <li
                  style={{
                    borderBottom:
                      media === 'videos' ? '1px solid transparent' : '',
                    borderLeft:
                      media === 'videos' ? '1px solid transparent' : '',
                    borderRight:
                      media === 'videos' ? '1px solid transparent' : '',
                  }}
                  onClick={() => videosOnClick()}
                  className='video'
                >
                  Videos <span>{videos.length}</span>
                </li>
                <li
                  style={{
                    borderBottom:
                      media === 'backdrops' ? '1px solid transparent' : '',
                    borderLeft:
                      media === 'backdrops' ? '1px solid transparent' : '',
                    borderRight:
                      media === 'backdrops' ? '1px solid transparent' : '',
                  }}
                  onClick={() => backDropsOnClick()}
                  className='backdrop'
                >
                  Backdrops <span>{backdrops.length}</span>
                </li>
                <li
                  style={{
                    borderBottom:
                      media === 'posters' ? '1px solid transparent' : '',
                    borderLeft:
                      media === 'posters' ? '1px solid transparent' : '',
                  }}
                  onClick={() => postersOnClick()}
                  className='poster'
                >
                  Posters <span>{posters.length}</span>
                </li>
              </div>
              {viewAll ? (
                <Link to={`${url}/images/${viewAll}`} className='see-more'>
                  View all {viewAll}
                </Link>
              ) : (
                ''
              )}
            </div>
          </ul>
        </div>
        {videos.length || backdrops.length || posters.length ? (
          <div className='tab-content'>
            <div
              id='most-popular'
              className='content-container'
              style={{
                display: `${media === 'most popular' ? 'block' : 'none'}`,
              }}
            >
              <div className='scroll-container '>
                {videos.length ? (
                  <Link
                    to={`${url}${
                      videos[0].key[0] === '/'
                        ? `/play${videos[0].key}`
                        : `/play/${videos[0].key}`
                    }`}
                  >
                    <div className='official-trailer container'>
                      <div>
                        <LazyLoadImage
                          src={
                            videos[0]
                              ? `https://i.ytimg.com/vi/${videos[0].key}/0.jpg`
                              : ''
                          }
                          alt='official trailer'
                          className='most-popular-img'
                          effect='blur'
                        />
                      </div>
                    </div>
                  </Link>
                ) : (
                  ''
                )}

                <div className='official-poster container'>
                  
                    <LazyLoadImage
                      src={
                        backdrops[0]
                          ? `https://image.tmdb.org/t/p/w500${backdrops[0].file_path}`
                          : ''
                      }
                      alt='official poster'
                      className='most-popular-img'
                      effect='blur'
                    />
                </div>

                {posters.length ? (
                  <div className='small-poster'>
                    <div height={'100%'} offset={120}>
                      <LazyLoadImage
                        src={`https://image.tmdb.org/t/p/w342${posters[0].file_path}`}
                        alt='small poster'
                        className='most-popular-img'
                        effect='blur'
                      />
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div
              id='videos'
              className='content-container'
              style={{
                display: `${media === 'videos' ? 'block' : 'none'}`,
              }}
            >
              <div className='scroll-container '>
                {filteredVideos.map(({ key, id }) => (
                  <Link
                    to={`${url}${
                      key[0] === '/' ? `/play${key}` : `/play/${key}`
                    }`}
                    key={id}
                  >
                    <div className='official-trailer container'>
                      <div height={'100%'} offset={120}>
                        <LazyLoadImage
                          src={`https://i.ytimg.com/vi/${key}/0.jpg`}
                          alt='official trailer'
                          className='most-popular-img'
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div
              id='back-drops'
              className='content-container'
              style={{
                display: `${media === 'backdrops' ? 'block' : 'none'}`,
              }}
            >
              <div className='scroll-container '>
                {filteredBackdrops.map(({ file_path }, index) => (
                  <div className='official-poster container' key={index}>
                    <div>
                      <LazyLoadImage
                        src={`https://image.tmdb.org/t/p/w500${file_path}`}
                        alt={`official poster ${index + 1}`}
                        className='most-popular-img'
                        effect='blur'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              id='posters'
              className='content-container'
              style={{
                display: `${media === 'posters' ? 'block' : 'none'}`,
              }}
            >
              <div className='scroll-container '>
                {filteredPosters.map(({ file_path }, index) => (
                  <div className='small-poster' key={index}>
                    <div>
                      <LazyLoadImage
                        src={`https://image.tmdb.org/t/p/w342${file_path}`}
                        alt={`small poster ${index}`}
                        className='most-popular-img'
                        effect='blur'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>No videos, backdrops or posters have been added</div>
        )}
        <hr />
      </div>
    </div>
  );
};

export default Media;
