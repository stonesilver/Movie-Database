import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import ShowMore from '../showMore/show-more.component';
import './rightColumn.styles.scss';

const RightColumn = ({ movieData, showMorePage, isClicked, loading }) => (
  <div className='display-body'>
    <div className='page-row'>
      {movieData.map(
        (
          {
            poster_path,
            vote_average,
            title,
            name,
            overview,
            release_date,
            first_air_date,
            id,
          },
          index
        ) => (
          <MovieCard
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w780${poster_path}`
                : 'https://tjszkxabrz-flywheel.netdna-ssl.com/wp-content/uploads/2016/05/No-Image.jpg'
            }
            rating={vote_average}
            movieTitle={title}
            releaseDate={release_date}
            firstAirDate={first_air_date}
            tvTitle={name}
            overview={overview}
            key={id || index}
            id={id}
            loading={loading}
            movieTv={true}
          />
        )
      )}
    </div>
    <ShowMore showMorePage={showMorePage} isClicked={isClicked} />
  </div>
);

export default RightColumn;
