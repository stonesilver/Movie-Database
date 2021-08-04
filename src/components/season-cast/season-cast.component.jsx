import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import DetailNav from '../detail-nav/detail-nav.component';
import LinkHeader from '../link-header/link-header.component';
import NextPrevious from '../nextAndPrevious/nextAndPrevious.component';
import CollectionCard from '../collectionCard/collection-card.component';
import PageLoader from '../PageLoader/PageLoader.component';
import './season-cast.styles.scss';

const SeasonCast = ({ match: { params } }) => {
  const [data, setData] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [guestStars, setGuestStars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/tv/${params.movieDetail.match(
        /\d{1,}/
      )}/season/${params.seasonNumber}/episode/${
        params.episodeNumber
      }?api_key=${
        process.env.REACT_APP_API_URL
      }&language=en-US&append_to_response=credits`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setCast(data.credits.cast);
        setCrew(data.credits.crew);
        setGuestStars(data.credits.guest_stars);
      })
      .catch((err) => {
        // console.log(err);
        setIsLoading(false);
      });
  }, [params.movieDetail, params.seasonNumber, params.episodeNumber]);

  useEffect(() => {
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

  // console.log({ filteredCrew });
  return data.id ? (
    <div className='season-cast'>
      <DetailNav />
      <LinkHeader
        movieData={data}
        backLink={`/episode/${params.episodeNumber}/cast`}
        linkText={'episodes'}
      />
      <NextPrevious />
      <div className='season-cast-container'>
        <div className='season-cast-left-side'>
          <p className='header'>Series Regulars</p>
          {cast.map(
            (
              {
                id,
                profile_path,
                name,
                character,
                gender,
                roles,
                total_episode_count,
              },
              index
            ) => (
              <CollectionCard
                key={index}
                type={true}
                id={id}
                name={name}
                gender={gender}
                characterName={character ? character : roles[0].character}
                posterPath={profile_path}
                totalEpisodeCount={total_episode_count}
              />
            )
          )}
        </div>
        <div className='season-cast-right-side'>
          <div className='guest-stars'>
            <p className='header'>Guest Stars</p>
            {guestStars.map(
              (
                {
                  id,
                  profile_path,
                  name,
                  character,
                  gender,
                  roles,
                  total_episode_count,
                },
                index
              ) => (
                <CollectionCard
                  key={index}
                  type={true}
                  id={id}
                  name={name}
                  gender={gender}
                  characterName={character ? character : roles[0].character}
                  posterPath={profile_path}
                  totalEpisodeCount={total_episode_count}
                />
              )
            )}
          </div>
          <div className='crew'>
            <p className='header'>Crew</p>
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
                      key={index}
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

export default withRouter(SeasonCast);
