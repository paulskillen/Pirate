import { combineReducers } from "redux";
import authReducer from "../auth/authReducer";
import version from "../version";

export default combineReducers({
    version: (state = version) => state,
    auth: authReducer,
});
