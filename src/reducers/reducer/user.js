import {
  ADD_WALLET,
  ALL_USERS,
  USER_DETAILS,
  LOGGED_IN_UER_DETAILS,
} from "../Constants";
import { eventConstants} from "../../constants";


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
  walletAddress: null,
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
      case eventConstants.SHOW_LOADER:
        return {
            ...state,
            loading: true
        }
    case eventConstants.HIDE_LOADER:
        return {
            ...state,
            loading: false
        }

    default:
      return state;
  }
};
