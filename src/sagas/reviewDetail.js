import {put, takeEvery} from 'redux-saga/effects';
import {getReview} from '../_common/services/review.service';
import {fetchReviewDetailFailed, fetchReviewDetailSucceeded} from '../actions';
import {FETCH_REVIEW_DETAIL} from '../actions/actionTypes';

function* fetchReviewDetail(action) {
  try {
    const response = yield getReview(action.id);
    yield put(fetchReviewDetailSucceeded(response));
  } catch (error) {
    yield put(fetchReviewDetailFailed(error));
  }
}

export default function* watchFetchReviewDetail() {
  yield takeEvery(FETCH_REVIEW_DETAIL, fetchReviewDetail);
}