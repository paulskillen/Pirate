import {
    ORDER_HISTORY_REMOVE_ITEM,
    ORDER_HISTORY_ADD_ITEM,
    ORDER_HISTORY_CLEAR,
} from "./orderHistoryTypes";

export function addOrderAction(data: any) {
    return {
        type: ORDER_HISTORY_ADD_ITEM,
        data,
    };
}

export function removeOrderAction(id: string) {
    return {
        type: ORDER_HISTORY_REMOVE_ITEM,
        data: id,
    };
}

export function clearOrderHistory() {
    return {
        type: ORDER_HISTORY_CLEAR,
    };
}
