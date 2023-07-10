import { find, isEmpty, join, map } from "lodash";
import ClassNames from "classnames";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { IBundle } from "@/common/interface/bundle";
import { Button, Checkbox, Progress } from "d-react-components";
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
import styled from "@emotion/styled";
import BundleApi from "@/apis/bundle/BundleApi";
import {
    COLOR_GOLD,
    COLOR_PRIMARY,
    COLOR_PRIMARY_DARK,
} from "@/common/constant/app-style";

export interface IBundleByCountryPageProps {
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
    countryCode,
    bundles,
}) => {
    const router = useRouter();
    const { metaData, setUserCart } = useContext(AppStateContext);
    const { countryList = [] } = metaData ?? {};
    const [selectedBundle, setSelectedBundle] = useState<IBundle>();
    // const [bundles, setBundles] = useState<IBundle[]>();
    const currentCountry = find(
        countryList,
        (item) => item?.isoAlpha2 === countryCode
    );

    // useEffect(() => {
    //     if (countryCode) {
    //         loadBundles();
    //     }
    // }, [countryCode]);

    // const loadBundles = () => {
    //     return Progress.show(
    //         {
    //             method: BundleApi.listBundleFromCountry,
    //             params: [countryCode],
    //         },
    //         (res: any) => {
    //             const resBundles = res?.data?.data?.data ?? [];
    //             setBundles(resBundles);
    //         }
    //     );
    // };

    const renderCheckout = () => {
        return (
            <div
                className="fixed bottom-5 w-full px-3 z-30 bundle-by-country-page__footer flex justify-center items-center bounce-in-top"
                data-aos="bounce-in-top"
            >
                <Button
                    className="w-full font-bold z-30 border bundle-by-country-page__button-checkout rounded-pill flex flex-col"
                    style={{ fontWeight: "bold", fontSize: 16 }}
                    onClick={() => {
                        if (selectedBundle) {
                            setUserCart([selectedBundle]);
                            router.push(Path.checkout().href);
                        }
                    }}
                >
                    <div>{`${Messages.checkout}`}</div>
                    <div className="mt-1">
                        <PriceTag price={selectedBundle?.salePrice} />
                    </div>
                </Button>
            </div>
        );
    };

    if (!bundles?.length) {
        return <div />;
    }

    return (
        <BundleByCountryPageStyled className="bg-transparent text-white relative">
            <PageHeader
                title={currentCountry?.name}
                customerRight={
                    <Image
                        alt="flag"
                        className="w-12 h-auto rounded border bundle-by-country-page__flag"
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
        </BundleByCountryPageStyled>
    );
};

export default BundleByCountryPage;

export const BundleItem: React.FC<IBundleItemProps> = ({
    bundle,
    onClick,
    selected,
    showRadio = true,
}) => {
    const {
        provider,
        name,
        dataAmount,
        duration,
        description,
        price,
        salePrice,
        bundleData,
        id,
    } = bundle || {};
    const { speed } = bundleData || {};
    const rowClass = ClassNames("flex flex-row items-center text-lg mt-2");
    const dataDisplay = useMemo(() => {
        if (provider === ProviderName.ESIM_GO) {
            return `${Math.floor(dataAmount / 1000)}GB`;
        }
        return null;
    }, [dataAmount, provider]);

    return (
        <BundleItemStyled
            className={ClassNames(
                "mt-4 text-white  rounded-2xl p-3 text-xl z-10 relative bounce-in-top",
                {
                    "border-2 bg-primary-dark": selected,
                    "border bg-black": !selected,
                }
            )}
            onClick={onClick}
            data-aos="bounce-in-top"
        >
            <div className="flex flex-row">
                {showRadio && (
                    <Checkbox
                        onChange={() => {}}
                        checked={selected}
                        variant="radio"
                        className="h-fit text-white border-white mt-1"
                    />
                )}
                <div className="w-full ml-3">
                    <div className="flex-center-y text-lg text-gold font-semibold">
                        <div>#</div>
                        <div className="ml-1">{id}</div>
                    </div>
                    <div className={rowClass}>
                        <div className="mr-1 text-gold text-base">
                            {Messages.data} :{" "}
                        </div>
                        <div className="font-semibold text-gray-300">
                            {dataDisplay}
                        </div>
                    </div>
                    <div className={rowClass}>
                        <div className="mr-1 text-gold  text-base">
                            {Messages.duration} :{" "}
                        </div>
                        <div className="font-semibold text-gray-300">{`${duration}  ${Messages.days}`}</div>
                    </div>
                    {/* {speed?.length && (
                        <div className={rowClass}>
                            <div className="mr-1 text-gold  text-base">
                                {Messages.speed} :{" "}
                            </div>
                            <div className="font-semibold text-gray-300">
                                {join(speed, ",")}
                            </div>
                        </div>
                    )} */}
                </div>
                <div className="rounded-full">
                    <Image
                        alt="pirate_logo"
                        className="rounded-full"
                        src="/images/logo/logo.png"
                        nextImageProps={{
                            width: 48,
                            height: 48,
                            style: { objectFit: "contain" },
                        }}
                    />
                </div>
            </div>
            <div className="w-full ml-3 px-3 flex justify-end items-center font-semibold text-gray-300 mt-2">
                {/* <div className="text-sm  text- px-2 py-1 rounded">{`${Messages.seeMoreDetail} >>`}</div> */}
                <div className="flex-center-y">
                    <Icon
                        icon="pricetags"
                        useIconSet="elegant"
                        size={16}
                        className="mr-2 text-gold"
                    />
                    <PriceTag price={salePrice} />
                </div>
            </div>
        </BundleItemStyled>
    );
};

const BundleItemStyled = styled.div`
    border-color: var(--color-gold) !important;
`;

const BundleByCountryPageStyled = styled.div`
    transition: all 2s linear;
    .bundle-by-country-page__button-checkout {
        color: var(--color-gold) !important;
        border-color: var(--color-gold) !important;
    }
    .bundle-by-country-page__flag {
        border-color: var(--color-gold) !important;
    }
    .bundle-by-country-page__footer {
        .bundle-by-country-page__button-checkout {
            background-color: ${COLOR_GOLD} !important;
            color: white !important;
            width: calc(100vw / 3.5) !important;
            height: calc(100vw / 3.5);
            border: 2px solid white !important;
            @media (min-width: 576px) {
                width: 175px !important;
                height: 175px;
            }
        }
    }
`;
