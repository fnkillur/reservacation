import {FETCH_STORE_SUCCEEDED, FETCH_STORE_FAILED} from '../actions/actionTypes';

const store = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STORE_SUCCEEDED:
      return action.payload.data;
    case FETCH_STORE_FAILED:
      console.log(action.error);
      return {};
    default:
      return state;
  }
};

export default store;