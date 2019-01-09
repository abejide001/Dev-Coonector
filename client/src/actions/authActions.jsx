// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setToken';

// eslint-disable-next-line import/prefer-default-export
export const registerUser = (userData, history) => (dispatch) => {
  axios.post('/api/user/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })) // handle errors
};
export const loginUser = userData => (dispatch) => {
  axios.post('/api/user/login', userData)
    .then((res) => {
        // save to localstorage
        const { token } = res.data;
        localStorage.setItem('token', token);
        // set token to auth header
        setAuthToken(token)
        // decode token
        const decoded = jwt_decode(token);
        // set current user
        dispatch(setCurrentUser(decoded)); 
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }))
}

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    }
}

export const logoutUser = () => (dispatch) => {
    // remove from localstorage
    localStorage.removeItem('token');
    // remove auth header
    setAuthToken(false);
    // set current user to {}
    dispatch(setCurrentUser({}))
}
