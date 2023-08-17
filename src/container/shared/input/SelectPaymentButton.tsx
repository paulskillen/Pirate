import { PaymentMethod, PAYMENT_METHODS } from "@/common/interface/payment";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
    OrderResponseBody,
    OrderResponseBodyMinimal,
    PurchaseItem,
} from "@paypal/paypal-js/types/apis/orders";
import {
    OnApproveActions,
    CreateOrderActions,
} from "@paypal/paypal-js/types/components/buttons";
import Icon from "@/components/icon/Icon";
import Messages from "@/languages/Messages";
import { map } from "lodash";
import React, { useContext, useState } from "react";
import { IBundle, isValidEsimIccId } from "@/common/interface/bundle";
import OrderApi from "@/apis/order/OrderApi";
import { IOrder } from "@/common/interface/order";
import { AppStateContext } from "@/common/context/app/app-context";
import Modal from "@/components/modal/Modal";
import styled from "@emotion/styled";

export interface IPayPalOrderResponse extends OrderResponseBody {}
export type PayPalOrderStatusType = OrderResponseBodyMinimal["status"];

export interface ISelectPaymentButtonProps {
    totalAmount: number;
    customerId?: string;
    purchasingItems?: Array<IBundle>;
    onSuccess?: (orderPayment: IPayPalOrderResponse, orderSer?: IOrder) => any;
    onError?: (error: any) => any;
}

const mapBundleToPayPalItems = (items: IBundle[]): PurchaseItem[] => {
    return items.map((item) => {
        const { name, salePrice } = item;
        return {
            name,
            quantity: "1",
            unit_amount: { currency_code: "USD", value: salePrice + "" },
            category: "DIGITAL_GOODS",
        };
    });
};

const mapBundleToOrderProduct = (items: IBundle[]): any[] => {
    return items.map((item) => {
        const { name, provider, assignTo } = item;
        const base = {
            id: name,
            quantity: 1,
            provider,
        };
        if (isValidEsimIccId(assignTo)) {
            Object.assign(base, { assignTo });
        }
        return base;
    });
};

const SelectPaymentButton: React.FC<ISelectPaymentButtonProps> = ({
    totalAmount,
    customerId,
    purchasingItems,
    onSuccess,
    onError,
}) => {
    const { setActiveOrder } = useContext(AppStateContext);
    const [{ isPending }] = usePayPalScriptReducer();
    const [openPaymentsModal, setOpenPaymentsModal] = useState<{
        open: boolean;
    }>({ open: false });

    const onCreateOrder = async (actions: CreateOrderActions) => {
        const payload = {
            products: purchasingItems
                ? mapBundleToOrderProduct(purchasingItems)
                : [],
            customer: customerId || null,
        };
        const createdOrderSer = await OrderApi.create(payload);

        const orderSer = createdOrderSer?.data?.data?.data;
        setActiveOrder(orderSer);
        const payPalOrderPayload = {
            purchase_units: [
                {
                    amount: {
                        value: totalAmount + "",
                        currency_code: "USD",
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: totalAmount + "",
                            },
                        },
                    },
                    items: purchasingItems
                        ? mapBundleToPayPalItems(purchasingItems)
                        : [],
                    custom_id: customerId,
                },
            ],
        };
        return actions.order.create(payPalOrderPayload);
    };

    const onApproveOrder = (actions: OnApproveActions) => {
        if (!actions?.order) {
            return Promise.reject();
        }
        return actions.order
            .capture()
            .then((details: any) => {
                const name = details?.payer?.name?.given_name;
                // alert(`Transaction completed by ${name}`);
                onSuccess && onSuccess(details);
                setOpenPaymentsModal({
                    open: false,
                });
            })
            .catch((error: any) => {
                console.error("Error payment from PayPal", {
                    error,
                });
                onError && onError(error);
            });
    };

    const renderPayPal = () => {
        return (
            <PayPalButtons
                createOrder={(data, actions) => {
                    return onCreateOrder(actions) as any;
                }}
                onApprove={(data, actions) => {
                    return onApproveOrder(actions);
                }}
                style={{ layout: "vertical", color: "black" }}
            />
        );
    };

    return (
        <React.Fragment>
            <div
                className="bg-black border border-gold text-white flex items-center justify-between px-4 py-3 rounded-2xl mt-4 w-full select-payment-button"
                onClick={() => {
                    setOpenPaymentsModal({ open: true });
                }}
            >
                <div className="flex items-center">
                    <div className="bg-black border-2 border-gold p-2 rounded-full mr-2">
                        <Icon icon="credit-card" className="text-gold" />
                    </div>
                    <div>{Messages.selectPaymentMethod}</div>
                </div>
                <Icon icon="arrow-right" className="text-gold" />
            </div>
            {openPaymentsModal.open && (
                <Modal
                    showFooter={false}
                    title={Messages.selectPaymentMethod}
                    open={openPaymentsModal.open}
                    onClose={() => {
                        setOpenPaymentsModal({ open: false });
                    }}
                >
                    <PaymentModalStyled className="mt-5">
                        {map(PAYMENT_METHODS, (item) => {
                            const { icon, id, label } = item || {};
                            if (id === PaymentMethod.PAYPAL) {
                                return renderPayPal();
                            }
                            return (
                                <div className="flex items-center">
                                    <Icon icon={icon} />
                                    <div>{label}</div>
                                </div>
                            );
                        })}
                    </PaymentModalStyled>
                </Modal>
            )}
        </React.Fragment>
    );
};

export default SelectPaymentButton;

const PaymentModalStyled = styled.div``;
