import React, { useState, useEffect } from 'react';

import DetailNav from '../detail-nav/detail-nav.component';

import CollectionCard from '../collectionCard/collection-card.component';

import { withRouter, Redirect } from 'react-router-dom';

import BlanketElement from '../blanket-element/blanket-element.component';

import LinkHeader from '../link-header/link-header.component';

import './cast-detail.styles.scss';

const CastDetail = ({ match: { params, url } }) => {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    let type = url.includes('movies') ? 'movie' : 'tv';
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/${type}/${params.movieDetail.match(
          /\d{1,}/
        )}/${
          type === 'tv' ? 'aggregate_credits' : 'credits'
        }?api_key=ffefcdcfad7ef5063184883831d5c9f2`
      ),
      fetch(
        `https://api.themoviedb.org/3/${type}/${params.movieDetail.match(
          /\d{1,}/
        )}?api_key=ffefcdcfad7ef5063184883831d5c9f2`
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
        console.log(err);
      });
  }, [params.movieDetail, url]);

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

  console.log('cast', cast);
  console.log('crew', crew);
  console.log('filteredCrew', filteredCrew);
  console.log('movieData', movieData);

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
                  type='feature'
                  id={id}
                  name={name}
                  gender={gender}
                  characterName={character ? character : roles ? roles[0].character : ''}
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
              <div className='section' key={index}>
                <div className='section-header' key={index}>
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
                      type='feature'
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
    <BlanketElement isLoading={isLoading} />
  );
};

export default withRouter(CastDetail);
