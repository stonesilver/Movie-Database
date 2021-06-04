import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import LinkHeader from '../../components/link-header/link-header.component';
import DetailNav from '../../components/detail-nav/detail-nav.component';
import BlanketElement from '../blanket-element/blanket-element.component';
import SeasonEpisodeCard from '../season-episode-card/season-episode-card.component';
import NextPrevious from '../nextAndPrevious/nextAndPrevious.component';
import './season-episodes.styles.scss';

const SeasonsEpisodes = ({ match: { params } }) => {
  const [episodes, setEpisodes] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [pageMounted, setPageMounted] = useState(false);
  const [hover, setHover] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    if (pageMounted) {
      window.location.reload();
    }

    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/tv/${params.movieDetail.match(
          /\d{1,}/
        )}/season/${
          params.seasonNumber
        }?api_key=${process.env.REACT_APP_API_URL}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/tv/${params.movieDetail.match(
          /\d{1,}/
        )}?api_key=${process.env.REACT_APP_API_URL}`
      ),
    ])
      .then(([episodeData, seasons]) =>
        Promise.all([episodeData.json(), seasons.json()])
      )
      .then(([episodeData, seasons]) => {
        setEpisodes(episodeData);
        setSeasons(seasons.seasons);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [params.movieDetail, params.seasonNumber])

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
    return setPageMounted(true);
  }, [fetchData]);

  const onHover = () => {
    setHover(true);
  };
  const onHoverLeave = () => {
    setHover(false);
  };
  console.log({episodes, seasons});
  return episodes.id ? (
    <div className='season-episodes'>
      <DetailNav />
      <LinkHeader
        movieData={episodes}
        backLink={`/${episodes.season_number}`}
        linkText={'season list'}
      />
      <NextPrevious
        previousSeason={seasons[parseInt(params.seasonNumber) - 1]}
        nextSeason={seasons[parseInt(params.seasonNumber) + 1]}
      />
      <div className='episodes-container'>
        <div className='episode-main-container'>
          <div className='number-of-episodes-and-sort'>
            <p>
              Episodes <span>{episodes.episodes.length}</span>
            </p>
            <div className='sort-container'>
              <span className='text' onMouseOver={onHover}>
                sort
              </span>{' '}
              <span className='fas fa-caret-down'></span>
              <div
                className='sort-main-container'
                onMouseLeave={onHoverLeave}
                style={{ display: hover ? 'block' : 'none' }}
              >
                <ul className='sort-category'>
                  <li className='main-category'>
                    <span>Episode Number</span>{' '}
                    <span className='fas fa-caret-right'></span>
                    <ul className='sub-category'>
                      <li>Ascending</li>
                      <li>Descending</li>
                    </ul>
                  </li>
                  <li className='main-category'>
                    <span>Aired Date</span>{' '}
                    <span className='fas fa-caret-right'></span>
                    <ul className='sub-category'>
                      <li>Ascending</li>
                      <li>Descending</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {episodes.episodes.map(
            ({
              episode_number,
              vote_average,
              name,
              air_date,
              overview,
              crew,
              guest_stars,
              still_path,
              id,
            }) => (
              <SeasonEpisodeCard
                key={id}
                episode_number={episode_number}
                vote_average={vote_average}
                name={name}
                air_date={air_date}
                overview={overview}
                crew={crew}
                guest_stars={guest_stars}
                still_path={still_path}
              />
            )
          )}
        </div>
      </div>
    </div>
  ) : (
    <BlanketElement isLoading={isLoading} refetchData={fetchData} />
  );
};

export default withRouter(SeasonsEpisodes);
