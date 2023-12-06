import { IOrder, OrderType } from "@/common/interface/order";
import styled from "@emotion/styled";
import * as Yup from "yup";
import Modal, { IModalProps } from "@/components/modal/Modal";
import Lottie from "react-lottie";

import React, {
    Fragment,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import Image from "next/image";
import Messages from "@/languages/Messages";
import { Button, Loading, Progress, useFirstTime } from "d-react-components";
import { useAuthProfile } from "@/store/auth/authHook";
import { useFormik } from "formik";
import Icon from "@/components/icon/Icon";
import InputText from "@/components/input/InputText";
import Path from "@/common/constant/path";
import { useRouter } from "next/router";
import OrderApi from "@/apis/order/OrderApi";
import { AppStateContext } from "@/common/context/app/app.context";
import ThankYouAnimation from "@/common/assets/animation/thankyou.json";
import ThankYou1Animation from "@/common/assets/animation/thankyou-1.json";
import { TEST_ORDER } from "./CheckoutPage";

export interface ICheckoutSuccessPageProps {}

enum SendEmailState {
    INIT = "INIT",
    SENDING = "SENDING",
    SENT_SUCCESS = "SENT_SUCCESS",
    SENT_FAIL = "SENT_FAIL",
}

const CheckoutSuccessPage: React.FC<ICheckoutSuccessPageProps> = ({}) => {
    const router = useRouter();
    const orderId = router?.query?.orderId;
    const [successOrder, setSuccessOrder] = useState<IOrder>();
    const { id, products, subTotal, orderType } = successOrder || {};
    const productId = products?.[0]?.product?.id;
    const { avatar, email, firstName, lastName } = useAuthProfile() || {};
    const [sendEmailState, setSendEmailState] = useState(SendEmailState.INIT);
    const EmailFormSchema = Yup.object().shape({
        emailToSent: Yup.string()
            .email(Messages.emailIsNotValid)
            .required(Messages.pleaseInputTheEmailFirst),
    });
    const emailForm = useFormik({
        initialValues: {
            emailToSent: email,
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: EmailFormSchema,
        onSubmit: (values) => {
            onSendingEmail();
        },
    });
    const { values, errors, setFieldValue, setValues, handleSubmit } =
        emailForm || {};
    const { emailToSent } = values || {};
    const isLogin = !!email;

    useEffect(() => {
        if (isLogin && orderType === OrderType.BUY_NEW) {
            onSendingEmail();
        }
    }, [isLogin, orderType]);

    useEffect(() => {
        if (orderId) {
            loadOrderDetail();
        }
    }, [orderId]);

    const loadOrderDetail = async () => {
        return Progress.show(
            { method: OrderApi.detail, params: [orderId] },
            (res: any) => {
                const orderData = res?.data?.data?.data;
                setSuccessOrder(orderData);
            }
        );
    };

    const onSendingEmail = async () => {
        if (sendEmailState === SendEmailState.SENDING) {
            return;
        }
        const payload = {
            // orderId: TEST_ORDER,
            orderId: successOrder?.id,
            email: emailToSent,
        };
        setSendEmailState(SendEmailState.SENDING);
        try {
            const res = await OrderApi.sentEmail(payload);
            if (res?.data?.data) {
                setSendEmailState(SendEmailState.SENT_SUCCESS);
            } else {
                setSendEmailState(SendEmailState.SENT_FAIL);
            }
        } catch (error) {
            console.error({ error });
            setSendEmailState(SendEmailState.SENT_FAIL);
        }
    };

    const onClickViewOrder = useCallback(() => {
        router.push(Path.orderDetail(successOrder).as || "");
    }, [successOrder, router]);

    const onClickViewEsim = useCallback(() => {
        router.push(Path.esimsDetail(successOrder).as || "");
    }, [successOrder, router]);

    const renderThankyou = useMemo(() => {
        return (
            <div className="flex flex-col items-center justify-between mt-[100px] mb-[30px] text-gold">
                <div className="lottie-wrapper h-[250px] w-[250px]">
                    <Lottie
                        style={{ backgroundColor: "black", flex: 1 }}
                        options={{
                            animationData: ThankYou1Animation,
                            loop: true,
                            autoplay: true,
                            rendererSettings: {
                                preserveAspectRatio: "xMidYMid slice",
                            },
                        }}
                    />
                </div>
                <div className="h3 font-semibold mt-[20px] text-gold-light text-center px-4">
                    {Messages.thankyouForYourPurchase}
                </div>
            </div>
        );
    }, []);

    const renderEmailForm = () => {
        const getInputView = () => {
            if (sendEmailState === SendEmailState.SENT_SUCCESS) {
                return (
                    <div
                        className="w-full text-base text-center px-2 text-gray-300 mb-3"
                        dangerouslySetInnerHTML={{
                            __html: `${Messages.sentEmailSuccessDescription.replace(
                                "@email",
                                `<span class="text-gold font-semibold">${emailToSent}</span>`
                            )}`,
                        }}
                    />
                );
            }
            if (sendEmailState === SendEmailState.SENDING) {
                return (
                    <div
                        className="w-full text-base text-center px-2 text-gray-300 mb-3"
                        dangerouslySetInnerHTML={{
                            __html: `${Messages.sendingEmailDescription.replace(
                                "@email",
                                `<span class="text-gold font-semibold">${emailToSent}</span>`
                            )}...`,
                        }}
                    />
                );
            }
            return (
                <div className="container flex flex-col items-center">
                    <div className="w-full text-center text-xl md:px-[200px] text-gold-light mb-4">
                        {Messages.emailFormDescription}.
                    </div>
                    <div className="mt-3 bg-gold-light rounded-full p-[2px] w-full md:w-auto md:min-w-[400px]">
                        <InputText
                            className=""
                            value={values?.emailToSent}
                            placeholder="Your email..."
                            onChange={(e) =>
                                setFieldValue("emailToSent", e?.target?.value)
                            }
                            variant="pirate-mobile"
                        />
                    </div>
                    {errors?.emailToSent && (
                        <div className="mt-3 text-red-500">
                            {errors?.emailToSent}
                        </div>
                    )}
                </div>
            );
        };
        const getSendIcon = () => {
            switch (sendEmailState) {
                case SendEmailState.SENT_SUCCESS:
                    return (
                        <Icon
                            icon="check-circle"
                            className="text-green-500 mr-2"
                        />
                    );
                case SendEmailState.SENT_FAIL:
                    return (
                        <Icon
                            useIconSet="google-material"
                            icon="cached"
                            className="text-red-500 mr-2"
                        />
                    );
                case SendEmailState.SENDING:
                    return (
                        <svg
                            aria-hidden="true"
                            className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gold"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                    );
                default:
                    return <Icon icon="send" className="text-gold mr-2" />;
            }
        };
        const getSendText = () => {
            switch (sendEmailState) {
                case SendEmailState.SENT_SUCCESS:
                    return (
                        <div className="text-green-500">{Messages.sent}</div>
                    );
                case SendEmailState.SENT_FAIL:
                    return <div className="text-red-500">{Messages.retry}</div>;
                case SendEmailState.SENDING:
                    return <div>{Messages.sending}...</div>;
                default:
                    return <div>{Messages.send}</div>;
            }
        };

        return (
            <EmailFormStyled className="text-gold flex flex-col justify-center items-center">
                {getInputView()}
                <div className="flex-center-y mt-3 w-full md:w-auto md:min-w-[400px] justify-evenly md:justify-between">
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
                        disabled={[
                            SendEmailState.SENDING,
                            SendEmailState.SENT_SUCCESS,
                        ].includes(sendEmailState)}
                    >
                        {getSendIcon()}
                        {getSendText()}
                    </Button>
                </div>
            </EmailFormStyled>
        );
    };

    const renderPAPScript = useMemo(() => {
        return (
            <div>
                <img
                    src={`https://piratemobile.postaffiliatepro.com/scripts/d4dvusx?AccountId=default1&TotalCost=${subTotal}&OrderID=${id}&ProductID=${productId}`}
                    width="1"
                    height="1"
                />
            </div>
        );
    }, []);

    const renderButton = () => {
        return (
            <div className="flex justify-center">
                <Button
                    size="small"
                    variant="trans"
                    className="rounded-full checkout-success-modal__button"
                    onClick={onClickViewEsim}
                >
                    {`${Messages.viewEsim} >>`}
                </Button>
            </div>
        );
    };

    return (
        <CheckoutSuccessPageStyled className="relative z-20 bg-black">
            {renderThankyou}
            {orderType === OrderType.BUY_NEW && renderEmailForm()}
            {orderType === OrderType.TOP_UP && renderButton()}
            {renderPAPScript}
        </CheckoutSuccessPageStyled>
    );
};

export default CheckoutSuccessPage;

const EmailFormStyled = styled.div`
    .checkout-success-modal__button {
        color: var(--color-gold) !important;
    }
`;

const CheckoutSuccessPageStyled = styled.div`
    .lottie-wrapper {
        g {
            fill: black !important;
        }
    }
`;
