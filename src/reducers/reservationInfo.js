import {FETCH_RESERVATION_INFO_SUCCEEDED, FETCH_RESERVATION_INFO_FAILED} from '../actions/actionTypes';

const reservationInfo = (state = {waitingCount: 0, status: 4}, action) => {
  switch (action.type) {
    case FETCH_RESERVATION_INFO_SUCCEEDED:
      return action.payload;
    case FETCH_RESERVATION_INFO_FAILED:
      console.error(action.error);
      return {waitingCount: 0, status: 4};
    default:
      return state;
  }
};

export default reservationInfo;