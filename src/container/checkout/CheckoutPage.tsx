import OrderApi from "@/apis/order/OrderApi";
import Path from "@/common/constant/path";
import { PaymentMethod } from "@/common/interface/payment";
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
} from "../shared/input/SelectPaymentButton";
import CheckoutSuccessModal from "./CheckoutSuccessModal";
import styled from "@emotion/styled";
import { useSearchParam } from "react-use";
import SelectPaymentView from "../shared/input/SelectPaymentView";

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

    const topUpParams = useSearchParam("topup");
    const isTopUp = useMemo(() => {
        return topUpParams && topUpParams?.length === 19;
    }, [topUpParams]);

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
                    // afterSuccessCreateOrder(order, isGuest);
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
            <div className="bg-black mt-4 p-4 rounded-2xl border border-gold checkout-page__agreement">
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
                    <div className="ml-3 text text-white text-xs">
                        {Messages.readAndAgreeWith}
                        <AppLink
                            className="inline ml-1 underline italic text-white"
                            href={Path.termConditions().href}
                        >
                            <span>{Messages.termAndCondition}</span>
                        </AppLink>
                        <span className="mx-1">&</span>
                        <AppLink
                            className="inline ml-1 underline italic text-white"
                            href={Path.policy().href}
                        >
                            <span>{Messages.thePrivacyPolicy}</span>
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
                            className="inline ml-1 underline italic text-white"
                            href={Path.compatibleDevice().href}
                        >
                            <span>{Messages.seeCompatibleDeviceList}</span>
                        </AppLink>
                    </div>
                </div>
            </div>
        );
    };

    const renderPolicyAndCompatible = useMemo(() => {
        return (
            <div className="mt-6 flex flex-col items-center justify-center">
                <div className="text-center text-white w-full">
                    <span>{Messages.byContinueYouAgree}</span>
                    <AppLink
                        className="inline ml-1 underline italic "
                        href={Path.termConditions().href}
                    >
                        <span>{Messages.termAndCondition}</span>
                    </AppLink>
                    <span className="mx-1">&</span>
                    <AppLink
                        className="inline ml-1 underline italic"
                        href={Path.policy().href}
                    >
                        <span>{Messages.thePrivacyPolicy}</span>
                    </AppLink>
                </div>
                {/* <div className="text-center mt-2 w-75">
                    <span className="text-white">Not sure your device is compatible with eSim ?</span>
                    <AppLink
                        className="inline ml-1 underline italic"
                        href={Path.compatibleDevice().href}
                    >
                        <span>{Messages.seeCompatibleDeviceList}</span>
                    </AppLink>
                </div> */}
            </div>
        );
    }, []);

    return (
        <div className="">
            <PageHeader title={Messages.yourOrder} showLeftButton={false} />
            <CheckoutStyled className="min-h-screen px-4 z-10 relative flex flex-col items-center">
                {map(userCart, (item, index) => {
                    return <BundleItem bundle={item} showRadio={false} />;
                })}
                {/* {renderAgreement()} */}
                {/* {totalAmount > 0 && (
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
                )} */}
                {totalAmount > 0 && (
                    <SelectPaymentView
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
                {renderPolicyAndCompatible}
                {/* {renderButton()} */}
            </CheckoutStyled>
            {openCheckoutSuccessModal.open &&
                openCheckoutSuccessModal.order && (
                    <CheckoutSuccessModal
                        open={openCheckoutSuccessModal.open}
                        order={openCheckoutSuccessModal.order as any}
                        onClose={() =>
                            setOpenCheckoutSuccessModal({ open: false })
                        }
                    />
                )}
        </div>
    );
};

export default CheckoutPage;

const CheckoutStyled = styled.div`
    .checkout-page__agreement,
    .select-payment-button {
        @media (min-width: 768px) {
            width: 50vw;
        }
    }
`;
