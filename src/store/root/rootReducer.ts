import { combineReducers } from "redux";
import authReducer, { AUTH_NAMESPACE } from "../auth/authReducer";
import orderHistoryReducer, {
    ORDER_HISTORY_NAMESPACE,
} from "../order-history/orderHistoryReducer";
import version from "../version";

export default combineReducers({
    version: (state = version) => state,
    [AUTH_NAMESPACE]: authReducer,
    [ORDER_HISTORY_NAMESPACE]: orderHistoryReducer,
});
