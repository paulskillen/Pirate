import EsimApi from "@/apis/esim/EsimApi";
import axios from "axios";
import OrderApi from "@/apis/order/OrderApi";
import LayoutHeader from "@/container/shared/layout/LayoutHeader";
import { Buffer } from "buffer";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { ESIM_GO_GET_ESIM_QR_CODE_IMG } from "@/common/constant/app";
import { Button } from "d-react-components";
import Messages from "@/languages/Messages";

export interface IOrderDetailPageProps {
    [key: string]: any;
}

export interface IOrderItemProps {
    [key: string]: any;
}

const OrderDetailPage: React.FC<IOrderDetailPageProps> = ({ orderId }) => {
    const [orderDetail, setOrderDetail] = useState<any>();
    const [esimQrCode, setEsimQrCode] = useState();
    const [base64Converted, setBase64Converted] = useState<any>();
    const { provider, subTotal, total, orderNo, eSimData } = orderDetail || {};
    const { qrCode, eSimId } = eSimData || {};

    useEffect(() => {
        if (orderId) {
            loadOrderDetail();
        }
    }, [orderId]);

    useEffect(() => {
        // if (eSimId) {
        //     loadQrCode();
        // }
    }, [eSimId]);

    const loadQrCode = async () => {
        const res = await axios.get(ESIM_GO_GET_ESIM_QR_CODE_IMG(eSimId), {
            headers: {
                "X-API-Key": "Q6vYZShNTl8icvrRIuYuUeYHDHEL1uh55Jv2BHeA",
            },
        });

        const qrCodeData = res?.data;

        // console.log(
        //     "🚀 >>>>>> file: OrderDetailPage.tsx:45 >>>>>> res >>>>>> res:",
        //     res
        // );
        // const blob = new Blob([res.data], { type: "application/zip" });
        // const link = document.createElement("a");
        // link.style.display = "none";
        // link.download = "qrCode";
        // link.href = window.URL.createObjectURL(blob as any);
        // link.click();
        // const res = await EsimApi.getQrCode(eSimId);
        // const qrCode = res?.data?.data?.data ?? "";
        setEsimQrCode(qrCodeData);
        console.log(
            "🚀 >>>>>> file: OrderDetailPage.tsx:73 >>>>>> loadQrCode >>>>>> qrCode:",
            qrCodeData
        );

        if (!process.browser) {
            return;
        }
        const base64DataBtoa = btoa(unescape(encodeURIComponent(qrCodeData)));

        console.log(
            "🚀 >>>>>> file: OrderDetailPage.tsx:66 >>>>>> loadQrCode >>>>>> base64DataBtoa:",
            base64DataBtoa
        );
        setBase64Converted(base64DataBtoa);
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
    // if (!esimQrCode) {
    //     return (
    //         <div className="flex flex-col items-center justify-center  w-screen h-screen relative text-white" />
    //     );
    // }

    const binaryData = "";

    // const blob = new Blob([esimQrCode], { type: "image/png" });
    // const url = URL.createObjectURL(blob);

    // const base64Data = Buffer.from(esimQrCode).toString("base64");

    return (
        <div className="flex flex-col items-center justify-start w-screen h-screen relative text-white overflow-y-scrollpb-40">
            <LayoutHeader title={orderNo} />
            <div>
                {/* <img
                    src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAAB/klEQVR42uyYu5EzIRCEewsDkxAIhcy0u5kRCiFgYlD0XzNwpcd/1lmarR2Hq9MnY0TT88Add9zxt9hJskUi8EDIpBzyP14LALA1wFU5Elm2HvL6wA7gyLNFOsmsJtfw0GyLRSAjFCDQNezdKoCEwOFrYgNwRUA1GbNjga+p+yK3+Z9ovx2Y/pB7KA8vmoxn/81AvhuYEelqHOsr/RdL/3agh7yTIrKNFJsYjtyekrsGsLuahv4O8qQIX3ZWsMEWoLosqU9/AKKm2eJhCUCHpCl9gZhd95/tgQ1AKmrT41CvnmleDiA5oO2P2uDs5cbTzE0A+7Lujniyok9NvhZWCwC6JpXWZbkW2YEh0jQEiMuRzK5KK0onfTUAX3ApADr9xCz+J01ci6cWqJf+wQJANQWqmTMvTQ5vDJDBzRfIWyLlzweQ3kqSBWC6QZL8PDN1COLwT3+4BtADD1+StqxBbvNAyK9ubwGY44NwZZP+AfFwzNvnfPHlAESI0Ll7b0jLH17HBwvA7io2FnANQZ7nTHy/FPAz6/WgBtIBKUmvorUAPJeHuurpyspgB1PA2oGITWAtD0WoxoCffdTsFERr5NuS5EKA7qvPJreJh6tSeQ0C+rrWKHdMx9hNAVOTmp9Xe3voVgS2gFVYZ0kCZxM3/IeBWAfuuOOO9/gXAAD///9azbEtwqSAAAAAAElFTkSuQmCC`}
                /> */}
                <img src={`data:image/png;base64,${qrCode}`} />
                <img src={`data:image/png;base64,${base64Converted}`} />

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
