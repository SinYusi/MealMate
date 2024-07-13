import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./authActions";


const initialState = {
  token: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log('로그인 성공')
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
