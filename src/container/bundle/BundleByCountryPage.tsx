import { COLOR_GOLD } from "@/common/constant/app-style";
import Path from "@/common/constant/path";
import { AppStateContext } from "@/common/context/app/app-context";
import { IBundle, isValidEsimIccId } from "@/common/interface/bundle";
import { ProviderName } from "@/common/interface/provider";
import { convertBase64ToImgSource } from "@/common/utils/image";
import Icon from "@/components/icon/Icon";
import Image from "@/components/image/Image";
import Modal, { IModalProps } from "@/components/modal/Modal";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import ClassNames from "classnames";
import { Button, Checkbox } from "d-react-components";
import { find, isEmpty, join, map } from "lodash";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useMemo, useState } from "react";
import PageHeader from "../shared/header/PageHeader";
import PriceTag from "../shared/items/PriceTag";
import { useSearchParam } from "react-use";

export interface IBundleByCountryPageProps {
    countryCode: string;
    [key: string]: any;
}

export interface IBundleItemProps {
    bundle: IBundle;
    showRadio?: boolean;
    onClick?: any;
    selected?: boolean;
    className?: string;
    animation?: string;
}

export interface IBundleDetailModalProps extends Omit<IModalProps, "children"> {
    bundle: IBundle;
}

const BundleByCountryPage: React.FC<IBundleByCountryPageProps> = ({
    countryCode,
    bundles,
}) => {
    const router = useRouter();
    const { pathname, query } = router || {};
    const { metaData, setUserCart } = useContext(AppStateContext);
    const { countryList = [] } = metaData ?? {};
    const [selectedBundle, setSelectedBundle] = useState<IBundle>();
    const topUpParams = useSearchParam("topup");
    const currentCountry = find(
        countryList,
        (item) => item?.isoAlpha2 === countryCode
    );
    const isTopUp = useMemo(() => {
        return topUpParams && isValidEsimIccId(topUpParams);
    }, [topUpParams]);

    const renderCheckout = () => {
        return (
            <div
                className={ClassNames(
                    "fixed  w-full px-3 z-30 bundle-by-country-page__footer flex  flex-col mt-4 items-center",
                    {
                        "bottom-40": pathname === Path.landing().href,
                        "bottom-20": pathname !== Path.landing().href,
                    }
                )}
            >
                <Button
                    className="w-full font-bold z-30 border bundle-by-country-page__button-checkout flex flex-col"
                    style={{ fontWeight: "bold", fontSize: 16 }}
                    onClick={() => {
                        if (selectedBundle) {
                            if (isTopUp) {
                                setUserCart([
                                    {
                                        ...selectedBundle,
                                        assignTo: topUpParams,
                                    },
                                ]);
                                router.push({
                                    pathname: Path.checkout().href,
                                    query: { topup: topUpParams },
                                });
                            } else {
                                setUserCart([selectedBundle]);
                                router.push(Path.checkout().href);
                            }
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
        // return (
        //     <div className="fixed bottom-20 w-full px-3 z-30 bundle-by-country-page__footer flex justify-center items-center bounce-in-top">
        //         <Button
        //             className="w-full font-bold z-30 border bundle-by-country-page__button-checkout rounded-pill flex flex-col"
        //             style={{ fontWeight: "bold", fontSize: 16 }}
        //             onClick={() => {
        //                 if (selectedBundle) {
        //                     if (isTopUp) {
        //                         setUserCart([
        //                             {
        //                                 ...selectedBundle,
        //                                 assignTo: topUpParams,
        //                             },
        //                         ]);
        //                         router.push({
        //                             pathname: Path.checkout().href,
        //                             query: { topup: topUpParams },
        //                         });
        //                     } else {
        //                         setUserCart([selectedBundle]);
        //                         router.push(Path.checkout().href);
        //                     }
        //                 }
        //             }}
        //         >
        //             <div>{`${Messages.checkout}`}</div>
        //             <div className="mt-1">
        //                 <PriceTag price={selectedBundle?.salePrice} />
        //             </div>
        //         </Button>
        //     </div>
        // );
    };

    if (!bundles?.length) {
        return <div />;
    }

    return (
        <BundleByCountryPageStyled className="bg-transparent text-white relative z-20 overflow-y-scroll h-screen">
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
            <div className="px-4 container md:flex flex-col items-center">
                {map(bundles, (item, index: any) => {
                    const isSelected =
                        !!selectedBundle?.name &&
                        selectedBundle?.name === item?.name;
                    const isEvent = index % 2 === 0;
                    return (
                        <BundleItem
                            key={item?.id}
                            selected={isSelected}
                            bundle={item}
                            onClick={() => setSelectedBundle(item)}
                            animation={isEvent ? "fade-right" : "fade-right"}
                        />
                    );
                })}
                <div className="h-60" />
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
    className,
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
    const [openDetailModal, setOpenDetailModal] = useState(false);

    return (
        <Fragment>
            <BundleItemStyled
                className={ClassNames(
                    "mt-4 text-white  rounded-2xl p-3 text-xl z-10 relative",
                    {
                        "border-2 bg-darken": selected,
                        "border bg-black": !selected,
                    },
                    className
                )}
            >
                <div className="flex flex-row" onClick={onClick}>
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
                            <div className="ml-1">{id}</div>
                        </div>
                        <div className={rowClass}>
                            <div className="mr-1 text-gold text-base">
                                {Messages.data} :{" "}
                            </div>
                            <div className="font-medium text text-gray-300">
                                {dataDisplay}
                            </div>
                        </div>
                        <div className={rowClass}>
                            <div className="mr-1 text-gold  text-base">
                                {Messages.duration} :{" "}
                            </div>
                            <div className="font-medium text text-gray-300">{`${duration}  ${Messages.days}`}</div>
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
                <div className="w-full ml-3 px-3 flex justify-between items-center  text-gray-300 mt-2">
                    <Button
                        size="auto"
                        variant="outline"
                        className="px-3 bundle-item__button-detail"
                        onClick={() => setOpenDetailModal(true)}
                    >
                        <div>
                            <Icon
                                icon="settings"
                                useIconSet="feather"
                                size={14}
                                className="block text-gold"
                            />
                        </div>
                        <div className="ml-1 text">{Messages.seeDetail}</div>
                    </Button>
                    <div
                        className="flex-center-y w-full justify-end"
                        onClick={onClick}
                    >
                        <Icon
                            icon="md-pricetags"
                            useIconSet="ion"
                            size={16}
                            className="mr-2 text-gold"
                        />
                        <PriceTag
                            className="font-medium text"
                            price={salePrice}
                        />
                    </div>
                </div>
            </BundleItemStyled>
            {openDetailModal && (
                <BundleDetailModal
                    bundle={bundle}
                    open={openDetailModal}
                    onClose={() => setOpenDetailModal(false)}
                />
            )}
        </Fragment>
    );
};

export const BundleDetailModal: React.FC<IBundleDetailModalProps> = ({
    bundle,
    onClick,
    selected,
    showRadio = true,
    open,
    onClose,
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
    const { speed, countries } = bundleData || {};
    const rowClass = ClassNames("flex flex-row items-start text-lg mt-2");
    const dataDisplay = useMemo(() => {
        if (provider === ProviderName.ESIM_GO) {
            return `${Math.floor(dataAmount / 1000)}GB`;
        }
        return null;
    }, [dataAmount, provider]);

    const renderContent = () => {
        return (
            <div className="flex flex-row">
                <div className="w-full ml-3">
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
                    <div className={`${rowClass} w-full`}>
                        <div className="mr-1 text-gold  text-base">
                            {Messages.description}:
                        </div>
                        <div className="font-semibold text-gray-300 w-full">{`${description}`}</div>
                    </div>
                    <div className="flex-center-y text-white">
                        <Icon
                            icon="md-pricetags"
                            useIconSet="ion"
                            size={16}
                            className="mr-2 text-gold"
                        />
                        <PriceTag price={salePrice} />
                    </div>
                    {speed?.length && (
                        <div className={rowClass}>
                            <div className="mr-1 text-gold  text-base">
                                {Messages.speed} :{" "}
                            </div>
                            <div className="font-semibold text-gray-300">
                                {join(speed, ",")}
                            </div>
                        </div>
                    )}
                </div>
                {/* <div className="rounded-full">
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
                </div> */}
            </div>
        );
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={description}
            closable
            maskClosable
        >
            {renderContent()}
        </Modal>
    );
};

const BundleItemStyled = styled.div`
    border-color: var(--color-gold) !important;
    width: 100%;
    @media (min-width: 768px) {
        width: 50vw;
    }
    .bundle-item__button-detail {
        background-color: black;
        border: 1px solid var(--color-gold);
        height: 28px !important;
        z-index: 100;
        padding: 4px 18px !important;
        .text {
            font-size: 12px !important;
            color: white;
            line-height: 16px;
        }
    }
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
        padding: 0px 16px !important;
        .bundle-by-country-page__button-checkout {
            background-color: ${COLOR_GOLD} !important;
            color: white !important;
            /* width: calc(100vw / 3.5) !important;
            height: calc(100vw / 3.5); */
            width: 100%;
            height: 60px;
            border: 2px solid white !important;
            @media (min-width: 576px) {
                /* width: 175px !important;
                height: 175px; */
            }
        }
    }
`;
