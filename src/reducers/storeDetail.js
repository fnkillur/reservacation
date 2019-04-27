import {FETCH_STORE_DETAIL_SUCCEEDED, FETCH_STORE_DETAIL_FAILED} from '../actions/actionTypes';

const storeDetail = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STORE_DETAIL_SUCCEEDED:
      return action.payload.data;
    case FETCH_STORE_DETAIL_FAILED:
      console.log(action.error);
      return {};
    default:
      return state;
  }
};

export default storeDetail;