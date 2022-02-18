import { ADD_USER, ALL_USERS, USER_DETAILS } from "../Constants";

let initialState = {
  // isLoggedIn: false,
  // loginFailure: null,
  // deviceId: null,
  // sessionToken: null,
  // loading: false,
  // isForgotPasswordSuccess: false
  addUserData: "",
  allUserData: "",
  userDetails: null,
};
export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DETAILS: {
    console.log(action.payload,"<<< this is in user.js reducer")
      return { ...state, userDetails: action.payload };
    }
    case ADD_USER:
      return {
        ...state,
        addUserData: action.payload,
      };
    case ALL_USERS:
      return {
        ...state,
        allUserData: action.payload,
      };
    default:
      return state;
  }
};
