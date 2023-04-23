import authBaseReducer from "../auth/authReducer";
import orderHistoryReducer from "../order-history/orderHistoryReducer";
import { AppReducerStateType } from "../types";

export interface RootState {
    version: number;
    auth: AppReducerStateType<typeof authBaseReducer>;
    orderHistory: AppReducerStateType<typeof orderHistoryReducer>;
}
