import {
  ADD_WALLET,
  ALL_USERS,
  USER_DETAILS,
  LOGGED_IN_UER_DETAILS,
  REDIRECT_URL,
  LOG_OUT,
} from "../Constants";
import { eventConstants} from "../../constants";


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
    case LOG_OUT:
      {
        return {...state,
          loggedInUser: null,
          allUserData: "",
          walletAddress: null}
      }
    case ADD_WALLET:
      {
        return { ...state, walletAddress: action.payload };
      }
    case LOGGED_IN_UER_DETAILS:
      return {
        ...state,
        loggedInUser: action.payload,
      };
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
    case REDIRECT_URL:
      {
        return { ...state, redirectUrl: action.payload };
      }
      return state;
  }
};
