import {combineReducers} from 'redux';
import storeList from './storeList';
import markers from './markers';
import isSearchable from './isSearchable';
import store from './store';
import isOpenReview from './isOpenReview';
import user from './user';

const reducer = combineReducers({
  storeList,
  markers,
  isSearchable,
  store,
  isOpenReview,
  user
});

export default reducer;