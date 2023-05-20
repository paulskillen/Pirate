// application
import OrderHistoryPage from "@/container/order/history/OrderHistoryPage";
import { LayoutAuth, LayoutClean } from "@/container/shared/layout/Layout";

function OrderHistory() {
    return <OrderHistoryPage />;
}

export default OrderHistory;

OrderHistory.Layout = LayoutClean;
