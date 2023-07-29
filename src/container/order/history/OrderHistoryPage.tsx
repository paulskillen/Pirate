import OrderApi from "@/apis/order/OrderApi";
import { IOrder } from "@/common/interface/order";
import TabSwitch, { ITabSwitchItem } from "@/components/tab/TabSwitch";
import MobileHeader from "@/container/shared/header/MobileHeader";
import Messages from "@/languages/Messages";
import { useAuthProfile } from "@/store/auth/authHook";
import { useOrderHistory } from "@/store/order-history/orderHistoryHook";
import styled from "@emotion/styled";
import { Progress } from "d-react-components";
import { map } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { OrderItem } from "./OrderItem";

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
            label: Messages.yourOrder,
        },
    ];

    const orderLocals = useOrderHistory();
    const { id: customerId, email } = useAuthProfile() || {};
    const [orderList, setOrderList] = useState<Array<any>>([]);

    console.log(
        "🚀 >>>>>> file: OrderHistoryPage.tsx:50 >>>>>> orderList:",
        orderList
    );
    const [activeTab, setActiveTab] = useState<ITabSwitchItem>(tabs?.[0]);
    const isGuest = !customerId;

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
        if (!(orderList?.length > 0)) {
            return (
                <div className="text-gold empty-content">
                    {Messages.listOrderEmpty}
                </div>
            );
        }
        return (
            <div className="overflow-y-scroll px-4 w-full pb-40">
                {map(orderList, (orderItem) => {
                    return <OrderItem order={orderItem} />;
                })}
            </div>
        );
    };

    const renderEsimContent = () => {
        return <div />;
    };

    return (
        <OrderHistoryStyled className="container px-0 flex flex-col items-center justify-start w-screen h-screen relative text-white z-10">
            <MobileHeader />
            <div className="w-full px-3 mt-3 md:w-3/4">
                {renderTab()}
                <div className="flex flex-col items-center w-full h-screen overflow-y-scroll  relative">
                    {activeTab?.id === "order" && renderOrderContent()}
                    {activeTab?.id === "esim" && renderEsimContent()}
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
