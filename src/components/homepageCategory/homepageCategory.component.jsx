import React, { useState, useEffect } from 'react';
import './homepageCategory.styles.scss';
import MovieCard from '../MovieCard/MovieCard';

const HomepageCategory = ({
  categoryName,
  categoryArray,
  apiLink,
  selectFirst,
}) => {
  const [homepageCategoryData, setHomepageCategoryData] = useState([]);
  const [side, setSide] = useState({
    [categoryName]: selectFirst,
  });

  useEffect(() => {
    fetch(apiLink)
      .then((res) => res.json())
      .then((data) => setHomepageCategoryData(data.results))
      .catch((err) => console.log(err));
    return setHomepageCategoryData([]);
  }, [apiLink]);

  const handleStreamChange = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setHomepageCategoryData(data.results))
      .catch((err) => console.log(err));
    return setHomepageCategoryData([]);
  };

  return (
    <div className='homepageCategory-container'>
      <div className='homepageCategory-row'>
        <div sm=''>
          <h4 className='homepageCategory-header'>{categoryName}</h4>
        </div>
        <div className='homepageCategory-type'>
          {categoryArray.map(({ name, categoryLink }, i) => (
            <div
              key={i}
              className={`options ${
                side[categoryName] === name ? 'active' : ''
              }`}
              onClick={() => {
                setSide((prevState) => ({
                  ...prevState,
                  [categoryName]: name,
                }));
                handleStreamChange(categoryLink);
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
      <div className='main-row'>
        {homepageCategoryData.length
          ? homepageCategoryData.map(
              ({
                poster_path,
                vote_average,
                title,
                original_name,
                release_date,
                first_air_date,
                id,
              }) => (
                <MovieCard
                  key={id}
                  src={
                    poster_path
                      ? `http://image.tmdb.org/t/p/w185${poster_path}`
                      : 'https://tjszkxabrz-flywheel.netdna-ssl.com/wp-content/uploads/2016/05/No-Image.jpg'
                  }
                  rating={vote_average}
                  movieTitle={title}
                  releaseDate={release_date}
                  firstAirDate={first_air_date}
                  tvTitle={original_name}
                  id={id}
                  loading={false}
                  homepage={true}
                />
              )
            )
          : [...Array(20).keys()].map((item, i) => (
              <MovieCard loading={true} homepage={true} key={i} />
            ))}
      </div>
    </div>
  );
};

export default HomepageCategory;
