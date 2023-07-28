import OrderApi from "@/apis/order/OrderApi";
import Path from "@/common/constant/path";
import { IOrder } from "@/common/interface/order";
import Icon from "@/components/icon/Icon";
import AppLink from "@/components/link/AppLink";
import TabSwitch, {
    ITabSwitchItem,
    TabSwitchType,
} from "@/components/tab/TabSwitch";
import ProviderNameItem from "@/container/provider/shared/ProviderNameItem";
import MobileHeader from "@/container/shared/header/MobileHeader";
import PageHeader from "@/container/shared/header/PageHeader";
import PriceTag from "@/container/shared/items/PriceTag";
import Messages from "@/languages/Messages";
import { useAuthProfile } from "@/store/auth/authHook";
import { useOrderHistory } from "@/store/order-history/orderHistoryHook";
import styled from "@emotion/styled";
import ClassNames from "classnames";
import { Progress, TimeUtils } from "d-react-components";
import { forEach, join, map, unionBy } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export interface IOrderHistoryPageProps {
    [key: string]: any;
}

export interface IOrderItemProps {
    order: IOrder;
    [key: string]: any;
}

const OrderHistoryPage: React.FC<IOrderHistoryPageProps> = () => {
    const router = useRouter();
    const tabs = [
        {
            id: "esim",
            label: Messages.yourEsim,
        },
        {
            id: "order",
            label: Messages.yourOrder,
        },
    ];

    const orderLocals = useOrderHistory();
    const { id: customerId, email } = useAuthProfile() || {};
    const [orderList, setOrderList] = useState<Array<any>>([]);
    const [activeTab, setActiveTab] = useState<ITabSwitchItem>(tabs?.[0]);
    const isGuest = !customerId;

    useEffect(() => {
        loadOrderHistory();
    }, []);

    const loadOrderHistory = async () => {
        if (isGuest) {
            setOrderList(orderLocals || []);
        } else {
            Progress.show(
                { method: OrderApi.history, params: [] },
                (res: any) => {
                    const allOrders = [
                        ...(res?.data?.data?.data ?? []),
                        ...(orderLocals || []),
                    ];
                    setOrderList(allOrders);
                }
            );
        }
    };

    const renderTab = () => {
        return (
            <TabSwitch
                dataSource={tabs as any}
                value={activeTab}
                onChange={(v) => setActiveTab(v)}
            />
        );
    };

    const renderOrderContent = () => {
        if (!(orderList?.length > 0)) {
            return (
                <div className="text-gold empty-content">
                    {Messages.listOrderEmpty}
                </div>
            );
        }
        return (
            <div className="overflow-y-scroll px-4 w-full pb-40">
                {map(orderList, (orderItem) => {
                    return <OrderItem order={orderItem} />;
                })}
            </div>
        );
    };

    const renderEsimContent = () => {
        return <div />;
    };

    return (
        <OrderHistoryStyled className="container px-0 flex flex-col items-center justify-start w-screen h-screen relative text-white z-10">
            <MobileHeader />
            <div className="w-full px-3 mt-3 md:w-3/4">
                {renderTab()}
                <div className="flex flex-col items-center w-full h-screen overflow-y-scroll  relative">
                    {activeTab?.id === "order" && renderOrderContent()}
                    {activeTab?.id === "esim" && renderEsimContent()}
                </div>
            </div>
        </OrderHistoryStyled>
    );
};

export default OrderHistoryPage;

const getCountriesFromProducts = (pros: Array<any>) => {
    const countries: Array<any> = [];
    forEach(pros, (itemPro) => {
        const countryItems = itemPro?.product?.bundleData?.countries;
        if (countryItems && countryItems?.length > 0) {
            forEach(countryItems, (i) => {
                countries.push(i);
            });
        }
    });
    let res;
    if (countries?.length > 0) {
        res = unionBy(countries, (i) => i?.iso);
    }
    return res;
};

export const OrderItem: React.FC<IOrderItemProps> = ({ order, onClick }) => {
    const router = useRouter();
    const { provider, subTotal, total, orderNo, createdAt, products } =
        order || {};
    const rowClass = ClassNames("flex flex-row items-center text-xl mt-2");
    const orderCountries = getCountriesFromProducts(products || []);
    const countryView = (
        <div className="text mt-2 opacity-75">
            {join(
                map(orderCountries, (i) => i?.name),
                ","
            )}
        </div>
    );

    return (
        <OrderItemStyled
            className="flex flex-row mt-4 text-white border bg-black rounded-2xl p-3 px-4 text-xl z-10 relative w-full"
            onClick={() => router.push(Path.orderDetail(order).as || "")}
        >
            <div className="w-full">
                <div className="flex flex-row">
                    <div className="flex flex-col w-full">
                        <div className={rowClass}>
                            <div className="h5 text-gold">#{orderNo}</div>
                        </div>
                        <div className={`${rowClass} text opacity-75`}>
                            <div className="mr-2">{Messages.provider} : </div>
                            <ProviderNameItem providerId={provider} />
                        </div>
                        <div className={`${rowClass} text opacity-75`}>
                            <div className="">{Messages.purchasedAt} :</div>
                            <div className="ml-2">
                                {TimeUtils.convertMiliToDateTime(createdAt)}
                            </div>
                        </div>
                    </div>
                    <Icon icon="cart" color="" className="text-gold" />
                </div>
                {countryView}
                <div className="w-full flex justify-end text mt-3">
                    <div className="">{`${Messages.subTotal} \b \b`}</div>
                    <PriceTag price={subTotal} className="font-semibold" />
                </div>
            </div>
        </OrderItemStyled>
    );
};

const OrderHistoryStyled = styled.div`
    .empty-content {
        margin-top: calc(100vh * 0.4);
        opacity: 0.5;
        @media (max-width: 768px) {
            margin-top: calc(100vh * 0.35);
        }
    }
`;

const OrderItemStyled = styled.div`
    border-color: var(--color-gold) !important;
`;
