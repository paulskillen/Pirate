import OrderApi from "@/apis/order/OrderApi";
import { AppStateContext } from "@/common/context/app/app-context";
import { IOrder } from "@/common/interface/order";
import Messages from "@/languages/Messages";
import { Button, Progress } from "d-react-components";
import { map, reduce } from "lodash";
import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import { BundleItem } from "../bundle/BundleByCountryPage";
import SelectPaymentButton, {
    IPayPalOrderResponse,
} from "../shared/payment/SelectPaymentButton";

export interface ICheckoutPageProps {
    [key: string]: any;
}

const CheckoutPage: React.FC<ICheckoutPageProps> = ({ id }) => {
    const router = useRouter();
    const { userCart, activeOrder } = useContext(AppStateContext);

    const totalAmount = useMemo(() => {
        return reduce(
            userCart,
            (res, item, index) => {
                const { price } = item;
                return res + price;
            },
            0
        );
    }, [userCart]);

    console.log(
        "🚀 >>>>>> file: CheckoutPage.tsx:22 >>>>>> activeOrder:",
        activeOrder
    );

    const onSuccessPaymentHandler = (
        resOrder: IPayPalOrderResponse,
        orderSer: IOrder
    ) => {
        console.log(
            "🚀 >>>>>> file: CheckoutPage.tsx:37 >>>>>> activeOrder:",
            activeOrder
        );
        console.log(
            "🚀 >>>>>> file: CheckoutPage.tsx:33 >>>>>> onSuccessPaymentHandler >>>>>> resOrder:",
            resOrder
        );
        const payload = {};
        // return Progress.show(
        //     { method: OrderApi.create, params: {} },
        //     (res: any) => {}
        // );
    };

    const fetchData = async () => {
        const res = await OrderApi.detail("642ce285a1d74c9d0e4be5bb");

        console.log(
            "🚀 >>>>>> file: CheckoutPage.tsx:36 >>>>>> fetchData >>>>>> res:",
            res
        );
    };

    const renderButton = () => {
        return (
            <div className="absolute bottom-5 w-full px-3 z-30">
                <Button
                    className="w-full font-bold z-30"
                    style={{ width: "100%", fontWeight: "bold", fontSize: 16 }}
                    onClick={() => {
                        fetchData();
                    }}
                >
                    Fetch Data
                    {/* {`${Messages.completePurchase}`} */}
                </Button>
            </div>
        );
    };

    return (
        <div>
            <div className="flex flex-row items-center justify-between py-2 px-4 bg-primary text-white rounded-b-3xl">
                <Button
                    onClick={() => router.back()}
                    variant="trans"
                    iconName="arrow_back_ios_new"
                    className="px-0"
                    color="light"
                />
                <div className="text-xl">{Messages.yourOrder}</div>
                <div />
            </div>
            <div className="h-screen overflow-y-scroll px-4">
                {map(userCart, (item, index) => {
                    return <BundleItem bundle={item} showRadio={false} />;
                })}
                {totalAmount > 0 && (
                    <SelectPaymentButton
                        totalAmount={totalAmount}
                        onSuccess={(orderRes, orderSer) => {
                            console.log(
                                "🚀 >>>>>> file: CheckoutPage.tsx:99 >>>>>> orderSer:",
                                orderSer
                            );
                            console.log(
                                "🚀 >>>>>> file: CheckoutPage.tsx:108 >>>>>> orderRes:",
                                orderRes
                            );

                            if (orderRes?.status === "COMPLETED") {
                                onSuccessPaymentHandler(orderRes, orderSer);
                            }
                        }}
                        onError={(error: any) => {}}
                        customerId="638589e5ab563e9641d7ccfc"
                        purchasingItems={userCart}
                    />
                )}

                <div className="h-96" />
            </div>
            {renderButton()}
        </div>
    );
};

export default CheckoutPage;
