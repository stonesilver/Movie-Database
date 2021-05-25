import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import movieImagesReducer from './root-reducer';

const middlewares = [logger, thunk];

const store = createStore(movieImagesReducer, applyMiddleware(...middlewares));

export default store;
