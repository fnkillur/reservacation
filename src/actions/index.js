import * as types from './actionTypes';

export const setStoreList = storeList => ({
  type: types.SET_STORE_LIST,
  storeList
});

export const fetchStoreDetail = id => ({
  type: types.FETCH_STORE_DETAIL,
  id
});

export const fetchStoreDetailSucceeded = payload => ({
  type: types.FETCH_STORE_DETAIL_SUCCEEDED,
  payload
});

export const fetchStoreDetailFailed = error => ({
  type: types.FETCH_STORE_DETAIL_FAILED,
  error
});

export const updateFieldAuth = (key, value) => ({
  type: types.UPDATE_FIELD_AUTH,
  key,
  value
});

export const clearFieldAuth = () => ({
  type: types.CLEAR_FIELD_AUTH
});

export const updateFieldReview = (key, value) => ({
  type: types.UPDATE_FIELD_REVIEW,
  key,
  value
});

export const inputGuestCount = input => ({
  type: types.INPUT_GUEST_COUNT,
  input
});

export const fetchReservationInfo = id => ({
  type: types.FETCH_RESERVATION_INFO,
  id
});

export const fetchReservationInfoSucceeded = payload => ({
  type: types.FETCH_RESERVATION_INFO_SUCCEEDED,
  payload
});

export const fetchReservationInfoFailed = error => ({
  type: types.FETCH_RESERVATION_INFO_FAILED,
  error
});

export const fetchReviewList = (id, pageNo, perPageNo) => ({
  type: types.FETCH_REVIEW_LIST,
  id,
  pageNo,
  perPageNo
});

export const fetchReviewListSucceeded = payload => ({
  type: types.FETCH_REVIEW_LIST_SUCCEEDED,
  payload
});

export const fetchReviewListFailed = error => ({
  type: types.FETCH_REVIEW_LIST_FAILED,
  error
});