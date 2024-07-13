import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const login = (token) => (dispatch) => {
  cookies.set('access_token', token, {
    path: '/',
    httpOnly: false,
    secure: true,
    sameSite: 'Strict',
    maxAge: 3600
  });
  dispatch(loginSuccess(token));
};

export const logout = () => (dispatch) => {
  cookies.remove('access_token', { path: '/' });
  dispatch(logoutSuccess());
};

export const checkAuthStatus = () => (dispatch) => {
  const token = cookies.get('access_token');
  if (token) {
    dispatch(loginSuccess(token));
    return true
  } else {
    dispatch(logoutSuccess());
    return false
  }
};