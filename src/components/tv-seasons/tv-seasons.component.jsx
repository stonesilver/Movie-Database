import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import LinkHeader from '../link-header/link-header.component';
import DetailNav from '../detail-nav/detail-nav.component';
import PageLoader from '../PageLoader/PageLoader.component';
import SeasonsCard from '../seasons-card/seasons-card.component';
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
      .catch((err) => {
        setIsLoading(false)
        // console.log(err);
      });
  }, [params.movieDetail]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [fetchData]);

  // console.log(movieData);
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
    <PageLoader isLoading={isLoading} refetchData={fetchData} />
  );
};

export default withRouter(TvSeasons);
