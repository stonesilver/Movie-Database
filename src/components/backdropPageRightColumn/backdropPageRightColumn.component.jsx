import React from 'react'
import BackdropCard from '../backdrop-card/backdrop-card.component';
import VideoCard from '../videoCard/videoCard.component';
import {useParams} from 'react-router-dom'
import './backdropPageRightColumn.styles.scss'

const BackdropPageRightColumn = ({mediaToDisplay, currentTab, data}) => {
    const {imageType, episodeVideos} = useParams()
    return (
        <div
          className={`right-side ${imageType === 'posters' ? 'poster-grid' : ''}`}
          style={{
            display: imageType === 'videos' || episodeVideos ? 'block' : 'grid',
          }}
        >
          {!mediaToDisplay.length ? (
            <div className='empty-media'>
              <p>
                {`There are no ${currentTab} added to ${
                  data.name || data.title
                }`}
              </p>
            </div>
          ) : imageType === 'videos' ? (
            mediaToDisplay.map(({ name, key, type }) => (
              <VideoCard name={name} key={key} videoKey={key} type={type} />
            ))
          ) : (
            mediaToDisplay.map(
              ({ file_path, width, height, iso_639_1 }, index) => (
                <BackdropCard
                  file_path={file_path}
                  width={width}
                  height={height}
                  key={index}
                  iso_639_1={iso_639_1}
                />
              )
            )
          )}
        </div>
    )
}

export default BackdropPageRightColumn