import { imagesActionType } from './actionTypes';

export const setOpenTab = () => ({
  type: imagesActionType.SET_TAB,
});

export const fetchImagePending = () => {
  return {
    type: imagesActionType.FETCH_IMAGES_PENDING,
  };
};

export const fetchImageSuccess = (data) => {
  return {
    type: imagesActionType.FETCH_IMAGES_SUCCESS,
    payload: data,
  };
};

export const fetchImageError = (error) => {
  return {
    type: imagesActionType.FETCH_IMAGES_ERROR,
    error,
  };
};

export const nextImage = () => {
  return {
    type: imagesActionType.NEXT_IMAGE,
  };
};

export const previousImage = () => {
  return {
    type: imagesActionType.PREVIOUS_IMAGE,
  };
};

export const imageOnLoad = () => {
  return {
    type: imagesActionType.IMAGE_ON_LOAD,
  };
};
