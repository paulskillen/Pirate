import { IOrder } from "@/common/interface/order";
import React from "react";

export interface ICheckoutSuccessViewProps {
    order: IOrder;
}

const CheckoutSuccessView: React.FC<ICheckoutSuccessViewProps> = ({
    order,
}) => {
    const { id, products, orderNo, subTotal } = order || {};
    const productId = products?.[0]?.product?.id;
    return (
        <div>
            <img
                src={`https://piratemobile.postaffiliatepro.com/scripts/d4dvusx?AccountId=default1&TotalCost=${subTotal}&OrderID=${id}&ProductID=${productId}`}
                width="1"
                height="1"
            />
        </div>
    );
};

export default CheckoutSuccessView;
