import React, { useState, useEffect, useCallback } from 'react';
import DetailNav from '../detail-nav/detail-nav.component';
import IntroDetail from '../intro-movie-detail/intro-movie-detail.component';
import BlanketElement from '../blanket-element/blanket-element.component';
import CollectionCard from '../collectionCard/collection-card.component';
import { withRouter } from 'react-router-dom';
import { getImageColors } from '../../assets/Clarifai';
import './collection-page.styles.scss';

const CollectionDetails = ({ match }) => {
  const [collectionData, setCollectionData] = useState([]);
  const [collectionCast, setCollectionCast] = useState([]);
  const [collectionPart, setCollectionPart] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const fetchData = useCallback(() => {
    setisLoading(true);
    fetch(
      `https://api.themoviedb.org/3/collection/${match.params.collectionID}?api_key=${process.env.REACT_APP_API_URL}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setCollectionData(data);
        // getImageColors(data.backdrop_path).then((colors) =>
        //   setBackgroundColor(colors))
        (async () => {
          setCollectionPart(
            await Promise.all(
              data.parts.map((item) =>
                fetch(
                  `https://api.themoviedb.org/3/movie/${item.id}?api_key=${process.env.REACT_APP_API_URL}&language=en-US`
                )
                  .then((res) => res.json())
                  .then((data) => data)
                  .catch((err) => {
                    // console.log(err);
                  })
              )
            )
          );

          setCollectionCast(
            await Promise.all(
              data.parts.map((item) =>
                fetch(
                  `https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=${process.env.REACT_APP_API_URL}`
                )
                  .then((res) => res.json())
                  .then((data) => data)
                  .catch((err) => {
                    // console.log(err);
                  })
              )
            )
          );

          await getImageColors(data.backdrop_path).then((colors) =>
            setBackgroundColor(colors)
          );
        })();
      })
      .catch((err) => {
        setisLoading(false);
        // console.log(err);
      });
  }, [match.params.collectionID]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [fetchData]);

  let userScore = [];
  if (collectionData.parts) {
    userScore = Math.round(
      collectionData.parts.reduce(
        (acc, item) => acc + item.vote_average / collectionData.parts.length,
        0
      ) * 10
    );
  }

  let cast = [];
  let castID = [];
  if (collectionData.parts) {
    cast = collectionCast
      .map((cast) => {
        return cast.cast.filter((item, index) => index < 5);
      })
      .flat()
      .filter((character, index) =>
        !castID.includes(character.id)
          ? (character, castID.push(character.id))
          : false
      );
  }

  let crew = [];
  let crewID = [];
  if (collectionData.parts) {
    crew = collectionCast
      .map((crew) => {
        return crew.crew.filter(
          (crewMember) =>
            (crewMember.department === 'Directing' &&
              crewMember.job === 'Director') ||
            (crewMember.department === 'Writing' &&
              crewMember.job === 'Screenplay')
        );
      })
      .flat()
      .filter((character, index) =>
        !crewID.includes(character.id)
          ? (character, crewID.push(character.id))
          : false
      );
  }
  let revenue = 0;
  if (collectionPart.length) {
    revenue = collectionPart
      .reduce((acc, rev) => acc + rev.revenue, 0)
      .toLocaleString();
  }

  // console.log({
  //   collectionData,
  //   collectionCast,
  //   collectionPart,
  //   cast,
  //   crew,
  //   revenue,
  //   backgroundColor,
  // });

  return collectionData.id ? (
    <div className='collection-page'>
      <DetailNav />
      <IntroDetail
        movieData={collectionData}
        showRating={false}
        UserProgress={userScore}
        revenue={revenue}
        streamTunneled={false}
        backgroundColor={backgroundColor}
      />
      <div className='featured-cast'>
        <h4 className='header'>Featured Cast</h4>
        <div className='cast-crew-container'>
          {cast.map(({ id, character, name, profile_path, gender }) => (
            <CollectionCard
              key={id}
              type='feature'
              id={id}
              gender={gender}
              name={name}
              characterName={character}
              posterPath={profile_path}
            />
          ))}
        </div>
        <hr />
      </div>

      <div className='featured-crew'>
        <h4 className='header'>Featured Crew</h4>
        <div className='cast-crew-container'>
          {crew.map(({ id, department, name, profile_path, gender }) => (
            <CollectionCard
              key={id}
              type='feature'
              id={id}
              gender={gender}
              name={name}
              department={department}
              posterPath={profile_path}
            />
          ))}
        </div>
        <hr />
      </div>

      <div className='movies'>
        <h4 className='header'>{collectionData.parts.length} movies</h4>
        <div className='movie-container'>
          {collectionPart
            .sort(
              (a, b) =>
                parseInt(a.release_date || 0) - parseInt(b.release_date || 0)
            )
            .map(({ id, title, overview, poster_path, release_date }) => (
              <CollectionCard
                key={id}
                title={title}
                id={id}
                overview={overview}
                posterPath={poster_path}
                releaseDate={release_date}
              />
            ))}
        </div>
      </div>
    </div>
  ) : (
    <BlanketElement isLoading={isLoading} refetchData={fetchData} />
  );
};

export default withRouter(CollectionDetails);
