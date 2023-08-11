import CheckoutPage from "@/container/checkout/CheckoutPage";
import Layout, { LayoutClean } from "@/container/shared/layout/Layout";
import React from "react";

export interface ICheckoutProps {
    [key: string]: any;
}

const Checkout: React.FC<ICheckoutProps> = ({ id }) => {
    return <CheckoutPage />;
};

export default Checkout;

//@ts-ignore
Checkout.getLayout = function getLayout(page) {
    return <LayoutClean showHideConfig={{ hideLogo: true }}>{page}</LayoutClean>;
};
