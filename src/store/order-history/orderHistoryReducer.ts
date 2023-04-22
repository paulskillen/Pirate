import { ICustomer } from "@/common/interface/customer";
import { IOrder } from "@/common/interface/order";
import { filter } from "lodash";
import { withClientState } from "../client";
import {
    ORDER_HISTORY_CLEAR,
    ORDER_HISTORY_ADD_ITEM,
    ORDER_HISTORY_REMOVE_ITEM,
} from "./orderHistoryTypes";

export const ORDER_HISTORY_NAMESPACE = "orderHistory";

export interface OrderHistoryState {
    orders: IOrder[] | null;
}

const initialState: OrderHistoryState = {
    orders: null,
};

function orderHistoryBaseReducer(state = initialState, action: any) {
    const { data } = action || {};
    const orders = state?.orders ?? [];
    switch (action.type) {
        case ORDER_HISTORY_ADD_ITEM:
            return {
                ...state,
                orders: [...orders, data],
            };
        case ORDER_HISTORY_REMOVE_ITEM:
            return {
                ...state,
                orders: filter(orders, (item) => item?.id === data),
            };
        case ORDER_HISTORY_CLEAR:
            return initialState;
        default:
            return state;
    }
}

const orderHistoryReducer = withClientState(
    orderHistoryBaseReducer,
    ORDER_HISTORY_NAMESPACE
);

export default orderHistoryReducer;
