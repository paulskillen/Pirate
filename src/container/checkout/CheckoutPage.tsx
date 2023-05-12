import OrderApi from "@/apis/order/OrderApi";
import Path from "@/common/constant/path";
import { PaymentMethod, PAYMENT_METHODS } from "@/common/constant/payment";
import { AppStateContext } from "@/common/context/app/app-context";
import { IOrder } from "@/common/interface/order";
import { convertBase64ToImgSource } from "@/common/utils/image";
import Messages from "@/languages/Messages";
import { useAuthProfile } from "@/store/auth/authHook";
import { addOrderAction } from "@/store/order-history/orderHistoryActions";
import { Button, Progress } from "d-react-components";
import { map, reduce } from "lodash";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { BundleItem } from "../bundle/BundleByCountryPage";
import SelectPaymentButton, {
    IPayPalOrderResponse,
} from "../shared/payment/SelectPaymentButton";

export interface ICheckoutPageProps {
    [key: string]: any;
}

const TEST_CUSTOMER = "643f548bab6d359facb8881e";

const CheckoutPage: React.FC<ICheckoutPageProps> = ({ id }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id: customerId } = useAuthProfile() || {};
    const { userCart, activeOrder, setActiveOrder } =
        useContext(AppStateContext);
    const [paymentOrder, setPaymentOrder] = useState<IPayPalOrderResponse>();
    const [fetchOrder, setFetchOrder] = useState<any>();
    const isGuest = !customerId;

    const totalAmount = useMemo(() => {
        return reduce(
            userCart,
            (res, item, index) => {
                const { salePrice } = item;
                return res + (salePrice || 0);
            },
            0
        );
    }, [userCart]);

    useEffect(() => {
        if (paymentOrder?.id) {
            onSuccessPaymentHandler(paymentOrder);
        }
    }, [paymentOrder?.id]);

    const onSuccessPaymentHandler = (paymentRes: IPayPalOrderResponse) => {
        const { purchase_units } = paymentRes;
        const totalPayment = reduce(
            purchase_units,
            (res, item, index) => {
                const total = parseFloat(item?.amount?.value ?? 0);
                return res + total;
            },
            0
        );
        const payload = {
            orderId: activeOrder?.id,
            input: {
                payment: [
                    {
                        method: PaymentMethod.PAYPAL,
                        total: totalPayment,
                        paymentData: paymentRes,
                    },
                ],
                customer: customerId || null,
            },
        };
        return Progress.show(
            { method: OrderApi.process, params: [payload] },
            (res: any) => {
                setActiveOrder(undefined as any);
                setPaymentOrder(undefined as any);
                const order = res?.data?.data?.data;
                if (order) {
                    if (isGuest) {
                        dispatch(addOrderAction(order));
                        router.push(Path.esimsHistory().href || "");
                    } else {
                        router.push(Path.orderDetail(order).as || "");
                    }
                }
            }
        );
    };

    const fetchData = async () => {
        const res = await OrderApi.detail("64323aa0d7feb0c46cf53b42");
        setFetchOrder(res?.data?.data?.data ?? {});
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
        <div className="">
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
            <div className="h-screen overflow-y-scroll px-4 z-10 relative">
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
                                // onSuccessPaymentHandler(orderRes, orderSer);
                                setPaymentOrder(orderRes);
                            }
                        }}
                        onError={(error: any) => {}}
                        customerId={customerId}
                        purchasingItems={userCart}
                    />
                )}
                {/* <img src={convertBase64ToImgSource(base64)} /> */}

                {/* <div className="h-96" /> */}
            </div>
            {/* {renderButton()} */}
        </div>
    );
};

export default CheckoutPage;
