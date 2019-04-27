import {put, takeEvery} from 'redux-saga/effects';
import {FETCH_STORE_DETAIL} from '../actions/actionTypes';
import {getStoreById} from '../_common/services/store.service';
import {fetchStoreDetailSucceeded, fetchStoreDetailFailed} from '../actions';

function* fetchStoreDetail(action) {
  try {
    const response = yield getStoreById(action.id);
    yield put(fetchStoreDetailSucceeded(response));
  } catch (error) {
    yield put(fetchStoreDetailFailed(error));
  }
}

export default function* watchStoreSaga() {
  yield takeEvery(FETCH_STORE_DETAIL, fetchStoreDetail);
}
