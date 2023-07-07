import { IOrder } from "@/common/interface/order";
import Modal, { IModalProps } from "@/components/modal/Modal";
import React from "react";
import Image from "next/image";
import Messages from "@/languages/Messages";

export interface ICheckoutSuccessModalProps
    extends Omit<IModalProps, "children"> {
    order: IOrder;
}

const CheckoutSuccessModal: React.FC<ICheckoutSuccessModalProps> = ({
    open,
    onClose,
    order,
}) => {
    const { id, products, orderNo, subTotal } = order || {};
    const productId = products?.[0]?.product?.id;

    const renderPAPScript = () => {
        return (
            <div>
                <img
                    src={`https://piratemobile.postaffiliatepro.com/scripts/d4dvusx?AccountId=default1&TotalCost=${subTotal}&OrderID=${id}&ProductID=${productId}`}
                    width="1"
                    height="1"
                />
            </div>
        );
    };

    return (
        <Modal open={open} onClose={onClose} showFooter>
            <div className="flex flex-col items-center justify-between">
                <Image
                    alt="logo_mobile"
                    src={"/images/logo/logo.png"}
                    width={50}
                    height={50}
                />
                <div className="text-gold font-semibold mt-3">
                    {Messages.thankyouForYourPurchase}
                </div>
            </div>
            {renderPAPScript()}
        </Modal>
    );
};

export default CheckoutSuccessModal;
