import {
  ADD_WALLET,
  ALL_USERS,
  USER_DETAILS,
  LOGGED_IN_UER_DETAILS,
  REDIRECT_URL,
  LOG_OUT,
  NFTSData,
  tenantLogin
} from "../Constants";
import { eventConstants} from "../../constants";


//  userDetails  has only address and wallet amount
// loggedInUser has Full User details

let initialState = {
  loggedInUser: null,
  allUserData: "",
  walletAddress: null,
  redirectUrl: "",
  nftsData:"",
  tenantLogin:false,
   "tenantId"
:""
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
    case "tenantId":
      {
        return {...state,
          tenantId: action.payload
        }
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
      case NFTSData:
      return {...state,nftsData:action.payload}
      case tenantLogin:
        return {...state,tenantLogin:action.payload}
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
