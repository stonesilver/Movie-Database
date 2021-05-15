import React from 'react';
import HomepageCategory from '../homepageCategory/homepageCategory.component';

const Popular = () => {
  const categoryArray = [
    {
      name: 'streaming',
      categoryLink:
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_URL}&language=en-US&page=1`,
    },
    {
      name: 'On TV',
      categoryLink:
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_URL}&language=en-US&page=1`,
    },
    {
      name: 'In Theatres',
      categoryLink: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_URL}&region=US&page=1&primary_release_date.gte=${new Date().getFullYear()}-${
        new Date().getMonth() + 1 < 10
          ? `0${new Date().getMonth() - 1}`
          : new Date().getMonth() - 1
      }-${
        new Date().getDate() < 10
          ? `0${new Date().getDate()}`
          : new Date().getDate()
      }&primary_release_date.lte=${new Date().getFullYear()}-${
        new Date().getMonth() + 1 < 10
          ? `0${new Date().getMonth() + 1}`
          : new Date().getMonth() - 2
      }-${
        new Date().getDate() < 10
          ? `0${new Date().getDate()}`
          : new Date().getDate()
      }`,
    },
  ];
  return (
    <HomepageCategory
      categoryName='Popular'
      apiLink={`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_URL}&language=en-US&page=1`}
      categoryArray={categoryArray}
      selectFirst='streaming'
    />
  );
};

export default Popular;
