import { IOrder } from "@/common/interface/order";
import styled from "@emotion/styled";
import Modal, { IModalProps } from "@/components/modal/Modal";
import React from "react";
import Image from "next/image";
import Messages from "@/languages/Messages";
import { Button, InputText } from "d-react-components";
import { useAuthProfile } from "@/store/auth/authHook";
import { useFormik } from "formik";

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
    const { avatar, email, firstName, lastName } = useAuthProfile() || {};

    const emailForm = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
        // validationSchema: LoginSchema,
        onSubmit: (values) => {
            // setOnLoadSignIn(true);
            onSubmitHandler();
        },
    });

    const { values, errors, setFieldValue, setValues } = emailForm || {};

    const onSubmitHandler = () => {};

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

    const renderEmailForm = () => {
        return (
            <EmailFormStyled className="">
                {!email && <InputText />}
                <div className="flex-center-y mt-3 w-full justify-evenly">
                    <Button
                        size="small"
                        color="dark"
                        className="rounded-full checkout-success-modal__cancel-button"
                        onClick={onClose}
                    >
                        {Messages.cancel}
                    </Button>
                    <Button
                        size="small"
                        className="rounded-full checkout-success-modal__save-button"
                    >
                        {Messages.save}
                    </Button>
                </div>
            </EmailFormStyled>
        );
    };

    return (
        <Modal open={open} onClose={onClose}>
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
            {renderEmailForm()}
            {renderPAPScript()}
        </Modal>
    );
};

export default CheckoutSuccessModal;

const EmailFormStyled = styled.div`
    .checkout-success-modal__save-button {
        border: 1px solid var(--color-gold) !important;
    }
`;
