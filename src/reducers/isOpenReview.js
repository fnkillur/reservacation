import {TOGGLE_REVIEW} from '../actions/actionTypes';

const isOpenReview = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_REVIEW:
      return !state;
    default:
      return state;
  }
};

export default isOpenReview;