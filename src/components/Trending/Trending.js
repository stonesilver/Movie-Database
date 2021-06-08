import React from 'react';
import HomepageCategory from '../homepageCategory/homepageCategory.component';

const Trending = () => {
  const categoryArray = [
    {
      name: 'Today',
      categoryLink: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_URL}`,
    },
    {
      name: 'This Week',
      categoryLink: `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_URL}`,
    },
  ];
  return (
    <HomepageCategory
      categoryName='Trending'
      apiLink={`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_URL}`}
      categoryArray={categoryArray}
      selectFirst='Today'
    />
  );
};

export default Trending;
