import { find, map } from "lodash";
import ClassNames from "classnames";
import React, { useContext } from "react";
import { IBundle } from "@/common/interface/bundle";
import { Button, Checkbox } from "d-react-components";
import ProviderNameItem from "../provider/shared/ProviderNameItem";
import Messages from "@/languages/Messages";
import { AppStateContext } from "@/common/context/app/app-context";
import Image from "@/components/image/Image";
import { convertBase64ToImgSource } from "@/common/utils/image";
import { useRouter } from "next/router";

export interface IBundleByCountryPageProps {
    bundles: IBundle[];
    countryCode: string;
    [key: string]: any;
}

export interface IBundleItemProps {
    bundle: IBundle;
    [key: string]: any;
}

const BundleByCountryPage: React.FC<IBundleByCountryPageProps> = ({
    bundles = [],
    countryCode,
}) => {
    const router = useRouter();
    const { countryList } = useContext(AppStateContext);
    const currentCountry = find(
        countryList,
        (item) => item?.isoAlpha2 === countryCode
    );

    return (
        <div>
            <div className="flex flex-row items-center justify-between py-3 px-3">
                <Button
                    onClick={() => router.back()}
                    variant="trans"
                    iconName="arrow_back_ios_new"
                    className="px-0"
                />
                <div>{currentCountry?.name}</div>
                <Image
                    alt="flag"
                    className="w-12 h-auto rounded"
                    src={convertBase64ToImgSource(currentCountry?.flag)}
                />
            </div>
            <div className="h-screen overflow-scroll">
                {map(bundles, (item, index) => {
                    return <BundleItem bundle={item} />;
                })}
            </div>
        </div>
    );
};

export default BundleByCountryPage;

export const BundleItem: React.FC<IBundleItemProps> = ({ bundle }) => {
    const { provider, name, dataAmount, duration, description, price, id } =
        bundle || {};

    const rowClass = ClassNames("flex flex-row items-center");

    return (
        <div className="flex flex-row">
            <Checkbox variant="radio" />
            <div>
                <div className={rowClass}>
                    <div>{dataAmount}</div>
                    <div>{price}</div>
                </div>
                <div className={rowClass}>
                    <label>{duration}</label>
                    <div>{parseInt(Math.floor(price / dataAmount) as any)}</div>
                </div>
                <div className={rowClass}>
                    <div>{Messages.provider}</div>
                    <ProviderNameItem providerId={provider} />
                </div>
            </div>
        </div>
    );
};
