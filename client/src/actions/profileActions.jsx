import axios from 'axios';
import {
  GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_PROFILES,
} from './types';

// get current profile

export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/current')
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: {},
      });
    });
};
export const getProfileByHandle = handle => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: null,
      });
    });
};
export const setProfileLoading = () => ({
  type: PROFILE_LOADING,
});
// clear profile
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE,
});
// create profile
export const createProfile = (profileData, history) => (dispatch) => {
  axios.post('/api/profile/create', profileData).then(res => history.push('/dashboard')).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  });
};

export const addExperience = (expData, history) => (dispatch) => {
  axios.post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const deleteExperience = id => (dispatch) => {
  axios.delete(`/api/profile/experience/${id}`)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const deleteEducation = id => (dispatch) => {
  axios.delete(`/api/profile/education/${id}`)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const addEducation = (expData, history) => (dispatch) => {
  axios.post('/api/profile/education', expData)
    .then(res => history.push('/dashboard'))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then((res) => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILES,
        payload: null,
      });
    });
};
export const deleteAccount = () => (dispatch) => {
  if (window.confirm('Are you sure?, this cannot be undone')) {
    axios
      .delete('/api/profile')
      .then((res) => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  }
};
