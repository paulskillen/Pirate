import { PaymentMethod, PAYMENT_METHODS } from "@/common/constant/payment";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Icon from "@/components/icon/Icon";
import Messages from "@/languages/Messages";
import { Modal } from "d-react-components";
import { map } from "lodash";
import React, { useState } from "react";

export interface ISelectPaymentButtonProps {
    [key: string]: any;
}

const SelectPaymentButton: React.FC<ISelectPaymentButtonProps> = ({ id }) => {
    const [openPaymentsModal, setOpenPaymentsModal] = useState<{
        open: boolean;
    }>({ open: false });

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
                            return (
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: "1.99",
                                                    },
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
                                                const name =
                                                    details?.payer?.name
                                                        ?.given_name;
                                                alert(
                                                    `Transaction completed by ${name}`
                                                );
                                            });
                                    }}
                                />
                            );
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
