import React, { useState, useEffect } from 'react';
import HomepageCategoryLink from '../homepageCategoryLinks/homepageCategoryLinks.component';
import TrailerCard from '../TrailerCard/TrailerCard';
import './LatestTrailer.styles.scss';

const LatestTrailer = () => {
  const [trailersVideo, setTrailersVideo] = useState([]);
  const [trailerBackgroundUrl, setTrailerBackgroundUrl] = useState(
    '/ruxOWt2iCPM4tV2PY3OuYJHt4Do.jpg'
  );
  const categoryName = 'Lastest Trailer';
  const selectFirst = 'Streaming';
  const [side, setSide] = useState({
    [categoryName]: selectFirst,
  });
  const categoryArray = [
    {
      name: 'Streaming',
      categoryLink: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_URL}&language=en-US&page=1`,
    },
    {
      name: 'In Theater',
      categoryLink: `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_URL}`,
    },
    {
      name: 'On TV',
      categoryLink: `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_URL}&language=en-US&page=1`,
    },
  ];

  const setTrailerVideo = async (data) => {
    setTrailersVideo(
      await Promise.all(
        data.results.map((result) => {
          return fetch(
            `https://api.themoviedb.org/3/${result.name ? 'tv' : 'movie'}/${
              result.id
            }?api_key=${
              process.env.REACT_APP_API_URL
            }&language=en-US&append_to_response=videos`
          )
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => {
              // console.log(err);
            });
        })
      )
    );
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_URL}&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setTrailerBackgroundUrl(data.results[0].backdrop_path);
        setTrailerVideo(data);
      })
      .catch((err) => {
        // console.log(err);
      });
    return setTrailersVideo([]);
  }, []);

  const handleStreamChange = (url, name) => {
    setSide({ [categoryName]: name });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTrailerBackgroundUrl(data.results[0].backdrop_path);
        setTrailerVideo(data);
      })
      .catch((err) => {
        // console.log(err);
      });
    return setTrailersVideo([]);
  };

  const getMouse = (backDropPath) => {
    setTrailerBackgroundUrl(backDropPath);
  };

  const trailersToDisplay = trailersVideo.length
    ? trailersVideo.filter((item) => item.videos.results.length)
    : [...Array(15).keys()];
  return (
    <div
      className='mt-3 p-2 latest-trailer'
      style={{
        backgroundImage: `linear-gradient(rgba(39, 39, 41, 0.8), rgba(36, 36, 39, 0.8)),
          url("https://image.tmdb.org/t/p/w780${trailerBackgroundUrl}")`,
      }}
    >
      <HomepageCategoryLink
        categoryArray={categoryArray}
        side={side}
        setSide={setSide}
        categoryName={categoryName}
        handleStreamChange={handleStreamChange}
      />
      <div className='trailer-row'>
        {trailersToDisplay.map(
          ({ backdrop_path, id, name, title, videos }, index) => (
            <TrailerCard
              src={backdrop_path}
              title={name || title}
              key={id || index}
              overview={videos ? videos.results[0].name : ''}
              getMouseEvent={getMouse}
              videoLink={videos ? videos.results[0].key : ''}
            />
          )
        )}
      </div>
    </div>
  );
};

export default LatestTrailer;
