import OrderApi from "@/apis/order/OrderApi";
import ClassNames from "classnames";
import Messages from "@/languages/Messages";
import { map } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { ProviderName } from "@/common/interface/provider";
import PriceTag from "@/container/shared/items/PriceTag";
import ProviderNameItem from "@/container/provider/shared/ProviderNameItem";
import { useRouter } from "next/router";
import Path from "@/common/constant/path";
import LayoutHeader from "@/container/shared/layout/LayoutHeader";
import { useAuthProfile } from "@/store/auth/authHook";
import { useOrderHistory } from "@/store/order-history/orderHistoryHook";

export interface IOrderHistoryPageProps {
    [key: string]: any;
}

export interface IOrderItemProps {
    [key: string]: any;
}

const OrderHistoryPage: React.FC<IOrderHistoryPageProps> = () => {
    const router = useRouter();
    const orderLocals = useOrderHistory();
    const { id: customerId, email } = useAuthProfile() || {};
    const [orderList, setOrderList] = useState<Array<any>>([]);
    const isGuest = !customerId;

    useEffect(() => {
        loadOrderHistory();
    }, []);

    const loadOrderHistory = async () => {
        if (isGuest) {
            setOrderList(orderLocals || []);
        } else {
            const res = await OrderApi.history();
            const allOrders = [
                ...(res?.data?.data?.data ?? []),
                ...(orderLocals || []),
            ];
            setOrderList(allOrders);
        }
    };
    if (!(orderList?.length > 0)) {
        return (
            <div className="flex flex-col items-center justify-center  w-screen h-screen relative text-white">
                {Messages.listOrderEmpty}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start w-screen h-screen relative text-white ">
            <LayoutHeader title={Messages.orderHistory} />
            <div className="overflow-y-scroll px-4 w-full pb-40">
                {map(orderList, (orderItem) => {
                    return <OrderItem order={orderItem} />;
                })}
            </div>
        </div>
    );
};

export default OrderHistoryPage;

export const OrderItem: React.FC<IOrderItemProps> = ({ order, onClick }) => {
    const router = useRouter();
    const { provider, dataAmount, subTotal, total, orderNo } = order || {};
    const rowClass = ClassNames("flex flex-row items-center text-xl");

    return (
        <div
            className="flex flex-row mt-4 text-white bg-gold rounded-3xl p-3 text-xl z-10 relative w-full"
            onClick={() => router.push(Path.orderDetail(order).as || "")}
        >
            <div className="w-full ml-3">
                <div className={rowClass}>
                    <div>#{orderNo}</div>
                </div>
                <div className={`${rowClass} text opacity-75`}>
                    <div className="mr-2">{Messages.provider} : </div>
                    <ProviderNameItem providerId={provider} />
                </div>
                <div className="w-full flex justify-end">
                    <div>{`${Messages.subTotal} \b \b`}</div>
                    <PriceTag price={subTotal} />
                </div>
            </div>
        </div>
    );
};
