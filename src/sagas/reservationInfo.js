import {all, put, takeEvery} from 'redux-saga/effects';
import {getWaitingCount, getMyReservation} from '../_common/services/booking.service';
import {fetchReservationInfoSucceeded, fetchReservationInfoFailed} from '../actions';
import {FETCH_RESERVATION_INFO} from '../actions/actionTypes';

function* fetchReservationInfo(action) {
  try {
    const [res1, res2] = yield all([getWaitingCount(action.id), getMyReservation(action.id)]);
    yield put(fetchReservationInfoSucceeded({waitingCount: res1.data.waitingCount, status: res2.data || 4}));
  } catch (error) {
    yield put(fetchReservationInfoFailed(error));
  }
}

export default function* watchFetchReservationInfo() {
  yield takeEvery(FETCH_RESERVATION_INFO, fetchReservationInfo);
}