import OrderApi from "@/apis/order/OrderApi";
import ClassNames from "classnames";
import { ESIM_GO_GET_ESIM_QR_CODE_IMG } from "@/common/constant/app";
import LayoutHeader from "@/container/shared/layout/LayoutHeader";
import Messages from "@/languages/Messages";
import axios from "axios";
import { Button } from "d-react-components";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import ProviderNameItem from "@/container/provider/shared/ProviderNameItem";
import PriceTag from "@/container/shared/items/PriceTag";

export interface IOrderDetailPageProps {
    [key: string]: any;
}

export interface IOrderItemProps {
    [key: string]: any;
}

const OrderDetailPage: React.FC<IOrderDetailPageProps> = ({ orderId }) => {
    const [orderDetail, setOrderDetail] = useState<any>();
    const [esimQrCode, setEsimQrCode] = useState<any>();
    const [base64Converted, setBase64Converted] = useState<any>();
    const { provider, subTotal, total, orderNo, eSimData } = orderDetail || {};
    const [showQrCode, setShowQrCode] = useState(false);
    const { qrCode, eSimId } = eSimData || {};
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
            loadQrCode();
        }
    }, [eSimId]);

    const loadQrCode = async () => {
        const res = await axios.get(ESIM_GO_GET_ESIM_QR_CODE_IMG(eSimId), {
            headers: {
                "X-API-Key": "Q6vYZShNTl8icvrRIuYuUeYHDHEL1uh55Jv2BHeA",
            },
            responseType: "arraybuffer",
        });

        const arrayBufferData = res?.data;

        if (!process.browser) {
            return;
        }

        const u8 = new Uint8Array(arrayBufferData);
        const b64encoded = btoa(String.fromCharCode.apply(null, u8 as any));
        setEsimQrCode(b64encoded);
        setBase64Converted(b64encoded);
    };

    const loadOrderDetail = async () => {
        const res = await OrderApi.detail(orderId);
        setOrderDetail(res?.data?.data?.data ?? []);
    };
    if (isEmpty(orderDetail)) {
        return (
            <div className="flex flex-col items-center justify-center  w-screen h-screen relative text-white" />
        );
    }
    if (!esimQrCode) {
        return (
            <div className="flex flex-col items-center justify-center  w-screen h-screen relative text-white" />
        );
    }

    return (
        <div className="flex flex-col items-center justify-start w-screen h-screen relative text-white overflow-y-scrollpb-40">
            <LayoutHeader title={`# ${orderNo}`} />
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

                {showQrCode && (
                    <div className="flex justify-center mt-5">
                        <img src={`data:image/png;base64,${esimQrCode}`} />
                    </div>
                )}

                <div style={{ height: "500px" }} />
            </div>
        </div>
    );
};

export default OrderDetailPage;
