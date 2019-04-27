import {put, takeEvery} from 'redux-saga/effects';
import {getReviewsByStoreId} from '../_common/services/review.service';
import {fetchReviewListFailed, fetchReviewListSucceeded} from '../actions';
import {FETCH_REVIEW_LIST} from '../actions/actionTypes';

function* fetchReviewList(action) {
  try {
    const response = yield getReviewsByStoreId(action.id, action.pageNo, action.perPageNo);
    yield put(fetchReviewListSucceeded(response));
  } catch (error) {
    yield put(fetchReviewListFailed(error));
  }
}

export default function* watchFetchReviewList() {
  yield takeEvery(FETCH_REVIEW_LIST, fetchReviewList);
}