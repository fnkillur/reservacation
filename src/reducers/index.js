import {combineReducers} from 'redux';
import storeList from './storeList';
import markers from './markers';
import store from './store';
import user from './user';
import guestCount from './guestCount';
import reservationInfo from './reservationInfo';

const reducer = combineReducers({
  storeList,
  markers,
  store,
  user,
  guestCount,
  reservationInfo
});

export default reducer;