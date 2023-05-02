import { find, isEmpty, map } from "lodash";
import ClassNames from "classnames";
import React, { useContext, useMemo, useState } from "react";
import { IBundle } from "@/common/interface/bundle";
import { Button, Checkbox } from "d-react-components";
import ProviderNameItem from "../provider/shared/ProviderNameItem";
import Messages from "@/languages/Messages";
import { AppStateContext } from "@/common/context/app/app-context";
import Image from "@/components/image/Image";
import { convertBase64ToImgSource } from "@/common/utils/image";
import { useRouter } from "next/router";
import { ProviderName } from "@/common/interface/provider";
import PriceTag from "../shared/items/PriceTag";
import Path from "@/common/constant/path";

export interface IBundleByCountryPageProps {
    bundles: IBundle[];
    countryCode: string;
    [key: string]: any;
}

export interface IBundleItemProps {
    bundle: IBundle;
    showRadio?: boolean;
    onClick?: any;
    selected?: boolean;
}

const BundleByCountryPage: React.FC<IBundleByCountryPageProps> = ({
    bundles = [],
    countryCode,
}) => {
    const router = useRouter();
    const { metaData, setUserCart } = useContext(AppStateContext);
    const { countryList = [] } = metaData ?? {};
    const [selectedBundle, setSelectedBundle] = useState<IBundle>();
    const currentCountry = find(
        countryList,
        (item) => item?.isoAlpha2 === countryCode
    );

    const renderCheckout = () => {
        return (
            <div className="absolute bottom-5 w-full px-3 z-30">
                <Button
                    className="w-full font-bold z-30"
                    style={{ width: "100%", fontWeight: "bold", fontSize: 16 }}
                    onClick={() => {
                        if (selectedBundle) {
                            setUserCart([selectedBundle]);
                            router.push(Path.checkout().href);
                        }
                    }}
                >
                    {`${Messages.checkout}\b \b`}
                    <PriceTag price={selectedBundle?.price} />
                </Button>
            </div>
        );
    };

    return (
        <div className="bg-transparent text-white">
            <div className="flex flex-row items-center justify-between py-2 px-4  rounded-b-3xl">
                <Button
                    onClick={() => router.back()}
                    variant="trans"
                    iconName="arrow_back_ios_new"
                    className="px-0"
                    color="light"
                />
                <div className="text-xl">{currentCountry?.name}</div>
                <Image
                    alt="flag"
                    className="w-12 h-auto rounded"
                    src={convertBase64ToImgSource(currentCountry?.flag)}
                />
            </div>
            <div className="h-screen overflow-y-scroll px-4">
                {map(bundles, (item, index) => {
                    const isSelected =
                        !!selectedBundle?.name &&
                        selectedBundle?.name === item?.name;
                    return (
                        <BundleItem
                            selected={isSelected}
                            bundle={item}
                            onClick={() => setSelectedBundle(item)}
                        />
                    );
                })}
                <div className="h-96" />
            </div>
            {!isEmpty(selectedBundle) && renderCheckout()}
        </div>
    );
};

export default BundleByCountryPage;

export const BundleItem: React.FC<IBundleItemProps> = ({
    bundle,
    onClick,
    selected,
    showRadio = true,
}) => {
    const { provider, name, dataAmount, duration, description, price, id } =
        bundle || {};
    const rowClass = ClassNames("flex flex-row items-center text-xl");
    const dataDisplay = useMemo(() => {
        if (provider === ProviderName.ESIM_GO) {
            return `${Math.floor(dataAmount / 1000)}GB`;
        }
        return null;
    }, [dataAmount, provider]);

    return (
        <div
            className="flex flex-row mt-4 text-white bg-gold rounded-3xl p-3 text-xl z-10 relative"
            onClick={onClick}
        >
            {showRadio && (
                <Checkbox
                    checked={selected}
                    variant="radio"
                    className="h-fit text-white border-white mt-1"
                />
            )}
            <div className="w-full ml-3">
                <div className={rowClass}>
                    <div>{id}</div>
                </div>
                <div className={rowClass}>
                    <div>{dataDisplay}</div>
                </div>
                <div className={rowClass}>
                    {duration}
                    {Messages.days}
                </div>
                <div className={`${rowClass} text opacity-75`}>
                    <div>{Messages.provider}</div>
                    <ProviderNameItem providerId={provider} />
                </div>
                <div className="w-full flex justify-end">
                    <div>{`${Messages.price} \b \b`}</div>
                    <PriceTag price={price} />
                </div>
            </div>
        </div>
    );
};
