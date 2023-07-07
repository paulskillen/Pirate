import OrderApi from "@/apis/order/OrderApi";
import Path from "@/common/constant/path";
import { PaymentMethod } from "@/common/constant/payment";
import { AppStateContext } from "@/common/context/app/app-context";
import { IOrder } from "@/common/interface/order";
import AppLink from "@/components/link/AppLink";
import Messages from "@/languages/Messages";
import { useAuthProfile } from "@/store/auth/authHook";
import { addOrderAction } from "@/store/order-history/orderHistoryActions";
import { Button, Checkbox, Progress } from "d-react-components";
import { map, reduce } from "lodash";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { BundleItem } from "../bundle/BundleByCountryPage";
import PageHeader from "../shared/header/PageHeader";
import SelectPaymentButton, {
    IPayPalOrderResponse,
} from "../shared/payment/SelectPaymentButton";
import CheckoutSuccessModal from "./CheckoutSuccessModal";

export interface ICheckoutPageProps {
    [key: string]: any;
}

const TEST_CUSTOMER = "643f548bab6d359facb8881e";

const CheckoutPage: React.FC<ICheckoutPageProps> = ({ id }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id: customerId, email } = useAuthProfile() || {};
    const { userCart, activeOrder, setActiveOrder } =
        useContext(AppStateContext);
    const [paymentOrder, setPaymentOrder] = useState<IPayPalOrderResponse>();
    const [fetchOrder, setFetchOrder] = useState<any>();
    const [userAgreement, setUserAgreement] = useState<{
        policy?: boolean;
        compatible?: boolean;
    }>({});
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
    const [openCheckoutSuccessModal, setOpenCheckoutSuccessModal] = useState<{
        open: boolean;
        order?: IOrder;
    }>({ open: false });

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
                    // if (isGuest) {
                    //     dispatch(addOrderAction(order));
                    //     router.push(Path.esimsHistory().href || "");
                    // } else {
                    //     router.push(Path.orderDetail(order).as || "");
                    // }
                    afterSuccessCreateOrder(order, isGuest);
                    setOpenCheckoutSuccessModal({ open: true, order });
                }
            }
        );
    };

    const afterSuccessCreateOrder = (order: any, isGuest: boolean) =>
        setTimeout(() => {
            setOpenCheckoutSuccessModal({ open: false });
            if (isGuest) {
                dispatch(addOrderAction(order));
                router.push(Path.esimsHistory().href || "");
            } else {
                router.push(Path.orderDetail(order).as || "");
            }
        }, 4000);

    const fetchData = async () => {
        const res = await OrderApi.detail("64323aa0d7feb0c46cf53b42");
        setFetchOrder(res?.data?.data?.data ?? {});
    };

    const renderButton = () => {
        return (
            <div className="">
                <Button
                    className="w-full font-bold z-30 mt-3"
                    style={{ width: "100%", fontWeight: "bold", fontSize: 16 }}
                    onClick={() => {
                        fetchData();
                    }}
                >
                    Fetch Data
                    {/* {`${Messages.completePurchase}`} */}
                </Button>
                <Button
                    className="w-full font-bold z-30 mt-3"
                    style={{ width: "100%", fontWeight: "bold", fontSize: 16 }}
                    onClick={() => {
                        setOpenCheckoutSuccessModal({
                            open: true,
                            order: fetchOrder as any,
                        });
                    }}
                >
                    Open Modal
                    {/* {`${Messages.completePurchase}`} */}
                </Button>
            </div>
        );
    };

    const renderAgreement = () => {
        return (
            <div className="bg-black mt-4 p-4 rounded-2xl border border-gold">
                <div className="flex-center-y">
                    <Checkbox
                        onChange={() =>
                            setUserAgreement({
                                ...userAgreement,
                                policy: !userAgreement?.policy,
                            })
                        }
                        checked={userAgreement?.policy}
                    />
                    <div className="ml-3 text text-white">
                        {Messages.readAndAgreeWith}
                        <AppLink
                            className="inline ml-1 underline font-semibold italic text-white"
                            href={Path.policy().href}
                        >
                            <span>{Messages.termAndCondition}</span>
                        </AppLink>
                    </div>
                </div>
                <div className="flex-center-y mt-3">
                    <Checkbox
                        onChange={() =>
                            setUserAgreement({
                                ...userAgreement,
                                compatible: !userAgreement?.compatible,
                            })
                        }
                        checked={userAgreement?.compatible}
                    />
                    <div className="ml-3 text text-white">
                        {Messages.myDeviceIsCompatibleWithEsim}
                        <AppLink
                            className="inline ml-1 underline font-semibold italic text-white"
                            href={Path.compatibleDevice().href}
                        >
                            <span>{Messages.seeCompatibleDeviceList}</span>
                        </AppLink>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="">
            <PageHeader title={Messages.yourOrder} />
            <div className="h-screen overflow-y-scroll px-4 z-10 relative">
                {map(userCart, (item, index) => {
                    return <BundleItem bundle={item} showRadio={false} />;
                })}
                {renderAgreement()}
                {totalAmount > 0 &&
                    userAgreement?.policy &&
                    userAgreement?.compatible && (
                        <SelectPaymentButton
                            totalAmount={totalAmount}
                            onSuccess={(orderRes, orderSer) => {
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
                {renderButton()}
            </div>
            {openCheckoutSuccessModal.open &&
                openCheckoutSuccessModal?.order && (
                    <CheckoutSuccessModal
                        open={openCheckoutSuccessModal.open}
                        order={openCheckoutSuccessModal.order}
                        onClose={() =>
                            setOpenCheckoutSuccessModal({ open: false })
                        }
                    />
                )}
        </div>
    );
};

export default CheckoutPage;
