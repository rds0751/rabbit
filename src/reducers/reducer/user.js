import { ADD_USER, ALL_USERS, USER_DETAILS } from "../Constants";

//  userDetails  has only address and wallet amount
// loggedInUser has Full User details

let initialState = {
  // isLoggedIn: false,
  // loginFailure: null,
  // deviceId: null,
  // sessionToken: null,
  // loading: false,
  // isForgotPasswordSuccess: false
  loggedInUser: null,
  allUserData: "",
  userDetails: null,
};
export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DETAILS:
      {
        return { ...state, userDetails: action.payload };
      }
      break;
    case ADD_USER:
      console.log(action, "<<< this is in user.js reducer");
      return {
        ...state,
        loggedInUser: action.payload,
      };
      break;
    case ALL_USERS:
      return {
        ...state,
        allUserData: action.payload,
      };
    default:
      return state;
  }
};
