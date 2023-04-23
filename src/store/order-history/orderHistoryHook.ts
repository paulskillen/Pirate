import { useAppAction, useAppSelector } from "../hook";
import { addOrderAction, removeOrderAction } from "./orderHistoryActions";
import { OrderHistoryState, ORDER_HISTORY_NAMESPACE } from "./orderHistoryReducer";

//state

export const useOrderHistory = (): OrderHistoryState["orders"] =>
    useAppSelector((state) => {
        return state?.[ORDER_HISTORY_NAMESPACE]?.orders;
    }) as any;
