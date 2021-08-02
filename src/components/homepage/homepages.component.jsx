import React from 'react';
import CarouselDisplay from '../Carousel/Carousel';
import Popular from '../Popular/Popular';
import KidsMovies from '../kids/kids';
import LatestTrailer from '../LatestTrailer/LatestTrailer';
import Trending from '../Trending/Trending';
import JoinUs from '../JoinUs/JoinUs';

const Homepage = () => {
  return (
    <div>
      <CarouselDisplay />
      <Popular />
      <KidsMovies />
      <LatestTrailer />
      <Trending />
      <JoinUs />
    </div>
  );
};

export default Homepage;
