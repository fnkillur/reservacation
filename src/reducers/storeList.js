import {SET_STORE_LIST} from '../actions/actionTypes';

const storeList = (state = {stores: [], markers: []}, action) => {
  switch (action.type) {
    case SET_STORE_LIST:
      return action.storeList;
    default:
      return state;
  }
};

export default storeList;