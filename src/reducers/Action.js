// const ACTION={
//     USER_LOGGED_IN:"USER_LOGGED_IN",
//     CLOUDINARY_IMAGE:"CLOUDINARY_IMAGE",
//     SEARCH_POST:"SEARCH_POST",
//     CHALLENGE_POST:"CHALLENGE_POST",
//     COMMUNITY_POST:"COMMUNITY_POST",
//     COMMUNITY:"COMMUNITY"
// }

// export default ACTION

import { BASE_URL, USER_DETAILS } from "./Constants";
import { ADD_USER, GET_ERRORS, ALL_USERS } from "./Constants";
import axios from "axios";

export const addUseraction = (data) => (dispatch) => {
  console.log(1);
  axios
    .post(BASE_URL + `/api/v1/user`, data)
    .then((response) => {
      console.log("response", response);
      if (response.data.responseCode === 200) {
        dispatch({
          type: ADD_USER,
          payload: response,
        });
      }
      if (
        response.data.responseCode === 400 ||
        response.data.responseCode === 403
      ) {
        dispatch({
          type: GET_ERRORS,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
      if (error && error.responseCode && error.responseCode === 403) {
        dispatch({
          type: GET_ERRORS,
          payload: error.response,
        });
      }
    });
};
export const updateUserDetail = (data) => (dispatch) => {
  console.log(data, "<<< data from update user detail");
  dispatch({ type: USER_DETAILS, payload: data });
};

export const allUseraction = () => (dispatch) => {
  console.log(1);
  axios
    .get(BASE_URL + `/api/v1/users`)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: ALL_USERS,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      if (error && error.response && error.responseCode === 404) {
        dispatch({
          type: GET_ERRORS,
          payload: error.response,
        });
      }
    });
};
