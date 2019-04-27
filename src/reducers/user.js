import {UPDATE_FIELD_AUTH, CLEAR_FIELD_AUTH} from "../actions/actionTypes";

const initState = {email: '', password: '', rePassword: '', phone: '', name: ''};

const user = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_FIELD_AUTH:
      return {...state, [action.key]: action.value};
    case CLEAR_FIELD_AUTH:
      return {...initState};
    default:
      return state;
  }
};

export default user;