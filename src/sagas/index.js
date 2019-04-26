import {all, fork} from 'redux-saga/effects';
import storeSaga from './store';
import reservationInfo from './reservationInfo';

export default function* sagas() {
  yield all([fork(storeSaga), fork(reservationInfo)]);
}