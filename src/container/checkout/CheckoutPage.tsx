import { AppStateContext } from "@/common/context/app/app-context";
import Messages from "@/languages/Messages";
import { Button } from "d-react-components";
import { map, reduce } from "lodash";
import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import { BundleItem } from "../bundle/BundleByCountryPage";
import SelectPaymentButton, {
    IPayPalOrderResponse,
} from "../shared/payment/SelectPaymentButton";

export interface ICheckoutPageProps {
    [key: string]: any;
}

const CheckoutPage: React.FC<ICheckoutPageProps> = ({ id }) => {
    const router = useRouter();
    const { userCart } = useContext(AppStateContext);
    const totalAmount = useMemo(() => {
        return reduce(
            userCart,
            (res, item, index) => {
                const { price } = item;
                return res + price;
            },
            0
        );
    }, [userCart]);

    const onSuccessPaymentHandler = (resOrder: IPayPalOrderResponse) => {};

    const renderButton = () => {
        return (
            <div className="absolute bottom-5 w-full px-3 z-30">
                <Button
                    className="w-full font-bold z-30"
                    style={{ width: "100%", fontWeight: "bold", fontSize: 16 }}
                    onClick={() => {
                        // if (selectedBundle) {
                        //     setUserCart([selectedBundle]);
                        //     router.push(Path.checkout().href);
                        // }
                    }}
                >
                    {`${Messages.completePurchase}`}
                </Button>
            </div>
        );
    };

    return (
        <div>
            <div className="flex flex-row items-center justify-between py-2 px-4 bg-primary text-white rounded-b-3xl">
                <Button
                    onClick={() => router.back()}
                    variant="trans"
                    iconName="arrow_back_ios_new"
                    className="px-0"
                    color="light"
                />
                <div className="text-xl">{Messages.yourOrder}</div>
                <div />
            </div>
            <div className="h-screen overflow-y-scroll px-4">
                {map(userCart, (item, index) => {
                    return <BundleItem bundle={item} showRadio={false} />;
                })}
                {totalAmount > 0 && (
                    <SelectPaymentButton
                        totalAmount={totalAmount}
                        onSuccess={(orderRes) => {
                            if (orderRes?.status === "APPROVED") {
                                onSuccessPaymentHandler(orderRes);
                            }
                        }}
                        onError={(error: any) => {}}
                        customerId="123"
                        purchasingItems={userCart}
                    />
                )}
                <div className="h-96" />
            </div>
            {/* {renderButton()} */}
        </div>
    );
};

export default CheckoutPage;
