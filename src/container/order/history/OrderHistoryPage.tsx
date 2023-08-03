import OrderApi from "@/apis/order/OrderApi";
import { IOrder, OrderType } from "@/common/interface/order";
import TabSwitch, { ITabSwitchItem } from "@/components/tab/TabSwitch";
import MobileHeader from "@/container/shared/header/MobileHeader";
import Messages from "@/languages/Messages";
import { useAuthProfile } from "@/store/auth/authHook";
import { useOrderHistory } from "@/store/order-history/orderHistoryHook";
import styled from "@emotion/styled";
import { Progress } from "d-react-components";
import { filter, map } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { OrderItem } from "./OrderItem";
import ESimItem from "./ESimItem";
import EsimApi from "@/apis/esim/EsimApi";

export interface IOrderHistoryPageProps {
    [key: string]: any;
}

export interface IOrderItemProps {
    order: IOrder;
    [key: string]: any;
}

const OrderHistoryPage: React.FC<IOrderHistoryPageProps> = () => {
    const router = useRouter();
    const tabs = [
        {
            id: "esim",
            label: Messages.yourEsim,
        },
        {
            id: "order",
            label: Messages.yourPreviousOrder,
        },
    ];

    const orderLocals = useOrderHistory();
    const { id: customerId, email } = useAuthProfile() || {};
    const [orderList, setOrderList] = useState<Array<IOrder>>([]);
    const [activeTab, setActiveTab] = useState<ITabSwitchItem>(tabs?.[0]);
    const isGuest = !customerId;
    const yourEsims = useMemo(() => {
        if (!orderList.length) {
            return [];
        }
        const filteredOrders = orderList?.filter(
            (item) =>
                item?.orderType === OrderType.BUY_NEW &&
                !!item?.eSimData?.eSimId
        );
        if (!filteredOrders.length) {
            return [];
        }
        return filteredOrders;
    }, [orderList]);

    useEffect(() => {
        loadOrderHistory();
    }, [isGuest]);

    const loadOrderHistory = async () => {
        if (isGuest) {
            setOrderList(orderLocals || []);
        } else {
            Progress.show(
                { method: OrderApi.history, params: [] },
                (res: any) => {
                    const allOrders = [
                        ...(res?.data?.data?.data ?? []),
                        ...(orderLocals || []),
                    ];
                    setOrderList(allOrders);
                }
            );
        }
    };

    const renderTab = () => {
        return (
            <TabSwitch
                dataSource={tabs as any}
                value={activeTab}
                onChange={(v) => setActiveTab(v)}
            />
        );
    };

    const renderOrderContent = () => {
        if (!orderList?.length) {
            return (
                <div className="text-gold empty-content">
                    {Messages.listOrderEmpty}
                </div>
            );
        }
        return (
            <div className="overflow-y-scroll w-full pb-40">
                {map(orderList, (orderItem) => {
                    return <OrderItem order={orderItem} />;
                })}
            </div>
        );
    };

    const renderEsimContent = () => {
        if (!orderList?.length) {
            return (
                <div className="text-gold empty-content">
                    {Messages.listOrderEmpty}
                </div>
            );
        }
        return (
            <div className="overflow-y-scroll w-full pb-40">
                {map(yourEsims, (item) => {
                    return <ESimItem eSimItem={item} />;
                })}
            </div>
        );
    };

    return (
        <OrderHistoryStyled className="container px-0 flex flex-col items-center justify-start w-screen h-screen relative text-white z-10">
            <MobileHeader />
            <div className="w-full px-3 mt-3 md:w-3/4">
                {renderTab()}
                <div className="flex flex-col items-center w-full h-screen overflow-y-scroll  relative">
                    {/* <button
                        onClick={() => EsimApi.sendSms("8943108161001914187")}
                    >
                        Send Smd
                    </button> */}
                    {activeTab?.id === "order" && renderOrderContent()}
                    {activeTab?.id === "esim" && renderEsimContent()}
                    <div className="h-80" />
                </div>
            </div>
        </OrderHistoryStyled>
    );
};

export default OrderHistoryPage;

const OrderHistoryStyled = styled.div`
    .empty-content {
        margin-top: calc(100vh * 0.4);
        opacity: 0.5;
        @media (max-width: 768px) {
            margin-top: calc(100vh * 0.35);
        }
    }
`;
