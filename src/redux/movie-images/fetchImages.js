import {
  fetchImagePending,
  fetchImageSuccess,
  fetchImageError,
} from './actions';

const fetchImages = (url) => {
  console.log('url', url)
  return (dispatch) => {
    dispatch(fetchImagePending());
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        dispatch(fetchImageSuccess(data.posters ? data.posters : data.profiles));
      })
      .catch((error) => {
        dispatch(fetchImageError(error));
      });
  };
};

export default fetchImages;
