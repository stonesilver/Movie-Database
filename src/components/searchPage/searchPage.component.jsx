import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import CollectionCard from '../collectionCard/collection-card.component';
import CompanyCard from '../companyCard/companyCard.component';
import KeywordCard from '../keywordCard/keywordCard.component';
import SearchPageLeftColumn from '../searchPageLeftColumn/searchPageLeftColumn.component';
import SearchPagePagination from '../searchPagePagination/searchPagePagination.component';
import BlanketElement from '../blanket-element/blanket-element.component';
import './searchPage.styles.scss';

const SearchPage = () => {
  const [searchData, setSearchData] = useState({
    dataFetched: false,
    movie: [],
    tv: [],
    people: [],
    company: [],
    keyword: [],
    collection: [],
    network: [],
  });
  const [searchResultOnDisplay, setSearchResultOnDisplay] = useState({
    results: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const history = useHistory();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const searchQuery = useQuery().get('query');
  const pageQuery = useQuery().get('page');
  const [tabSelected, setTabSelected] = useState('tv');
  const setdisplayAndTab = (obj, str) => {
    setTabSelected(str);
    return obj;
  };

  const fetchData = useCallback(() => {
    setIsLoading(true);
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_URL}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
      ),
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_URL}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
      ),
      fetch(
        `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_URL}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
      ),
      fetch(
        `https://api.themoviedb.org/3/search/company?api_key=${process.env.REACT_APP_API_URL}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
      ),
      fetch(
        `https://api.themoviedb.org/3/search/keyword?api_key=${process.env.REACT_APP_API_URL}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
      ),
      fetch(
        `https://api.themoviedb.org/3/search/collection?api_key=${process.env.REACT_APP_API_URL}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
      ),
      fetch(
        `https://api.themoviedb.org/3/search/network?api_key=${process.env.REACT_APP_API_URL}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
      ),
    ])
      .then(([movie, tv, people, company, keyword, collection, network]) =>
        Promise.all([
          movie.json(),
          tv.json(),
          people.json(),
          company.json(),
          keyword.json(),
          collection.json(),
          network.json(),
        ])
      )
      .then(([movie, tv, people, company, keyword, collection, network]) => {
        setSearchData((prevState) => ({
          ...prevState,
          dataFetched: true,
          movie: movie || {},
          tv: tv || {},
          people: people || {},
          company: company || {},
          keyword: keyword || {},
          collection: collection || {},
          network: network || {},
        }));
        setSearchResultOnDisplay((prevState) =>
          tv.total_results
            ? setdisplayAndTab(tv, 'tv')
            : movie.total_results
            ? setdisplayAndTab(movie, 'movie')
            : people.total_results
            ? setdisplayAndTab(people, 'people')
            : company.total_results
            ? setdisplayAndTab(company, 'company')
            : keyword.total_results
            ? setdisplayAndTab(keyword, 'keyword')
            : collection.total_results
            ? setdisplayAndTab(collection, 'collection')
            : network.total_results
            ? setdisplayAndTab(network, 'network')
            : {
                results: [],
              }
        );
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [searchQuery]);

  useEffect(() => {
    fetchData();
    return setSearchData((prevState) => ({
      ...prevState,
      dataFetched: false,
    }));
  }, [fetchData]);
  const {
    dataFetched,
    movie,
    tv,
    people,
    company,
    keyword,
    collection,
    network,
  } = searchData;

  //

  const setSearchResultOnDisplayOnClick = (obj, str) => {
    if (!obj.results) return;
    let pathname = location.pathname;
    // returns path: '/app/books'
    let searchParams = new URLSearchParams(location.search);
    // returns the existing query string: '?type=fiction&author=fahid'
    searchParams.set('page', 1);
    history.push({
      pathname: pathname,
      search: searchParams.toString(),
    });
    setSearchResultOnDisplay(setdisplayAndTab(obj, str));
  };

  const fetchPaination = (e, value) => {
    let page = e.target.dataset.page;
    let pathname = location.pathname;
    // returns path: '/app/books'
    let searchParams = new URLSearchParams(location.search);
    // returns the existing query string: '?type=fiction&author=fahid'
    searchParams.set('page', value);
    history.push({
      pathname: pathname,
      search: searchParams.toString(),
    });
    setSearchData((prevState) => ({
      ...prevState,
      dataFetched: false,
    }));
    setSearchResultOnDisplay({ results: [] });
    window.scrollTo(0, 0);
    fetch(
      `https://api.themoviedb.org/3/search/${tabSelected}?api_key=${process.env.REACT_APP_API_URL}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchResultOnDisplay(data);
        setSearchData((prevState) => ({
          ...prevState,
          dataFetched: true,
        }));
      })
      .catch((err) => console.log(err));
    return setSearchResultOnDisplay({ results: [] });
  };

  console.log('searchResultOnDisplay', searchResultOnDisplay);
  console.log('searchData', searchData);

  return (
    <div className='search-page'>
      <div className='search-page-container'>
        <SearchPageLeftColumn
          movie={movie}
          tv={tv}
          people={people}
          company={company}
          keyword={keyword}
          collection={collection}
          network={network}
          setSearchResultOnDisplayOnClick={setSearchResultOnDisplayOnClick}
          tabSelected={tabSelected}
        />
        <div className='search-page-right-column'>
          {dataFetched ? (
            searchResultOnDisplay.results.length ? (
              searchResultOnDisplay.results.map(
                ({
                  id,
                  title,
                  name,
                  overview,
                  logo_path,
                  poster_path,
                  profile_path,
                  first_air_date,
                  release_date,
                  origin_country,
                  known_for_department,
                }) =>
                  tabSelected === 'company' || tabSelected === 'network' ? (
                    <CompanyCard
                      key={id}
                      name={name}
                      logo_path={logo_path}
                      origin_country={origin_country}
                    />
                  ) : tabSelected === 'keyword' ? (
                    <KeywordCard key={id} keyword={name} />
                  ) : (
                    <CollectionCard
                      key={id}
                      type={known_for_department ? true : false}
                      title={title || name}
                      name={name}
                      id={id}
                      known_for_department={known_for_department}
                      overview={overview}
                      posterPath={poster_path || profile_path}
                      releaseDate={release_date || first_air_date}
                    />
                  )
              )
            ) : (
              <div className='no-search-found'>
                There are no movies that matched your query.
              </div>
            )
          ) : (
            <BlanketElement isLoading={isLoading} refetchData={fetchData} />
          )}
          <SearchPagePagination
            totalPages={
              searchResultOnDisplay.total_pages
                ? searchResultOnDisplay.total_pages
                : 0
            }
            fetchPaination={fetchPaination}
            query={pageQuery}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
