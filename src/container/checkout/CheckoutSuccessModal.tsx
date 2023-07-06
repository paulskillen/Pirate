import { IOrder } from "@/common/interface/order";
import styled from "@emotion/styled";
import * as Yup from "yup";
import Modal, { IModalProps } from "@/components/modal/Modal";
import React from "react";
import Image from "next/image";
import Messages from "@/languages/Messages";
import { Button } from "d-react-components";
import { useAuthProfile } from "@/store/auth/authHook";
import { useFormik } from "formik";
import Icon from "@/components/icon/Icon";
import InputText from "@/components/input/InputText";
import Path from "@/common/constant/path";
import { useRouter } from "next/router";

export interface ICheckoutSuccessModalProps
    extends Omit<IModalProps, "children"> {
    order: IOrder;
}

const CheckoutSuccessModal: React.FC<ICheckoutSuccessModalProps> = ({
    open,
    onClose,
    order,
}) => {
    const router = useRouter();
    const { id, products, orderNo, subTotal } = order || {};
    const productId = products?.[0]?.product?.id;
    const { avatar, email, firstName, lastName } = useAuthProfile() || {};

    const EmailFormSchema = Yup.object().shape({
        emailToSent: Yup.string()
            .email(Messages.emailIsNotValid)
            .required(Messages.requiredField),
    });

    const emailForm = useFormik({
        initialValues: {
            emailToSent: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: EmailFormSchema,
        onSubmit: (values) => {
            // setOnLoadSignIn(true);
            onSubmitHandler();
        },
    });

    const { values, errors, setFieldValue, setValues, handleSubmit } =
        emailForm || {};
    const onSubmitHandler = () => {};

    const onClickViewOrder = () => {
        onClose && onClose();
        router.push(Path.orderDetail(order).as || "");
    };

    const renderThankyou = () => {
        return (
            <div className="flex flex-col items-center justify-between my-4 text-gold">
                <Image
                    alt="logo_mobile"
                    src={"/images/logo/logo.png"}
                    width={50}
                    height={50}
                />
                <div className=" font-semibold mt-3">
                    {Messages.thankyouForYourPurchase}
                </div>
            </div>
        );
    };
    const renderEmailForm = () => {
        return (
            <EmailFormStyled className="text-gold flex flex-col justify-center items-center">
                <div className="w-full text-base px-2 text-gray-300 mb-3">
                    {Messages.emailFormDescription}.
                </div>
                <InputText
                    className="w-full"
                    value={values?.emailToSent}
                    onChange={(e) =>
                        setFieldValue("emailToSent", e?.target?.value)
                    }
                    variant="pirate-mobile"
                    error={errors?.emailToSent}
                />
                {/* {!email && (
                    <InputText
                        value={values?.emailToSent}
                        onChange={(e) =>
                            setFieldValue("emailToSent", e?.target?.value)
                        }
                    />
                )} */}
                <div className="flex-center-y mt-3 w-full justify-evenly">
                    <Button
                        size="small"
                        variant="trans"
                        className="rounded-full checkout-success-modal__button"
                        onClick={onClickViewOrder}
                    >
                        {Messages.viewOrder}
                    </Button>
                    <Button
                        size="x-small"
                        variant="trans"
                        className="rounded-full checkout-success-modal__button"
                        onClick={handleSubmit as any}
                    >
                        <Icon icon="send" className="text-gold mr-2" />
                        {Messages.send}
                    </Button>
                </div>
            </EmailFormStyled>
        );
    };

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
        <Modal open={open} onClose={onClose}>
            {renderThankyou()}
            {renderEmailForm()}
            {renderPAPScript()}
        </Modal>
    );
};

export default CheckoutSuccessModal;

const EmailFormStyled = styled.div`
    .checkout-success-modal__button {
        /* border: 1px solid var(--color-gold) !important; */
        color: var(--color-gold) !important;
    }
`;
