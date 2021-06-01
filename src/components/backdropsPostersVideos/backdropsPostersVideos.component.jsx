import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import DetailNav from '../detail-nav/detail-nav.component';
import LinkHeader from '../link-header/link-header.component';
import NextPrevious from '../nextAndPrevious/nextAndPrevious.component';
import BlanketElement from '../blanket-element/blanket-element.component';
import BackdropPageLeftColumn from '../backdropPageLeftColumn/backdropPageLeftColumn.component';
import BackdropPageRightColumn from '../backdropPageRightColumn/backdropPageRightColumn.component';
import './backdropsPostersVideos.styles.scss';

const BackdropsPostersVideos = ({
  match: {
    params: {
      movieDetail,
      seasonNumber,
      episodeNumber,
      imageType,
      episodeVideos,
    },
    path,
  },
}) => {
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [episodeVideo, setEpisodeVideo] = useState([]);
  const [mediaToDisplay, setMediaToDisplay] = useState([]);
  const [currentTab, setCurrentTab] = useState('Videos');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    if (seasonNumber) {
      fetch(
        `https://api.themoviedb.org/3/tv/${movieDetail.match(
          /\d{1,}/
        )}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${
          process.env.REACT_APP_API_URL
        }&append_to_response=images,videos`
      )
        .then((res) => res.json())
        .then((data) => {
          setMediaToDisplay(
            episodeVideos
              ? data.videos.results
              : imageType === 'backdrops'
              ? data.images.stills
              : imageType === 'posters'
              ? data.images.stills
              : []
          );
          setImages(data.images.stills);
          setEpisodeVideo(data.videos.results);
          setData(data);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      const pathType = path.match(/tv/) ? 'tv' : 'movie';
      fetch(
        `https://api.themoviedb.org/3/${pathType}/${movieDetail.match(
          /\d{1,}/
        )}?api_key=${
          process.env.REACT_APP_API_URL
        }&append_to_response=images,videos`
      )
        .then((res) => res.json())
        .then((data) => {
          setMediaToDisplay(
            data.images[`${imageType}`]
              ? data.images[`${imageType}`]
              : data.videos.results
              ? data.videos.results
              : []
          );
          setImages(
            data.images[`${imageType}`] ? data.images[`${imageType}`] : []
          );
          setVideos(data.videos.results);
          setData(data);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [
    episodeNumber,
    episodeVideos,
    path,
    seasonNumber,
    imageType,
    movieDetail,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [fetchData]);

  const filteredLanguageList = [];
  const filteredLanguage = [];

  images.forEach((item) => {
    if (!filteredLanguageList.includes(item.iso_639_1)) {
      let filter = images.filter((tem) => tem.iso_639_1 === item.iso_639_1);
      filteredLanguage.push(filter);
      filteredLanguageList.push(item.iso_639_1);
    }
  });

  let find = filteredLanguage.find((item) => item[0].iso_639_1 === 'xx');

  let indexGet = filteredLanguage.findIndex(
    (item) => item[0].iso_639_1 === null
  );

  let newFilteredLanguage = [];
  filteredLanguage.forEach((item, index) => {
    if (index === indexGet && find) {
      newFilteredLanguage.push([...item, ...find]);
    } else if (item[0].iso_639_1 === 'xx') {
      return;
    } else {
      newFilteredLanguage.push(item);
    }
  });

  const displayImagesOnclick = (data, e, tab) => {
    document.querySelectorAll('.language').forEach((item) => {
      item.style.background = 'rgb(53, 51, 51)';
    });
    e.currentTarget.style.background = ' #ffc107';
    setMediaToDisplay(data);
    setCurrentTab(tab);
  };

  const videoByCategory = (type) => {
    if (videos.length) {
      return videos.filter((category) => category.type === type);
    } else {
      return episodeVideo.filter((category) => category.type === type);
    }
  };

  return data.id ? (
    <div className='season-backdrops'>
      {window.scrollTo(0, 0)}
      <DetailNav />
      <LinkHeader
        movieData={data}
        backLink={
          episodeVideos
            ? `/episode/${episodeNumber}/videos`
            : seasonNumber
            ? `/episode/${episodeNumber}/images/backdrops`
            : `/images/${imageType}`
        }
        linkText={seasonNumber ? 'episodes' : 'main'}
      />
      <NextPrevious />
      <div className='season-backdrops-container'>
        <BackdropPageLeftColumn
          displayImagesOnclick={displayImagesOnclick}
          videoByCategory={videoByCategory}
          videos={videos}
          images={images}
          newFilteredLanguage={newFilteredLanguage}
        />
        <BackdropPageRightColumn
          mediaToDisplay={mediaToDisplay}
          currentTab={currentTab}
          data={data}
        />
      </div>
    </div>
  ) : (
    <BlanketElement isLoading={isLoading} refetchData={fetchData} />
  );
};

export default withRouter(BackdropsPostersVideos);
