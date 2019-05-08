import {FETCH_REVIEW_DETAIL_FAILED, FETCH_REVIEW_DETAIL_SUCCEEDED} from '../actions/actionTypes';

const reviewDetail = (state = '', action) => {
  switch (action.type) {
    case FETCH_REVIEW_DETAIL_SUCCEEDED:
      return action.payload.data;
    case FETCH_REVIEW_DETAIL_FAILED:
      console.error(action.error);
      return '';
    default:
      return state;
  }
};

export default reviewDetail;