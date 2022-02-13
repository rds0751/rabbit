import {combineReducers} from "redux";
import {UserReducer} from "./reducer/user";
import ErrorReducer from "./reducer/ErrorReducer";

export const rootReducer = combineReducers({
    user: UserReducer,
    error: ErrorReducer
});