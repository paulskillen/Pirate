import { find, map } from "lodash";
import ClassNames from "classnames";
import React, { useContext, useMemo } from "react";
import { IBundle } from "@/common/interface/bundle";
import { Button, Checkbox } from "d-react-components";
import ProviderNameItem from "../provider/shared/ProviderNameItem";
import Messages from "@/languages/Messages";
import { AppStateContext } from "@/common/context/app/app-context";
import Image from "@/components/image/Image";
import { convertBase64ToImgSource } from "@/common/utils/image";
import { useRouter } from "next/router";
import { ProviderName } from "@/common/interface/provider";

export interface IBundleByCountryPageProps {
    bundles: IBundle[];
    countryCode: string;
    [key: string]: any;
}

export interface IBundleItemProps {
    bundle: IBundle;
    showRadio?: boolean;
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
            <div className="flex flex-row items-center justify-between py-2 px-4 bg-primary text-white rounded-b-3xl">
                <Button
                    onClick={() => router.back()}
                    variant="trans"
                    iconName="arrow_back_ios_new"
                    className="px-0"
                    color="light"
                />
                <div>{currentCountry?.name}</div>
                <Image
                    alt="flag"
                    className="w-12 h-auto rounded"
                    src={convertBase64ToImgSource(currentCountry?.flag)}
                />
            </div>
            <div className="h-screen overflow-scroll px-4">
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
    const rowClass = ClassNames("flex flex-row items-center text-xl");
    const dataDisplay = useMemo(() => {
        if (provider === ProviderName.ESIM_GO) {
            return `${Math.floor(dataAmount / 1000)}GB`;
        }
        return null;
    }, [dataAmount, provider]);

    return (
        <div className="flex flex-row mt-4 text-white bg-gold rounded-3xl p-4 text-xl">
            <Checkbox variant="radio" className="h-fit" />
            <div className="w-full">
                <div className={rowClass}>
                    <div>{dataDisplay}</div>
                </div>
                <div className={rowClass}>
                    {duration}
                    {Messages.days}
                </div>
                <div className={rowClass}>
                    <div>{Messages.provider}</div>
                    <ProviderNameItem providerId={provider} />
                </div>
                <div className="w-full flex justify-end">{price}</div>
            </div>
        </div>
    );
};
