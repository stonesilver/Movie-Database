import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import LinkHeader from '../../components/link-header/link-header.component';
import DetailNav from '../../components/detail-nav/detail-nav.component';
import BlanketElement from '../blanket-element/blanket-element.component';
import SeasonsCard from '../../components/seasons-card/seasons-card.component';
import './tv-seasons.styles.scss';

const TvSeasons = ({ match: { params } }) => {
  const [movieData, setMovieData] = useState({});
  const [season, setseason] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/tv/${params.movieDetail.match(
        /\d{1,}/
      )}?api_key=${process.env.REACT_APP_API_URL}&language=en-US`
    )
      .then((res) => res.json())
      .then(async (data) => {
        await setMovieData(data);
        await setseason(data.seasons);
      })
      .catch((err) => console.log(err));
  }, [params.movieDetail]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [fetchData]);

  console.log(movieData);
  return movieData.id ? (
    <div className='tv-seasons'>
      {window.scrollTo(0, 0)}
      <DetailNav />
      <LinkHeader
        movieData={movieData}
        backLink={'/seasons'}
        linkText={'main'}
      />
      <div className='season-container'>
        {season.map((item) => (
          <SeasonsCard
            seasonDetail={item}
            originalName={movieData.name}
            key={item.id}
          />
        ))}
      </div>
    </div>
  ) : (
    <BlanketElement isLoading={isLoading} />
  );
};

export default withRouter(TvSeasons);
