import {TOGGLE_SEARCH} from '../actions/actionTypes';

const isSearchable = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_SEARCH:
      return action.isSearchable;
    default:
      return state;
  }
};

export default isSearchable;