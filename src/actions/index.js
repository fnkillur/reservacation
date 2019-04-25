import * as types from './actionTypes';

export const setStoreList = storeList => ({
  type: types.SET_STORE_LIST,
  storeList
});

export const setMarkers = markers => ({
  type: types.SET_MARKERS,
  markers
});

export const toggleSearch = isSearchable => ({
  type: types.TOGGLE_SEARCH,
  isSearchable
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

export const toggleReview = () => ({
  type: types.TOGGLE_REVIEW
});

export const inputUserInfo = input => ({
  type: types.INPUT_USER_INFO,
  input
});