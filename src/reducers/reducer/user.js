import {
    ADD_USER,
    ALL_USERS
} from "../Constants"

let initialState = {
    // isLoggedIn: false,
    // loginFailure: null,
    // deviceId: null,
    // sessionToken: null,
    // loading: false,
    // isForgotPasswordSuccess: false
    addUserData: "",
    allUserData: ""
};
export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                addUserData: action.payload,
            }
        case ALL_USERS:
            return {
                ...state,
                allUserData: action.payload,
            }
        default:
            return state;
    }
}