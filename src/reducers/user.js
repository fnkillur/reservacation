import {INPUT_USER_INFO} from "../actions/actionTypes";

const user = (state = {email: '', password: '', rePassword: '', phone: '', name: ''}, action) => {
  switch (action.type) {
    case INPUT_USER_INFO:
      return {...state, [action.input.name]: action.input.value};
    default:
      return state;
  }
};

export default user;