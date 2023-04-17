import { combineReducers } from "redux";
import authReducer, { AUTH_NAMESPACE } from "../auth/authReducer";
import version from "../version";

export default combineReducers({
    version: (state = version) => state,
    [AUTH_NAMESPACE]: authReducer,
});
