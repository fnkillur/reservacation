import {put, takeEvery} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import {getStoreById} from '../_common/services/store.service';
import {fetchStoreSucceeded, fetchStoreFailed} from '../actions';

function* fetchStore(action) {
  try {
    const response = yield getStoreById(action.id);
    yield put(fetchStoreSucceeded(response));
  } catch (error) {
    yield put(fetchStoreFailed(error));
  }
}

export default function* storeSaga() {
  yield takeEvery(types.FETCH_STORE, fetchStore);
}