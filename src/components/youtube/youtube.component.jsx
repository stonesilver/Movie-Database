import React from 'react';
import './youtube.styles.scss';

const YoutubeIframe = ({history, match}) => {
  console.log('path', match)
// function onYouTubeIframeAPIReady() {
//     console.log('API ready')
//     var player = new YT.Player('ytplayer', {
//         events: {
//             onReady: function() {
//                 console.log('player ready')
//                 player.playVideo()
//                 console.log(player.getDuration())
//             }
//         }
//     })
// }
  return (
  <div className='youtube-iframe'>
    <div className='frame-container'>
        <a href='###' title='close' onClick={() => history.goBack()}>&times;</a>
      <iframe
        width='100%'
        height='100%'
        src= {`https://www.youtube.com/embed/${match.params.youtubeID}`}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='iframe'
      ></iframe>
    </div>
  </div>
)};

export default YoutubeIframe;
