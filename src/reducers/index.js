import {combineReducers} from 'redux';
import storeList from './storeList';
import markers from './markers';
import storeDetail from './storeDetail';
import user from './user';
import guestCount from './guestCount';
import reservationInfo from './reservationInfo';
import reviewList from './reviewList';

const reducer = combineReducers({
  storeList,
  markers,
  storeDetail,
  user,
  guestCount,
  reservationInfo,
  reviewList
});

export default reducer;