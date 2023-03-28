import { PaymentMethod, PAYMENT_METHODS } from "@/common/constant/payment";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {
    OrderResponseBody,
    OrderResponseBodyMinimal,
    PurchaseItem,
} from "@paypal/paypal-js/types/apis/orders";
import Icon from "@/components/icon/Icon";
import Messages from "@/languages/Messages";
import { Modal } from "d-react-components";
import { map } from "lodash";
import React, { useState } from "react";
import { IBundle } from "@/common/interface/bundle";

export interface IPayPalOrderResponse extends OrderResponseBody {}
export type PayPalOrderStatusType = OrderResponseBodyMinimal["status"];

export interface ISelectPaymentButtonProps {
    totalAmount: number;
    customerId: string;
    purchasingItems?: Array<IBundle>;
    onSuccess?: (orderRes: IPayPalOrderResponse) => any;
    onError?: (error: any) => any;
}

const SelectPaymentButton: React.FC<ISelectPaymentButtonProps> = ({
    totalAmount,
    customerId,
    purchasingItems,
    onSuccess,
    onError,
}) => {
    const [openPaymentsModal, setOpenPaymentsModal] = useState<{
        open: boolean;
    }>({ open: false });

    const renderPayPal = () => {
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

        return (
            <PayPalButtons
                createOrder={(data, actions) => {
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
                }}
                onApprove={(data, actions) => {
                    if (!actions?.order) {
                        return Promise.reject();
                    }
                    return actions.order
                        .capture()
                        .then((details) => {
                            console.log(
                                "🚀 >>>>>> file: SelectPaymentButton.tsx:70 >>>>>> .then >>>>>> details:",
                                details
                            );
                            const name = details?.payer?.name?.given_name;
                            alert(`Transaction completed by ${name}`);
                            setOpenPaymentsModal({
                                open: false,
                            });
                            onSuccess && onSuccess(details);
                        })
                        .catch((error) => {
                            console.error("Error payment from PayPal", {
                                error,
                            });
                            onError && onError(error);
                        });
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
                        if (id === PaymentMethod.PAY_PAL) {
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
