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
import PageHeader from "../shared/header/PageHeader";
import Icon from "@/components/icon/Icon";

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
            <div className="fixed bottom-5 w-full px-3 z-30">
                <Button
                    className="w-full font-bold z-30 border border-slate-500"
                    style={{ width: "100%", fontWeight: "bold", fontSize: 16 }}
                    onClick={() => {
                        if (selectedBundle) {
                            setUserCart([selectedBundle]);
                            router.push(Path.checkout().href);
                        }
                    }}
                >
                    {`${Messages.checkout}\b \b`}
                    <PriceTag price={selectedBundle?.salePrice} />
                </Button>
            </div>
        );
    };

    return (
        <div className="bg-transparent text-white relative">
            <PageHeader
                title={currentCountry?.name}
                customerRight={
                    <Image
                        alt="flag"
                        className="w-12 h-auto rounded border"
                        src={convertBase64ToImgSource(currentCountry?.flag)}
                    />
                }
            />
            <div className="h-screen overflow-y-scroll px-4">
                {map(bundles, (item, index) => {
                    const isSelected =
                        !!selectedBundle?.name &&
                        selectedBundle?.name === item?.name;
                    return (
                        <BundleItem
                            key={item?.id}
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
    const { provider, name, dataAmount, duration, description, salePrice, id } =
        bundle || {};
    const rowClass = ClassNames("flex flex-row items-center text-xl mt-3");
    const dataDisplay = useMemo(() => {
        if (provider === ProviderName.ESIM_GO) {
            return `${Math.floor(dataAmount / 1000)}GB`;
        }
        return null;
    }, [dataAmount, provider]);

    return (
        <div
            className="flex flex-row mt-4 text-white bg-black rounded-2xl p-3 text-xl z-10 relative border"
            onClick={onClick}
        >
            {showRadio && (
                <Checkbox
                    onChange={() => {}}
                    checked={selected}
                    variant="radio"
                    className="h-fit text-white border-white mt-1"
                />
            )}
            <div className="w-full ml-3">
                <div className="flex-center-y">
                    <div>#</div>
                    <div className="ml-1">{id}</div>
                </div>
                <div className={rowClass}>
                    <div>{dataDisplay}</div>
                </div>
                <div className={rowClass}>
                    {`${duration}  ${Messages.days}`}
                </div>
                <div className={`${rowClass} text `}>
                    <span className="font-semibold mr-1 opacity-75">
                        {Messages.provider} :{" "}
                    </span>
                    <ProviderNameItem providerId={provider} />
                </div>
                <div className="w-full flex justify-end ">
                    <div className="text-xl">{`${Messages.price} \b \b`}</div>
                    <PriceTag price={salePrice} />
                </div>
            </div>
            <Icon icon="sim" className="text-gold" size={36} />
        </div>
    );
};
