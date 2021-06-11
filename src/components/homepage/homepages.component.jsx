import React from 'react';
import CarouselDisplay from '../Carousel/Carousel';
import Popular from '../Popular/Popular';
import FreeToWatch from '../kids/kids';
import LatestTrailer from '../LatestTrailer/LatestTrailer';
import Trending from '../Trending/Trending';
import JoinUs from '../JoinUs/JoinUs';

const Homepage = () => {
  return (
    <div>
      <CarouselDisplay />
      <Popular />
      <FreeToWatch />
      <LatestTrailer />
      <Trending />
      <JoinUs />
    </div>
  );
};

export default Homepage;
