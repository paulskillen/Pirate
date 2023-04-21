import OrderApi from "@/apis/order/OrderApi";
import React, { useEffect } from "react";

export interface IOrderHistoryPageProps {
    [key: string]: any;
}

const OrderHistoryPage: React.FC<IOrderHistoryPageProps> = () => {
    useEffect(() => {
        loadOrderHistory();
    }, []);

    const loadOrderHistory = async () => {
        const res = await OrderApi.history();
        console.log(
            "🚀 >>>>>> file: OrderHistoryPage.tsx:16 >>>>>> loadOrderHistory >>>>>> res:",
            res
        );
    };

    return (
        <div className="flex flex-col items-center justify-start w-screen h-screen relative text-white">
            OrderHistoryPage
        </div>
    );
};

export default OrderHistoryPage;
