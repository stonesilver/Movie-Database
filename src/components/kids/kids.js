import React from 'react';
import HomepageCategory from '../homepageCategory/homepageCategory.component';

const KidsMovies = () => {
  const categoryArray = [
    {
      name: 'Movies',
      categoryLink: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_URL}&language=en-US&sort_by=popularity.desc&certification.lte=G&include_adult=false&include_video=false&page=1&with_genres=16`,
    },
    {
      name: 'TV',
      categoryLink: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_URL}&language=en-US&sort_by=popularity.desc&certification.lte=G&include_adult=false&include_video=false&page=1&with_genres=16`,
    },
  ];
  return (
    <HomepageCategory
      categoryName='Kids'
      apiLink={`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_URL}&language=en-US&sort_by=popularity.desc&certification.lte=G&include_adult=false&include_video=false&page=1&with_genres=16`}
      categoryArray={categoryArray}
      selectFirst='Movies'
    />
  );
};

export default KidsMovies;
