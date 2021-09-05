import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-circular-progressbar/dist/styles.css';
import './recommendation-movie-detail.styles.scss';

const Recommendation = ({ recommendations, movieData }) => {
  const filteredRecommendations = recommendations.filter(
    (rec, index) => index <= 9
  );
  // console.log(filteredRecommendations);

  return (
    <div className='recommendations'>
      <h5 className='header'>Recommendations</h5>
      {recommendations.length ? (
        <div className='recommendations-container-scroll'>
          {filteredRecommendations.map(
            (
              {
                backdrop_path,
                release_date,
                first_air_date,
                original_name,
                name,
                title,
                vote_average,
                id,
              },
              index
            ) => (
              <Link
                to={`${original_name ? '/tv' : '/movies'}/${id}-${
                  title
                    ? title
                        .match(/\w|\s/g)
                        .join('')
                        .replace(/\s/g, '-')
                        .toLowerCase()
                    : name
                        .match(/\w|\s/g)
                        .join('')
                        .replace(/\s/g, '-')
                        .toLowerCase()
                }`}
                key={id}
              >
                <div className='recommendation-card'>
                  <div className='recommendations-card-img'>
                    <div height={'100%'} offset={120}>
                      <LazyLoadImage
                        src={
                          backdrop_path
                            ? `https://image.tmdb.org/t/p/w342${backdrop_path}`
                            : `https://www.marinavillakohsamui.com/modules/flexi/images/no-image.jpg`
                        }
                        alt={name ? name : title}
                        className='card-img'
                        effect='blur'
                      />
                    </div>
                    <div className='release-date'>
                      <p>{release_date ? release_date : first_air_date}</p>
                    </div>
                  </div>
                  <div className='recommendations-card-body'>
                    <p className='movie-name'>{title ? title : name}</p>
                    <p className='rating'>{`${
                      Math.round(vote_average) * 10
                    }%`}</p>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      ) : (
        <div className='no-recommendation'>{`No recommendation for ${
          movieData.title || movieData.name
        }`}</div>
      )}
    </div>
  );
};

export default Recommendation;
