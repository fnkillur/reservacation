import * as types from './actionTypes';

export const setStoreList = storeList => ({
  type: types.SET_STORE_LIST,
  storeList
});

export const setMarkers = markers => ({
  type: types.SET_MARKERS,
  markers
});

export const fetchStore = id => ({
  type: types.FETCH_STORE,
  id
});

export const fetchStoreSucceeded = payload => ({
  type: types.FETCH_STORE_SUCCEEDED,
  payload
});

export const fetchStoreFailed = error => ({
  type: types.FETCH_STORE_FAILED,
  error
});

export const inputUserInfo = input => ({
  type: types.INPUT_USER_INFO,
  input
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