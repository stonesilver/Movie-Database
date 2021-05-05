import React from 'react';
import LazyLoad from 'react-lazy-load';

class MyComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      imageURL: [
        'http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg',
        'http://apod.nasa.gov/apod/image/1502/2015_02_20_conj_bourque1024.jpg',
        'http://apod.nasa.gov/apod/image/1502/MarsPlume_jaeschke_480.gif',
        'http://apod.nasa.gov/apod/image/1502/ToadSky_Lane_1080_annotated.jpg'
      ],
    };
  }

  Images = ({ images }) => {
    return (
      <LazyLoad height={790} offsetVertical={300}>
        <div className='filler'>
          <img alt='keyy' src={images} />
        </div>
      </LazyLoad>
    );
  };

  render() {
    return (
      <div>
        Scroll to load images.
        {this.state.imageURL.map((img, index) => (
          <this.Images images={img} key={index}/>
        ))}
        {/* <div className='filler' />
        <LazyLoad height={762} offsetVertical={300}>
          <img
            alt='keyy'
            src='http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg'
          />
        </LazyLoad>
        <div className='filler' />
        <LazyLoad height={762} offsetTop={200}>
          <img
            alt='keyy'
            src='http://apod.nasa.gov/apod/image/1502/2015_02_20_conj_bourque1024.jpg'
          />
        </LazyLoad>
        <div className='filler' />
        <LazyLoad height={762} offsetHorizontal={50}>
          <img
            alt='keyy'
            src='http://apod.nasa.gov/apod/image/1502/MarsPlume_jaeschke_480.gif'
          />
        </LazyLoad>
        <div className='filler' />
        <LazyLoad
          height={762}
          onContentVisible={() =>
            console.log('look ma I have been lazyloaded!')
          }
        >
          <img
            alt='keyy'
            src='http://apod.nasa.gov/apod/image/1502/ToadSky_Lane_1080_annotated.jpg'
          />
        </LazyLoad>
        <div className='filler' /> */}
      </div>
    );
  }
}

export default MyComponent;
