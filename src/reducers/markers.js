import {SET_MARKERS} from '../actions/actionTypes';

const markers = (state = [], action) => {
  switch (action.type) {
    case SET_MARKERS:
      return action.markers;
    default:
      return state;
  }
};

export default markers;