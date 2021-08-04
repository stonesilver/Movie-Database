import React, { useState, useEffect, useCallback } from 'react';
import IntroDetail from '../intro-movie-detail/intro-movie-detail.component';
import DetailNav from '../detail-nav/detail-nav.component';
import TopBilledCast from '../top-billed-cast/top-billed-cast.component';
import Social from '../social-movie-detail/social-movie-detail.component';
import Media from '../media-movie-detail/media-movie-detail.component';
import Recommendation from '../recommendation-movie-detail/recommendation-movie-detail.component';
import RightSection from '../right-section/right-section.component';
import PageLoader from '../PageLoader/PageLoader.component';
import CurrentSeason from '../current-season/current-season.component';
import Collection from '../collection/collection.component';
// import MovieImagesCarousel from '../movieImagesCarousel/movieImagesCarousel.component';
import { Redirect } from 'react-router-dom';
import { useParams, useRouteMatch } from 'react-router-dom';
import { getImageColors } from '../../assets/Clarifai';
import './movieDetail.styles.scss';

const MovieDetails = () => {
  const initialState = {
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
  };
  const [movieDetailsData, setMovieDetailsData] = useState(initialState);
  const { path } = useRouteMatch();
  const { movieDetail } = useParams();

  let fetchData = useCallback(() => {
    const moviePath = path.match(/tv/) ? 'tv' : 'movie';
    setMovieDetailsData((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/${moviePath}/${movieDetail
          .match(/\d{2,}/)
          .join('')}?api_key=${process.env.REACT_APP_API_URL}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/${moviePath}/${movieDetail
          .match(/\d{2,}/)
          .join('')}/${
          moviePath === 'tv' ? 'aggregate_credits' : 'credits'
        }?api_key=${process.env.REACT_APP_API_URL}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/${moviePath}/${movieDetail
          .match(/\d{2,}/)
          .join('')}/keywords?api_key=${process.env.REACT_APP_API_URL}`
      ),
      fetch(
        `https://api.themoviedb.org/3/${moviePath}/${movieDetail
          .match(/\d{2,}/)
          .join('')}/videos?api_key=${
          process.env.REACT_APP_API_URL
        }&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/${moviePath}/${movieDetail
          .match(/\d{2,}/)
          .join('')}/images?api_key=${process.env.REACT_APP_API_URL}`
      ),
      fetch(
        `https://api.themoviedb.org/3/${moviePath}/${movieDetail
          .match(/\d{2,}/)
          .join('')}/recommendations?api_key=${
          process.env.REACT_APP_API_URL
        }&language=en-US&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/${moviePath}/${movieDetail
          .match(/\d{2,}/)
          .join('')}/reviews?api_key=${
          process.env.REACT_APP_API_URL
        }&language=en-US&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/${moviePath}/${movieDetail
          .match(/\d{2,}/)
          .join('')}/external_ids?api_key=${process.env.REACT_APP_API_URL}`
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
        async([
          movieData,
          credits,
          keywords,
          videos,
          images,
          recommendations,
          reviews,
          externalID,
        ]) => {
          await setMovieDetailsData((prevState) => ({
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

          await getImageColors(movieData.backdrop_path).then((colors) =>
      setMovieDetailsData((prevState) => ({
        ...prevState,
        backgroundColor: colors,
      }))
    );
        }
      )
      .catch((err) => {
        // console.log(err);
        setMovieDetailsData((prevState) => ({
          ...prevState,
          movieData: err,
        }));
        setMovieDetailsData((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      });

    // getImageColors(movieDetailsData.movieData.backdrop_path).then((colors) =>
    //   setMovieDetailsData((prevState) => ({
    //     ...prevState,
    //     backgroundColor: colors,
    //   }))
    // );
  }, [movieDetail, path]);
  // , movieDetailsData.movieData.backdrop_path

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();

    return setMovieDetailsData((prevState) => ({
      ...prevState,
      backgroundColor: [],
    }));
  }, [fetchData]);

  // console.log({ movieDetailsData });
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
    mediaQuery,
  } = movieDetailsData;

  return movieData.status_code ? (
    <Redirect to='/404_page_not_found' />
  ) : movieData.id && backgroundColor.length ? (
    <div className='movie-details'>
      {/* <MovieImagesCarousel /> */}
      <DetailNav />
      <IntroDetail
        movieData={movieData}
        crew={credits.crew}
        video={videos}
        showRating={true}
        streamTunneled={true}
        backgroundColor={backgroundColor}
        mediaQuery={mediaQuery}
      />
      <section className='movie-details-container'>
        <div className='left-section'>
          <TopBilledCast cast={credits.cast} type={movieData} />
          {movieData.seasons ? (
            <CurrentSeason season={movieData.seasons} />
          ) : (
            ''
          )}
          <Social reviews={reviews} movieData={movieData} />
          <Media videos={videos} images={images} />
          {movieData.belongs_to_collection && (
            <Collection collection={movieData} />
          )}
          <Recommendation
            recommendations={recommendations}
            movieData={movieData}
          />
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
    <PageLoader isLoading={isLoading} refetchData={fetchData} />
  );
};

export default MovieDetails;
