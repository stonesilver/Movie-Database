import { imagesActionType } from './actionTypes';

const INITIAL_STATE = {
  openTab: false,
  pending: false,
  error: null,
  images: [],
  currentImage: 0,
  imgLoaded: false,
};

const movieImagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case imagesActionType.SET_TAB:
      return {
        ...state,
        openTab: !state.openTab,
        images: [],
        currentImage: 0,
      };

    case imagesActionType.FETCH_IMAGES_PENDING:
      return {
        ...state,
        pending: true,
      };
    case imagesActionType.FETCH_IMAGES_SUCCESS:
      return {
        ...state,
        pending: false,
        images: action.payload,
      };
    case imagesActionType.FETCH_IMAGES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case imagesActionType.NEXT_IMAGE:
      return {
        ...state,
        currentImage:
          state.images.length - 1 > state.currentImage
            ? state.currentImage + 1
            : 0,
        imgLoaded: false,
      };
    case imagesActionType.PREVIOUS_IMAGE:
      return {
        ...state,
        currentImage:
          state.currentImage <= state.images.length - 1 &&
          state.currentImage > 0
            ? state.currentImage - 1
            : state.images.length - 1,
        imgLoaded: false,
      };
    case imagesActionType.IMAGE_ON_LOAD:
      return {
        ...state,
        imgLoaded: true,
      };

    default:
      return state;
  }
};

export default movieImagesReducer;
