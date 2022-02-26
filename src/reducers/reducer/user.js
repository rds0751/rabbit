import {
  ADD_WALLET,
  ALL_USERS,
  USER_DETAILS,
  LOGGED_IN_UER_DETAILS,
  REDIRECT_URL,
} from "../Constants";

//  userDetails  has only address and wallet amount
// loggedInUser has Full User details

let initialState = {
  loggedInUser: null,
  allUserData: "",
  walletAddress: null,
  redirectUrl: "",
};
export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WALLET:
      {
        return { ...state, walletAddress: action.payload };
      }
      break;
    case LOGGED_IN_UER_DETAILS:
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
    case REDIRECT_URL:
      {
        return { ...state, redirectUrl: action.payload };
      }
      return state;
  }
};
