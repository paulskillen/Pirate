import OrderApi from "@/apis/order/OrderApi";
import LayoutHeader from "@/container/shared/layout/LayoutHeader";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";

export interface IOrderDetailPageProps {
    [key: string]: any;
}

export interface IOrderItemProps {
    [key: string]: any;
}

const OrderDetailPage: React.FC<IOrderDetailPageProps> = ({ orderId }) => {
    const [orderDetail, setOrderDetail] = useState<any>();

    useEffect(() => {
        if (orderId) {
            loadOrderDetail();
        }
    }, [orderId]);

    const loadOrderDetail = async () => {
        const res = await OrderApi.detail(orderId);
        setOrderDetail(res?.data?.data?.data ?? []);
    };
    if (isEmpty(orderDetail)) {
        return (
            <div className="flex flex-col items-center justify-center  w-screen h-screen relative text-white" />
        );
    }

    const {
        provider,
        subTotal,
        total,
        orderNo,
        eSimData,
    } = orderDetail || {};

    return (
        <div className="flex flex-col items-center justify-start w-screen h-screen relative text-white overflow-y-scrollpb-40">
            <LayoutHeader title={orderNo} />
            <div>
                <div style={{ height: "500px" }} />
            </div>
        </div>
    );
};

export default OrderDetailPage;
