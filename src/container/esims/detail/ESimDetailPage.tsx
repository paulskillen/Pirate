import OrderApi from "@/apis/order/OrderApi";
import { useQrEncode, useQrDecode } from "react-qr-hooks";
import { ESIM_GO_GET_ESIM_QR_CODE_IMG } from "@/common/constant/app";
import ProviderNameItem from "@/container/provider/shared/ProviderNameItem";
import PageHeader from "@/container/shared/header/PageHeader";
import PriceTag from "@/container/shared/items/PriceTag";
import Messages from "@/languages/Messages";
import axios from "axios";
import ClassNames from "classnames";
import { Button, Progress } from "d-react-components";
import { isEmpty, map } from "lodash";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import EsimApi from "@/apis/esim/EsimApi";
import styled from "@emotion/styled";

export interface IESimDetailPageProps {
    [key: string]: any;
}

export interface IOrderItemProps {
    [key: string]: any;
}

const ESimDetailPage: React.FC<IESimDetailPageProps> = ({ orderId }) => {
    const [orderDetail, setOrderDetail] = useState<any>();
    const { provider, subTotal, total, orderNo, eSimData } = orderDetail || {};
    const [showQrCode, setShowQrCode] = useState(false);
    const [showBundles, setShowBundles] = useState(false);
    const [bundlesList, setBundlesList] = useState<Array<any>>([]);
    const { qrCode, eSimId } = eSimData || {};
    const decoded = useQrDecode(`data:image/png;base64,${qrCode}`);
    const rowClass = ClassNames(
        "flex flex-row items-center justify-between text-xl mt-3"
    );

    useEffect(() => {
        if (orderId) {
            loadOrderDetail();
        }
    }, [orderId]);

    useEffect(() => {
        if (eSimId) {
            loadESimBundles();
        }
    }, [eSimId]);

    const loadESimBundles = async () => {
        const res = await EsimApi.getBundlesApplied(eSimId);
        const bundles = res?.data?.data?.data?.bundles ?? [];
        setBundlesList(bundles);
    };

    const loadOrderDetail = async () => {
        return Progress.show(
            { method: OrderApi.detail, params: [orderId] },
            (res: any) => {
                const orderData = res?.data?.data?.data;
                setOrderDetail(orderData);
            }
        );
    };

    const renderContent = () => {
        if (isEmpty(orderDetail)) {
            return (
                <div className="flex flex-col items-center justify-center  w-screen h-screen relative text-white" />
            );
        }

        const renderButton = () => {
            if (!qrCode) {
                return (
                    <div className="flex justify-center">
                        <Button
                            className="mt-5"
                            onClick={() => {
                                loadOrderDetail();
                            }}
                            iconName="refresh"
                        >
                            {Messages.loadQrCode}
                        </Button>
                    </div>
                );
            }
            return (
                <div className="flex justify-center w-ful">
                    <Button
                        className="mt-5 esim-detail-page__button-qr-code"
                        onClick={() => {
                            setShowQrCode(!showQrCode);
                        }}
                        iconName={"qr_code_2"}
                        variant="outline"
                    >
                        {showQrCode
                            ? Messages.hideEsimQrCode
                            : Messages.showEsimQrCode}
                    </Button>
                </div>
            );
        };

        return (
            <div className="z-30 w-100 px-4 max-w-2xl">
                <div className={`${rowClass} text`}>
                    <div className="text-gray-300">{Messages.provider} </div>
                    <ProviderNameItem
                        providerId={provider}
                        className="font-semibold text-gold"
                    />
                </div>
                <div className={`${rowClass} text`}>
                    <div>{`${Messages.subTotal}`}</div>
                    <PriceTag
                        price={subTotal}
                        className="font-semibold text-gold"
                    />
                </div>
                {renderButton()}
                {qrCode && showQrCode && (
                    <div className="flex justify-center mt-4">
                        <Image
                            alt="qrCode"
                            width={250}
                            height={250}
                            src={`data:image/png;base64,${qrCode}`}
                        />
                    </div>
                )}
            </div>
        );
    };

    const renderAppliedBundles = useMemo(() => {
        if (!bundlesList?.length) {
            return null;
        }

        const bundles = (
            <div className="w-full flex flex-col justify-center items-center">
                {map(bundlesList, (item) => {
                    const { name, description } = item || {};
                    return (
                        <div className="border border-gold mt-3 rounded-xl p-4 text-base bg-black w-full">
                            <div>{name}</div>
                            <div className="mt-3">{description}</div>
                        </div>
                    );
                })}
            </div>
        );

        return (
            <div className="mt-4 flex flex-col justify-center items-center w-full  max-w-2xl px-4">
                <Button
                    className="esim-detail-page__button-qr-code"
                    onClick={() => {
                        setShowBundles(!showBundles);
                    }}
                    iconName={showBundles ? "visibility_off" : "visibility"}
                    variant="outline"
                >
                    {showBundles
                        ? Messages.hideESimAppliedBundles
                        : Messages.showESimAppliedBundles}
                </Button>
                {showBundles && bundles}
            </div>
        );
    }, [bundlesList.length, showBundles]);

    return (
        <EsimDetailStyled className="relative text-white  ">
            <PageHeader title={`${eSimId}`} />
            <div className="z-20 relative h-screen w-full container px-3 flex flex-col items-center">
                {renderContent()}
                {renderAppliedBundles}
                <div className="h-60" />
            </div>
        </EsimDetailStyled>
    );
};

export default ESimDetailPage;

const EsimDetailStyled = styled.div`
    .esim-detail-page__button-qr-code {
        background-color: black !important;
        width: 100%;
    }
`;
