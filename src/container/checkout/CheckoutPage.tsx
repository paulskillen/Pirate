import { AppStateContext } from "@/common/context/app/app-context";
import Messages from "@/languages/Messages";
import { Button } from "d-react-components";
import { map } from "lodash";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { BundleItem } from "../bundle/BundleByCountryPage";

export interface ICheckoutPageProps {
    [key: string]: any;
}

const CheckoutPage: React.FC<ICheckoutPageProps> = ({ id }) => {
    const router = useRouter();
    const { userCart } = useContext(AppStateContext);
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
            </div>
            <div className="h-screen overflow-y-scroll px-4">
                {map(userCart, (item, index) => {
                    // const isSelected =
                    //     !!selectedBundle?.name &&
                    //     selectedBundle?.name === item?.name;
                    return (
                        <BundleItem
                            bundle={item}
                            // onClick={() => setSelectedBundle(item)}
                        />
                    );
                })}
                <div className="h-96" />
            </div>
            {/* {!isEmpty(selectedBundle) && renderCheckout()} */}
        </div>
    );
};

export default CheckoutPage;