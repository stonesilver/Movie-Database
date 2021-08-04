import React, { useState, useEffect, useCallback } from 'react';
import DetailNav from '../detail-nav/detail-nav.component';
import CollectionCard from '../collectionCard/collection-card.component';
import { withRouter, Redirect } from 'react-router-dom';
import PageLoader from '../PageLoader/PageLoader.component';
import LinkHeader from '../link-header/link-header.component';
import './cast-detail.styles.scss';

const CastDetail = ({
  match: {
    params: { movieDetail },
    url,
  },
}) => {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    let type = url.includes('movies') ? 'movie' : 'tv';
    setIsLoading(true);
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/${type}/${movieDetail.match(/\d{1,}/)}/${
          type === 'tv' ? 'aggregate_credits' : 'credits'
        }?api_key=${process.env.REACT_APP_API_URL}`
      ),
      fetch(
        `https://api.themoviedb.org/3/${type}/${movieDetail.match(
          /\d{1,}/
        )}?api_key=${process.env.REACT_APP_API_URL}`
      ),
    ])
      .then(([list, movieData]) => Promise.all([list.json(), movieData.json()]))
      .then(([list, movieData]) => {
        setCast(list.cast);
        setCrew(list.crew);
        setMovieData(movieData);
      })
      .catch((err) => {
        setIsLoading(false);
        setMovieData(err);
        // console.log(err);
      });
  }, [movieDetail, url]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [fetchData]);

  let filteredCrew = [];
  let filteredCrewList = [];

  if (crew.length) {
    crew.forEach((item) => {
      if (!filteredCrewList.includes(item.department)) {
        let filter = crew.filter((tem) => tem.department === item.department);
        filteredCrew.push(filter);
        filteredCrewList.push(item.department);
      }
    });
    filteredCrew = filteredCrew.sort(
      (a, b) => a[0].department - b[0].department
    );
  }

  // console.log({cast, crew, filteredCrew, movieData});

  return movieData.status_code ? (
    <Redirect to='/404_page_not_found' />
  ) : movieData.id ? (
    <div className='cast-detail'>
      <DetailNav />
      <LinkHeader movieData={movieData} backLink={'/cast'} linkText={'main'} />
      <div className='display-cast-and-crew'>
        <div className='display-container'>
          <div className='cast'>
            <div className='header'>
              {movieData.release_date ? 'Cast' : 'Series Cast'}
              <span>{`(${cast.length})`}</span>
            </div>
            {cast.map(
              ({
                id,
                profile_path,
                name,
                character,
                gender,
                roles,
                total_episode_count,
              }) => (
                <CollectionCard
                  key={id}
                  type={true}
                  id={id}
                  name={name}
                  gender={gender}
                  characterName={
                    character ? character : roles ? roles[0].character : ''
                  }
                  posterPath={profile_path}
                  totalEpisodeCount={total_episode_count}
                />
              )
            )}
          </div>
          <div className='crew'>
            <div className='header'>
              {movieData.release_date ? 'Crew' : 'Series Crew'}
              <span>{`(${crew.length})`}</span>
            </div>
            {filteredCrew.map((item, index) => (
              <div className='crew-section' key={index}>
                <div className='crew-section-header' key={index}>
                  {item[0].department}
                </div>
                {item.map(
                  (
                    {
                      id,
                      name,
                      jobs,
                      profile_path,
                      gender,
                      total_episode_count,
                      department,
                    },
                    index
                  ) => (
                    <CollectionCard
                      key={id + index}
                      type={true}
                      id={id}
                      name={name}
                      gender={gender}
                      department={department ? department : jobs[0].job}
                      posterPath={profile_path}
                      totalEpisodeCount={total_episode_count}
                    />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <PageLoader isLoading={isLoading} refetchData={fetchData} />
  );
};

export default withRouter(CastDetail);
