import OrderApi from "@/apis/order/OrderApi";
import Path from "@/common/constant/path";
import { IOrder } from "@/common/interface/order";
import Icon from "@/components/icon/Icon";
import ProviderNameItem from "@/container/provider/shared/ProviderNameItem";
import PageHeader from "@/container/shared/header/PageHeader";
import PriceTag from "@/container/shared/items/PriceTag";
import Messages from "@/languages/Messages";
import { useAuthProfile } from "@/store/auth/authHook";
import { useOrderHistory } from "@/store/order-history/orderHistoryHook";
import styled from "@emotion/styled";
import ClassNames from "classnames";
import { Progress, TimeUtils } from "d-react-components";
import { map } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export interface IOrderHistoryPageProps {
    [key: string]: any;
}

export interface IOrderItemProps {
    order: IOrder;
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

    const renderContent = () => {
        if (!(orderList?.length > 0)) {
            return (
                <div className="flex flex-col items-center justify-center  w-screen h-screen relative text-white">
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

    return (
        <div className="flex flex-col items-center justify-start w-screen h-screen relative text-white ">
            <PageHeader title={Messages.orderHistory} />
            {renderContent()}
            <div className="h-96" />
        </div>
    );
};

export default OrderHistoryPage;

export const OrderItem: React.FC<IOrderItemProps> = ({ order, onClick }) => {
    const router = useRouter();
    const { provider, subTotal, total, orderNo, createdAt } = order || {};
    const rowClass = ClassNames("flex flex-row items-center text-xl mt-2");

    return (
        <OrderItemStyled
            className="flex flex-row mt-4 text-white border bg-black rounded-2xl p-3 px-4 text-xl z-10 relative w-full"
            onClick={() => router.push(Path.orderDetail(order).as || "")}
        >
            <div className="w-full">
                <div className="flex flex-row">
                    <div className="flex flex-col w-full">
                        <div className={rowClass}>
                            <div className="h5 text-gold">#{orderNo}</div>
                        </div>
                        <div className={`${rowClass} text opacity-75`}>
                            <div className="mr-2">{Messages.provider} : </div>
                            <ProviderNameItem providerId={provider} />
                        </div>
                        <div className={`${rowClass} text opacity-75`}>
                            <div className="">{Messages.purchasedAt} :</div>
                            <div className="ml-2">
                                {TimeUtils.convertMiliToDateTime(createdAt)}
                            </div>
                        </div>
                    </div>
                    <Icon icon="cart" color="" className="text-gold" />
                </div>

                <div className="w-full flex justify-end text mt-3">
                    <div className="">{`${Messages.subTotal} \b \b`}</div>
                    <PriceTag price={subTotal} className="font-semibold" />
                </div>
            </div>
        </OrderItemStyled>
    );
};

const OrderItemStyled = styled.div`
    border-color: var(--color-gold) !important;
`;
