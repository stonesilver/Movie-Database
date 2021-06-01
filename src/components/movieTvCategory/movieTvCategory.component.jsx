import React, { useEffect, useState, useCallback } from 'react';
import LeftColumn from '../leftColumn/leftColumn.component';
import RightColumn from '../rightColumn/rightColumn.component';
import BlanketElement from '../blanket-element/blanket-element.component';
import { Container } from 'react-bootstrap';
import './movieTvCategory.styles.scss';

const MovieTvCategory = ({ title, movieType, movieCategory }) => {
  const [movieData, setMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [totalPage, setTotalPage] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [sortTab, setSortTab] = useState(true);
  const [filterTab, setFilterTab] = useState(false);
  const [pageIsFiltered, setPageIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState({
    popularitySelectValue: 'popularity.desc',
    isRelease: true,
    fromDate: '',
    toDate: '',
    genre: [],
    certification: [],
  });

  const movieGenreArray = [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ];

  const tvGenreArray = [
    {
      id: 10759,
      name: 'Action & Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 10762,
      name: 'Kids',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10763,
      name: 'News',
    },
    {
      id: 10764,
      name: 'Reality',
    },
    {
      id: 10765,
      name: 'Sci-Fi & Fantasy',
    },
    {
      id: 10766,
      name: 'Soap',
    },
    {
      id: 10767,
      name: 'Talk',
    },
    {
      id: 10768,
      name: 'War & Politics',
    },
    {
      id: 37,
      name: 'Western',
    },
  ];

  const certificationArray = ['NR', 'G', 'PG', 'PG-13', 'R', 'NC-17'];

  const fetchData = useCallback(() => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/${movieType}/${movieCategory}?api_key=${process.env.REACT_APP_API_URL}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieData(data.results);
        setTotalPage(data.total_pages);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
        console.log(err);
      });
  }, [movieType, movieCategory]);

  useEffect(() => {
    fetchData();

    return setMovieData([]);
  }, [fetchData]);

  const {
    popularitySelectValue,
    fromDate,
    toDate,
    genre,
    certification,
  } = formState;

  const onClickHandler = (sort) =>
    sort ? setSortTab(!sortTab) : setFilterTab(!filterTab);

  const onSubmit = (event) => {
    event.preventDefault();
    setPageIsFiltered(true);
    fetch(
      `https://api.themoviedb.org/3/discover/${movieType}?api_key=${
        process.env.REACT_APP_API_URL
      }${popularitySelectValue ? `&sort_by=${popularitySelectValue}` : ''}${
        fromDate ? `&primary_release_date.gte=${fromDate}` : ''
      }${toDate ? `&primary_release_date.lte=${toDate}` : ''}${
        genre.length ? `&with_genres=${genre}` : ''
      }${
        certification.length
          ? `&certification_country=US&certification=${certification}`
          : ''
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovieData([...data.results]);
        setTotalPage(data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });

    return setMovieData([]);
  };

  const onChange = async (e) => {
    const { name, type, value, checked } = e.target;
    const DerivedValue = type === 'checkbox' ? checked : value;
    setFormState({ ...formState, [name]: DerivedValue });
  };

  const addToCategory = (e, name, categoryType) => {
    e.target.style.backgroundColor = '#ffffff';
    e.target.style.color = '#000000';
    setFormState({
      ...formState,
      [categoryType]: [...formState[categoryType], name],
    });
  };

  const removeCategory = (e, name, categoryType) => {
    e.target.style.backgroundColor = '#161616';
    e.target.style.color = '#ffffff';
    e.target.style.border = '1px solid black';
    formState[categoryType].splice(formState[categoryType].indexOf(name), 1);
  };

  const genreCertificationOnClick = (e, typeClick) => {
    const name = e.target.dataset.name;
    return typeClick
      ? !formState.genre.includes(name)
        ? addToCategory(e, name, 'genre')
        : removeCategory(e, name, 'genre')
      : !formState.certification.includes(name)
      ? addToCategory(e, name, 'certification')
      : removeCategory(e, name, 'certification');
  };

  const showMorePage = () => {
    if (currentPage >= totalPage) {
      return;
    }
    // else {
    //   setCurrentPage(currentPage + 1);
    // }
    const filtered = pageIsFiltered
      ? `https://api.themoviedb.org/3/discover/${movieType}?api_key=${
          process.env.REACT_APP_API_URL
        }&language=en-US${
          popularitySelectValue ? `&sort_by=${popularitySelectValue}` : ''
        }${fromDate ? `&primary_release_date.gte=${fromDate}` : ''}${
          toDate ? `&primary_release_date.lte=${toDate}` : ''
        }${genre.length ? `&with_genres=${genre}` : ''}${
          certification.length
            ? `&certification_country=US&certification=${certification}`
            : ''
        }&page=${currentPage}`
      : `https://api.themoviedb.org/3/${movieType}/${movieCategory}?api_key=${process.env.REACT_APP_API_URL}&language=en-US&page=${currentPage}`;

    setIsClicked(true);
    if (totalPage >= currentPage) {
      fetch(filtered)
        .then((res) => res.json())
        .then((data) => {
          setTotalPage(data.total_pages);
          setMovieData([...movieData, ...data.results]);
          setIsClicked(false);
          setCurrentPage(currentPage + 1);
        })
        .catch((err) => {
          console.log(err);
          setIsClicked(false);
          // if (currentPage > 0) {
          setCurrentPage(currentPage);
          // }
        });
    }
  };

  return (
    <Container fluid className='movie-tv-category'>
      <h3 className='movie-header'>{title}</h3>
      <div className='page-body'>
        <div className='filter-body'>
          <LeftColumn
            sortTab={sortTab}
            filterTab={filterTab}
            formState={formState}
            movieGenreArray={movieGenreArray}
            tvGenreArray={tvGenreArray}
            certificationArray={certificationArray}
            onClickHandler={onClickHandler}
            onSubmit={onSubmit}
            onChange={onChange}
            genreCertificationOnClick={genreCertificationOnClick}
            movieType={movieType}
          />
        </div>
        <div className='movie-tv-category-display-body'>
          {
            movieData.length ? (
              <RightColumn
                movieData={movieData}
                showMorePage={showMorePage}
                isClicked={isClicked}
                loading={false}
              />
            ) : error ? (
              <BlanketElement isLoading={isLoading} refetchData={fetchData} />
            ) : (
              <RightColumn
                movieData={[...Array(19).keys()]}
                showMorePage={showMorePage}
                isClicked={isClicked}
                loading={true}
              />
            )
          }
        </div>
      </div>
    </Container>
  );
};

export default MovieTvCategory;
