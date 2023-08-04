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
import { isEmpty } from "lodash";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export interface IOrderDetailPageProps {
    [key: string]: any;
}

export interface IOrderItemProps {
    [key: string]: any;
}

const OrderDetailPage: React.FC<IOrderDetailPageProps> = ({ orderId }) => {
    const [orderDetail, setOrderDetail] = useState<any>();
    const { provider, subTotal, total, orderNo, eSimData } = orderDetail || {};
    const [showQrCode, setShowQrCode] = useState(false);
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
            // loadQrCode();
        }
    }, [eSimId]);

    // const loadQrCode = async () => {
    //     const res = await axios.get(ESIM_GO_GET_ESIM_QR_CODE_IMG(eSimId), {
    //         headers: {
    //             "X-API-Key": "Q6vYZShNTl8icvrRIuYuUeYHDHEL1uh55Jv2BHeA",
    //         },
    //         responseType: "arraybuffer",
    //     });

    //     const arrayBufferData = res?.data;

    //     if (!process.browser) {
    //         return;
    //     }

    //     const u8 = new Uint8Array(arrayBufferData);
    //     const b64encoded = btoa(String.fromCharCode.apply(null, u8 as any));
    //     setEsimQrCode(b64encoded);
    //     setBase64Converted(b64encoded);
    // };

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
                <div className="flex justify-center">
                    <Button
                        className="mt-5"
                        onClick={() => {
                            setShowQrCode(!showQrCode);
                        }}
                        iconName={"qr_code_2"}
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
                    <div className="flex justify-center mt-5">
                        <Image
                            alt="qrCode"
                            width={250}
                            height={250}
                            src={`data:image/png;base64,${qrCode}`}
                        />
                    </div>
                )}

                <div style={{ height: "500px" }} />
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-start w-screen h-screen relative text-white overflow-y-scroll pb-40">
            <PageHeader title={`# ${orderNo}`} />
            {renderContent()}
        </div>
    );
};

export default OrderDetailPage;
