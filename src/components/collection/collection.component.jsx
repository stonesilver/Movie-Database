import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './collection.styles.scss';

const Collection = ({ collection }) => {
  const [collectionData, setcollectionData] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/collection/${collection.belongs_to_collection.id}?api_key=${process.env.REACT_APP_API_URL}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setcollectionData(data))
      .catch((err) => console.log(err));
  }, [collection.belongs_to_collection.id]);

  let filteredCollection = [];
  if (collectionData.parts) {
    filteredCollection = collectionData.parts.filter(
      (item) => item.id !== collection.id
    );
  }
  console.log(filteredCollection);
  return filteredCollection.length ? (
    <div className='collection'>
      <div
        className='collection-container'
        style={{
          backgroundImage: `linear-gradient(rgba(39, 39, 41, 0.4), rgba(36, 36, 39, 0.8)),
          url("https://image.tmdb.org/t/p/original${collectionData.backdrop_path}")`,
        }}
      >
        <p className='header'>{`Part of The ${collectionData.name}`}</p>
        <p className='includes'>
          Includes{' '}
          {filteredCollection.map(({ title, id }) => (
            <span key={id}>{title}, </span>
          ))}
        </p>
        <p className='view-collection'>
          <Link
            to={`/collection/${collectionData.id}-${collectionData.name
              .match(/\w|\s/g)
              .join('')
              .replace(/\s/g, '-')
              .toLowerCase()}`}
          >
            VIEW THE COLLECTION
          </Link>
        </p>
      </div>
      <hr />
    </div>
  ) : (
    ''
  );
};

export default Collection;
