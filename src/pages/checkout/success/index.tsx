import CheckoutPage from "@/container/checkout/CheckoutPage";
import { LayoutClean } from "@/container/shared/layout/Layout";
import React from "react";

export interface ICheckoutSuccessProps {
    [key: string]: any;
}

const CheckoutSuccess: React.FC<ICheckoutSuccessProps> = ({ id }) => {
    return <CheckoutPage />;
};

export default CheckoutSuccess;

//@ts-ignore
CheckoutSuccess.Layout = LayoutClean;
