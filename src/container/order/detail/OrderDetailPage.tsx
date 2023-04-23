import OrderApi from "@/apis/order/OrderApi";
import LayoutHeader from "@/container/shared/layout/LayoutHeader";
import { Buffer } from "buffer";
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

    useEffect(() => {
        if (orderId) {
            loadOrderDetail();
        }
    }, [orderId]);

    const loadOrderDetail = async () => {
        const res = await OrderApi.detail(orderId);
        setOrderDetail(res?.data?.data?.data ?? []);
    };
    if (isEmpty(orderDetail)) {
        return (
            <div className="flex flex-col items-center justify-center  w-screen h-screen relative text-white" />
        );
    }

    const { provider, subTotal, total, orderNo, eSimData } = orderDetail || {};
    const { qrCode } = eSimData || {};

    console.log(
        "🚀 >>>>>> file: OrderDetailPage.tsx:41 >>>>>> eSimData:",
        qrCode
    );

    if (!qrCode) {
        return <div />;
    }

    const blob = new Blob([qrCode], { type: "image/png" });

    console.log("🚀 >>>>>> file: OrderDetailPage.tsx:47 >>>>>> blob:", blob);
    const url = URL.createObjectURL(blob);
    const base64Data = Buffer.from(qrCode).toString("base64");

    console.log(
        "🚀 >>>>>> file: OrderDetailPage.tsx:52 >>>>>> base64Data:",
        base64Data
    );

    return (
        <div className="flex flex-col items-center justify-start w-screen h-screen relative text-white overflow-y-scrollpb-40">
            <LayoutHeader title={orderNo} />
            <div>
                {/* <img src={url} /> */}
                {/* <img
                    src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAAB/klEQVR42uyYu5EzIRCEewsDkxAIhcy0u5kRCiFgYlD0XzNwpcd/1lmarR2Hq9MnY0TT88Add9zxt9hJskUi8EDIpBzyP14LALA1wFU5Elm2HvL6wA7gyLNFOsmsJtfw0GyLRSAjFCDQNezdKoCEwOFrYgNwRUA1GbNjga+p+yK3+Z9ovx2Y/pB7KA8vmoxn/81AvhuYEelqHOsr/RdL/3agh7yTIrKNFJsYjtyekrsGsLuahv4O8qQIX3ZWsMEWoLosqU9/AKKm2eJhCUCHpCl9gZhd95/tgQ1AKmrT41CvnmleDiA5oO2P2uDs5cbTzE0A+7Lujniyok9NvhZWCwC6JpXWZbkW2YEh0jQEiMuRzK5KK0onfTUAX3ApADr9xCz+J01ci6cWqJf+wQJANQWqmTMvTQ5vDJDBzRfIWyLlzweQ3kqSBWC6QZL8PDN1COLwT3+4BtADD1+StqxBbvNAyK9ubwGY44NwZZP+AfFwzNvnfPHlAESI0Ll7b0jLH17HBwvA7io2FnANQZ7nTHy/FPAz6/WgBtIBKUmvorUAPJeHuurpyspgB1PA2oGITWAtD0WoxoCffdTsFERr5NuS5EKA7qvPJreJh6tSeQ0C+rrWKHdMx9hNAVOTmp9Xe3voVgS2gFVYZ0kCZxM3/IeBWAfuuOOO9/gXAAD///9azbEtwqSAAAAAAElFTkSuQmCC`}
                /> */}
                {/* <img
                    src={`data:image/png;base64,77+9UE5HDQoaCgAAAA1JSERSAAABAAAAAQABAwAAAGbvv706JQAAAAZQTFRF77+977+977+9AAAAVe+/ve+/vX4AAAHvv71JREFUeO+/ve+/vTHvv73vv70gDETvv71FQO+/vRE4Cjcz77+9N++/vSgc77+977+977+9cm9JeO+/ve+/ve+/vRNtZO+/ve+/vWRm77+977+9CERLDe+/vXjvv73vv73vv71M77+9PRZHbghl77+9Wu+/vTU+CwDvv71077+9AyDvv71Q77+9P++/vQDvv73vv73vv71IJHcE77+977+9SWBmC3Y5LO+/vUDvv71j77+9bwnvv70+E++/vQ3vv70cQO+/vXDfiu+/ve+/ve+/ve+/vQ8j77+91bfvv71677+9GV8F77+977+977+9Jxzvv717WdWM77+9xL0BTe+/ve+/ve+/vSp2HSvvv73vv73vv70eA++/vRXvv70IVWpy77+977+9Au+/vRgCHEt…jvv73vv73umpTvv71mCu+/vT9nIQY577+9ZV4yUwBcS3Pvv70RDyfvv71o77+9K++/vVFAdiLvv706eO+/vTltL2zvv71O77+9Nu+/vWnvv70G77+977+9Oe+/vULvv700K0wBCGXvv706Wy9dPFwU77+9ExdhCu+/vV4077+977+9ZHFd77+977+9ft2HJwAz77+977+977+977+9GTJD77+9wp9X77+9Au+/ve+/ve+/ve+/vTJ8XUYo77+9fTAB77+9N++/ve+/ve+/vS4T77+977+977+977+977+9agc436NyR++/vVHvv70w77+9TwQ+77+9E0UM77+9X++/vTQB77+9cu+/ve+/vRcaA++/ve+/vdSB77+977+9LO+/vWLvv73vv73vv73vv73NgeOtgC1SH++/vWseSBcT77+9DO+/ve+/vTfvv73vv70dfwIAAO+/ve+/vRlKOhZ8JBI+AAAAAElFTkTvv71CYO+/vQ==`}
                /> */}
                <img src={`data:image/png;base64,${qrCode}`}/>
                <img src={`data:image/png;base64,${base64Data}`} />
                <a href={url}>Download</a>
                <div style={{ height: "500px" }} />
            </div>
        </div>
    );
};

export default OrderDetailPage;
