import {all, fork} from 'redux-saga/effects';
import storeDetail from './storeDetail';
import reservationInfo from './reservationInfo';
import reviewList from './reviewList';
import reviewDetail from './reviewDetail';

export default function* sagas() {
  yield all([
    fork(storeDetail),
    fork(reservationInfo),
    fork(reviewList),
    fork(reviewDetail),
  ]);
}