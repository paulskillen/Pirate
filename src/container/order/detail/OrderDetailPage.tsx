import OrderApi from "@/apis/order/OrderApi";
import { ESIM_GO_GET_ESIM_QR_CODE_IMG } from "@/common/constant/app";
import LayoutHeader from "@/container/shared/layout/LayoutHeader";
import Messages from "@/languages/Messages";
import axios from "axios";
import { Button } from "d-react-components";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";

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
    const { qrCode, eSimId } = eSimData || {};

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
            <LayoutHeader title={orderNo} />
            <div className="z-30">
                {/* <img
                    src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAAB/klEQVR42uyYu5EzIRCEewsDkxAIhcy0u5kRCiFgYlD0XzNwpcd/1lmarR2Hq9MnY0TT88Add9zxt9hJskUi8EDIpBzyP14LALA1wFU5Elm2HvL6wA7gyLNFOsmsJtfw0GyLRSAjFCDQNezdKoCEwOFrYgNwRUA1GbNjga+p+yK3+Z9ovx2Y/pB7KA8vmoxn/81AvhuYEelqHOsr/RdL/3agh7yTIrKNFJsYjtyekrsGsLuahv4O8qQIX3ZWsMEWoLosqU9/AKKm2eJhCUCHpCl9gZhd95/tgQ1AKmrT41CvnmleDiA5oO2P2uDs5cbTzE0A+7Lujniyok9NvhZWCwC6JpXWZbkW2YEh0jQEiMuRzK5KK0onfTUAX3ApADr9xCz+J01ci6cWqJf+wQJANQWqmTMvTQ5vDJDBzRfIWyLlzweQ3kqSBWC6QZL8PDN1COLwT3+4BtADD1+StqxBbvNAyK9ubwGY44NwZZP+AfFwzNvnfPHlAESI0Ll7b0jLH17HBwvA7io2FnANQZ7nTHy/FPAz6/WgBtIBKUmvorUAPJeHuurpyspgB1PA2oGITWAtD0WoxoCffdTsFERr5NuS5EKA7qvPJreJh6tSeQ0C+rrWKHdMx9hNAVOTmp9Xe3voVgS2gFVYZ0kCZxM3/IeBWAfuuOOO9/gXAAD///9azbEtwqSAAAAAAElFTkSuQmCC`}
                /> */}
                <img src={`data:image/png;base64,${esimQrCode}`} />
                {/* <img src={`data:image/png;base64,${base64Converted}`} /> */}

                <Button
                    onClick={() => {
                        loadQrCode();
                    }}
                >
                    {Messages.qrCode}
                </Button>
                <div style={{ height: "500px" }} />
            </div>
        </div>
    );
};

export default OrderDetailPage;
