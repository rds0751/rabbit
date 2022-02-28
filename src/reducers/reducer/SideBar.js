import { OPEN_NOTIFICATION, OPEN_WALLET, SEARCH_FROM_NAV } from "../Constants";

let initialState = {
  // isLoggedIn: false,
  // loginFailure: null,
  // deviceId: null,
  // sessionToken: null,
  // loading: false,
  // isForgotPasswordSuccess: false
  isOpenWallet: false,
  isOpenNoti: false,
  navSearchValue: "",
};
export const SideBarReducer = (state = initialState, action) => {
  console.log(action, "<<<< this is action");
  switch (action.type) {
    case OPEN_NOTIFICATION: {
      console.log(action.payload, "<<< this is in user.js reducer");
      return { ...state, isOpenNoti: action.payload };
    }
    case OPEN_WALLET:
      return {
        ...state,
        isOpenWallet: action.payload,
      };
    case SEARCH_FROM_NAV:
      return {
        ...state,
        navSearchValue: action.payload,
      };

    default:
      return state;
  }
};
