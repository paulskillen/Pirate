import { PaymentMethod, PAYMENT_METHODS } from "@/common/constant/payment";
import { PayPalButtons } from "@paypal/react-paypal-js";
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
import { Modal } from "d-react-components";
import { map } from "lodash";
import React, { useContext, useState } from "react";
import { IBundle } from "@/common/interface/bundle";
import OrderApi from "@/apis/order/OrderApi";
import { IOrder } from "@/common/interface/order";
import { AppStateContext } from "@/common/context/app/app-context";

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
        const { name, price } = item;
        return {
            name,
            quantity: "1",
            unit_amount: { currency_code: "USD", value: price + "" },
            category: "DIGITAL_GOODS",
        };
    });
};

const mapBundleToOrderProduct = (items: IBundle[]): any[] => {
    return items.map((item) => {
        const { name, provider } = item;
        return {
            id: name,
            quantity: 1,
            provider,
        };
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
        return actions.order.create({
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
        });
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
                    return onCreateOrder(actions);
                }}
                onApprove={(data, actions) => {
                    return onApproveOrder(actions);
                }}
            />
        );
    };

    return (
        <React.Fragment>
            <div
                className="bg-gold text-white flex items-center justify-between px-4 py-3 rounded-3xl mt-4"
                onClick={() => {
                    setOpenPaymentsModal({ open: true });
                }}
            >
                <div className="flex items-center">
                    <div className="bg-primary p-2 rounded-full mr-2">
                        <Icon icon="credit-card" />
                    </div>
                    <div>{Messages.selectPaymentMethod}</div>
                </div>
                <Icon icon="arrow-right" />
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
                </Modal>
            )}
        </React.Fragment>
    );
};

export default SelectPaymentButton;
