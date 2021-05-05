import React from 'react';
import { useParams } from 'react-router-dom';
import './backdropPageLeftColumn.styles.scss';

const BackdropPageLeftColumn = ({
  displayImagesOnclick,
  videoByCategory,
  videos,
  images,
  newFilteredLanguage,
}) => {
  const { episodeVideos, imageType } = useParams();
  const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
  return (
    <div className='left-side'>
      <div className='left-side-container'>
        <div className='header-and-icon'>
          <p className='header'>
            {episodeVideos
              ? episodeVideos.toUpperCase()
              : imageType.toUpperCase()}
          </p>
          <span className='far fa-question-circle'></span>
        </div>
        <div className='backdrop-language'>
          {imageType === 'videos' || episodeVideos === 'videos' ? (
            <>
              <div
                className='language'
                onClick={(e) => displayImagesOnclick(videos, e, 'videos')}
              >
                <span>All</span>
                <span className='count'>{videos.length}</span>
              </div>
              <div
                className='language'
                onClick={(e) =>
                  displayImagesOnclick(videoByCategory('Trailer'), e, 'Trailer')
                }
              >
                <span>Trailers</span>
                <span className='count'>
                  {videoByCategory('Trailer').length}
                </span>
              </div>
              <div
                className='language'
                onClick={(e) =>
                  displayImagesOnclick(videoByCategory('Teaser'), e, 'Teaser')
                }
              >
                <span>Teasers</span>
                <span className='count'>
                  {videoByCategory('Teaser').length}
                </span>
              </div>
              <div
                className='language'
                onClick={(e) =>
                  displayImagesOnclick(videoByCategory('Clip'), e, 'Clip')
                }
              >
                <span>Clips</span>
                <span className='count'>{videoByCategory('Clip').length}</span>
              </div>
              <div
                className='language'
                onClick={(e) =>
                  displayImagesOnclick(
                    videoByCategory('Behind_the_scene'),
                    e,
                    'Behind the scene'
                  )
                }
              >
                <span>Behind the Scenes</span>
                <span className='count'>
                  {videoByCategory('Behind_the_scene').length}
                </span>
              </div>
              <div
                className='language'
                onClick={(e) =>
                  displayImagesOnclick(videoByCategory('Blooper'), e, 'Blooper')
                }
              >
                <span>Bloopers</span>
                <span className='count'>
                  {videoByCategory('Blooper').length}
                </span>
              </div>
              <div
                className='language'
                onClick={(e) =>
                  displayImagesOnclick(
                    videoByCategory('Featurette'),
                    e,
                    'Featurette'
                  )
                }
              >
                <span>Featurettes</span>
                <span className='count'>
                  {videoByCategory('Featurette').length}
                </span>
              </div>
            </>
          ) : (
            <>
              <div
                className='language'
                onClick={(e) => displayImagesOnclick(images, e, 'images')}
              >
                <span>All</span>
                <span className='count'>{images.length}</span>
              </div>
              {newFilteredLanguage.map((category, index) => (
                <div
                  className='language'
                  key={index}
                  onClick={(e) => displayImagesOnclick(category, e)}
                >
                  <span>
                    {languageNames.of(`${category[0].iso_639_1}`) === 'null' ||
                    languageNames.of(`${category[0].iso_639_1}`) === 'xx'
                      ? 'No Language'
                      : languageNames.of(`${category[0].iso_639_1}`)}
                  </span>
                  <span className='count'>{category.length}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackdropPageLeftColumn;
