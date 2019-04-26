import {INPUT_GUEST_COUNT} from '../actions/actionTypes';

const guestCount = (state = 0, action) => {
  switch (action.type) {
    case INPUT_GUEST_COUNT:
      return action.input;
    default:
      return state;
  }
};

export default guestCount;