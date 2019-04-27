import {FETCH_REVIEW_LIST_SUCCEEDED, FETCH_REVIEW_LIST_FAILED} from '../actions/actionTypes';

const initState = {totalPageCount: 0, data: []};

const reviewList = (state = initState, action) => {
  switch (action.type) {
    case FETCH_REVIEW_LIST_SUCCEEDED:
      return action.payload.data;
    case FETCH_REVIEW_LIST_FAILED:
      console.error(action.error);
      return {...initState};
    default:
      return state;
  }
};

export default reviewList;