import React, { useState, useEffect } from 'react';
import IntroDetail from '../intro-movie-detail/intro-movie-detail.component';
import DetailNav from '../detail-nav/detail-nav.component';
import TopBilledCast from '../top-billed-cast/top-billed-cast.component';
import Social from '../social-movie-detail/social-movie-detail.component';
import Media from '../media-movie-detail/media-movie-detail.component';
import Recommendation from '../recommendation-movie-detail/recommendation-movie-detail.component';
import RightSection from '../right-section/right-section.component';
import BlanketElement from '../blanket-element/blanket-element.component';
import CurrentSeason from '../current-season/current-season.component';
import Collection from '../collection/collection.component';
import { Redirect } from 'react-router-dom';
import { useParams, useRouteMatch } from 'react-router-dom';
import { getImageColors } from '../../assets/Clarifai';
import './movieDetail.styles.scss';

const MovieDetails = () => {
  const [movieDetailsData, setMovieDetailsData] = useState({
    movieData: {},
    credits: null,
    keywords: null,
    videos: null,
    images: null,
    recommendations: null,
    reviews: [],
    externalID: {},
    isLoading: true,
    backgroundColor: [],
  });

  const { path } = useRouteMatch();
  const { movieDetail } = useParams();

  useEffect(() => {
    const moviePath = path.match(/tv/) ? 'tv' : 'movie';
    window.scrollTo(0, 0);
    let fetchData = () => {
      Promise.all([
        fetch(
          `https://api.themoviedb.org/3/${moviePath}/${movieDetail
            .match(/\d{2,}/)
            .join('')}?api_key=ffefcdcfad7ef5063184883831d5c9f2&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/${moviePath}/${movieDetail
            .match(/\d{2,}/)
            .join('')}/${
            moviePath === 'tv' ? 'aggregate_credits' : 'credits'
          }?api_key=ffefcdcfad7ef5063184883831d5c9f2&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/${moviePath}/${movieDetail
            .match(/\d{2,}/)
            .join('')}/keywords?api_key=ffefcdcfad7ef5063184883831d5c9f2`
        ),
        fetch(
          `https://api.themoviedb.org/3/${moviePath}/${movieDetail
            .match(/\d{2,}/)
            .join(
              ''
            )}/videos?api_key=ffefcdcfad7ef5063184883831d5c9f2&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/${moviePath}/${movieDetail
            .match(/\d{2,}/)
            .join(
              ''
            )}/images?api_key=ffefcdcfad7ef5063184883831d5c9f2&language=en-US&include_image_language=null`
        ),
        fetch(
          `https://api.themoviedb.org/3/${moviePath}/${movieDetail
            .match(/\d{2,}/)
            .join(
              ''
            )}/recommendations?api_key=ffefcdcfad7ef5063184883831d5c9f2&language=en-US&page=1`
        ),
        fetch(
          `https://api.themoviedb.org/3/${moviePath}/${movieDetail
            .match(/\d{2,}/)
            .join(
              ''
            )}/reviews?api_key=ffefcdcfad7ef5063184883831d5c9f2&language=en-US&page=1`
        ),
        fetch(
          `https://api.themoviedb.org/3/${moviePath}/${movieDetail
            .match(/\d{2,}/)
            .join('')}/external_ids?api_key=ffefcdcfad7ef5063184883831d5c9f2`
        ),
      ])
        .then(
          ([
            movieData,
            credits,
            keywords,
            videos,
            images,
            recommendations,
            reviews,
            externalID,
          ]) =>
            Promise.all([
              movieData.json(),
              credits.json(),
              keywords.json(),
              videos.json(),
              images.json(),
              recommendations.json(),
              reviews.json(),
              externalID.json(),
            ])
        )
        .then(
          ([
            movieData,
            credits,
            keywords,
            videos,
            images,
            recommendations,
            reviews,
            externalID,
          ]) => {
            setMovieDetailsData((prevState) => ({
              ...prevState,
              movieData,
              credits,
              keywords: keywords.keywords || keywords.results,
              videos: videos.results,
              images,
              recommendations: recommendations.results,
              reviews: reviews.results,
              externalID,
            }));
          }
        )
        .catch((err) => {
          console.log(err);
          setMovieDetailsData((prevState) => ({
            ...prevState,
            movieData: err,
          }));
          setMovieDetailsData((prevState) => ({
            ...prevState,
            isLoading: false,
          }));
        });

      getImageColors(
        `https://image.tmdb.org/t/p/w1280${movieDetailsData.movieData.backdrop_path}`
      ).then((colors) => 
        setMovieDetailsData((prevState) => ({
          ...prevState,
          backgroundColor: colors,
        }))
      );
    };

    fetchData();

    return setMovieDetailsData((prevState) => ({
      ...prevState,
      backgroundColor: [],
    }));
  }, [movieDetail, path, movieDetailsData.movieData.backdrop_path]);

  console.log('movieDetailsData', movieDetailsData);
  const {
    movieData,
    credits,
    isLoading,
    keywords,
    videos,
    images,
    recommendations,
    reviews,
    backgroundColor,
    externalID,
  } = movieDetailsData;
  console.log('recommendations', recommendations);
  console.log('credits', credits);
  return movieData.status_code ? (
    <Redirect to='/404_page_not_found' />
  ) : movieData.id && backgroundColor.length ? (
    <div className='movie-details'>
      <DetailNav />
      <IntroDetail
        movieData={movieData}
        crew={credits.crew}
        video={videos}
        showRating={true}
        streamTunneled={true}
        backgroundColor={backgroundColor}
      />
      <section className='movie-details-container'>
        <div className='left-section'>
          <TopBilledCast cast={credits.cast} type={movieData} />
          {movieData.seasons ? (
            <CurrentSeason season={movieData.seasons} />
          ) : (
            ''
          )}
          <Social reviews={reviews} />
          <Media videos={videos} images={images} />
          {movieData.belongs_to_collection ? (
            <Collection collection={movieData} />
          ) : (
            ''
          )}
          <Recommendation recommendations={recommendations} />
        </div>
        <div className='right-section'>
          <RightSection
            status={movieData.status}
            budget={movieData.budget}
            revenue={movieData.revenue}
            keywords={keywords}
            original_language={movieData.original_language}
            network={movieData.networks}
            type={movieData.type}
            backgroundColor={backgroundColor}
            externalID={externalID}
          />
        </div>
      </section>
    </div>
  ) : (
    <BlanketElement isLoading={isLoading} />
  );
};

export default MovieDetails;
