import React from 'react';
import CarouselDisplay from '../../components/Carousel/Carousel';
import Popular from '../../components/Popular/Popular';
import FreeToWatch from '../../components/kids/kids';
import LatestTrailer from '../../components/LatestTrailer/LatestTrailer';
import Trending from '../../components/Trending/Trending';
import JoinUs from '../../components/JoinUs/JoinUs';


import './homepage.styles.css';

const Homepage = () => (
   <div className='homepage'>
      <CarouselDisplay />
      <Popular />
      <FreeToWatch />
      <LatestTrailer />
      <Trending />
      <JoinUs />
   </div>
);

export default Homepage;
