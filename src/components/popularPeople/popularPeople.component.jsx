import React, { useEffect, useState } from 'react';
import PeopleCard from '../peopleCard/peopleCard.component';
import PageLoader from '../PageLoader/PageLoader.component';
import ShowMore from '../showMore/show-more.component';
import './popularPeople.styles.scss';

const PopularPeople = () => {
  const [pageData, setPagedata] = useState({
    people: null,
    isLoading: true,
    currentPage: 2,
    isClicked: false,
  });

  const fetchData = () => {
    setPagedata((prevState) => ({ ...prevState, isLoading: true }));
    fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_URL}&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) =>
        setPagedata((prevState) => ({ ...prevState, people: data.results }))
      )
      .catch((err) =>
        setPagedata((prevState) => ({ ...prevState, isLoading: false }))
      );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showMorePage = async () => {
    await setPagedata((prevState) => ({
      ...prevState,
      currentPage: pageData.currentPage + 1,
      isClicked: true,
    }));
    fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_URL}&language=en-US&page=${pageData.currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPagedata((prevState) => ({
          ...prevState,
          people: [...pageData.people, ...data.results],
        }));
        setPagedata((prevState) => ({ ...prevState, isClicked: false }));
      })
      .catch((err) => {
        // console.log(err);
        setPagedata((prevState) => ({ ...prevState, isClicked: false }));
        if (pageData.currentPage > 0) {
          setPagedata((prevState) => ({
            ...prevState,
            currentPage: pageData.currentPage - 1,
          }));
        }
      });
  };
  const { people, isLoading, isClicked } = pageData;
  return people ? (
    <div className='popular-people-page-container'>
      <h3 className='movie-header'>Popular People</h3>
      <div className='popular-people-page-row'>
        {people.map(({ name, profile_path, known_for, id }) => (
          <PeopleCard
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w780${profile_path}`
                : 'https://tjszkxabrz-flywheel.netdna-ssl.com/wp-content/uploads/2016/05/No-Image.jpg'
            }
            name={name}
            knownFor={known_for}
            key={id}
            id={id}
            height={268}
          />
        ))}
      </div>
      <ShowMore showMorePage={showMorePage} isClicked={isClicked} />
    </div>
  ) : (
    <PageLoader isLoading={isLoading} refetchData={fetchData} />
  );
};

export default PopularPeople;
