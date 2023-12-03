import CheckoutPage from "@/container/checkout/CheckoutPage";
import CheckoutSuccessPage from "@/container/checkout/CheckoutSuccessPage";
import { LayoutClean } from "@/container/shared/layout/Layout";
import React from "react";

export interface ICheckoutSuccessProps {
    [key: string]: any;
}

const CheckoutSuccess: React.FC<ICheckoutSuccessProps> = ({ id }) => {
    return <CheckoutSuccessPage />;
};

export default CheckoutSuccess;

//@ts-ignore
CheckoutSuccess.Layout = LayoutClean;
