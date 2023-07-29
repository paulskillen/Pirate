import { ORDER_TYPES } from "@/common/constant/order";
import Path from "@/common/constant/path";
import { IOrder } from "@/common/interface/order";
import Icon from "@/components/icon/Icon";
import ViewLabelStatus from "@/components/view/ViewLabelStatus";
import ProviderNameItem from "@/container/provider/shared/ProviderNameItem";
import PriceTag from "@/container/shared/items/PriceTag";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import ClassNames from "classnames";
import { TimeUtils } from "d-react-components";
import { find, forEach, join, map, unionBy } from "lodash";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

export interface IOrderItemProps {
    order: IOrder;
    [key: string]: any;
}

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
    const {
        provider,
        subTotal,
        total,
        orderNo,
        createdAt,
        products,
        orderType,
    } = order || {};
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
    const foundOrderType = useMemo(() => {
        return find(ORDER_TYPES, (i) => i?.id === orderType);
    }, [orderType]);

    return (
        <OrderItemStyled
            className="flex flex-row mt-4 text-white border bg-black rounded-2xl p-3 px-4 text-xl z-10 relative w-full"
            onClick={() => router.push(Path.orderDetail(order).as || "")}
        >
            <div className="w-full">
                <div className="flex flex-row">
                    <div className="flex flex-col w-full">
                        <div className={rowClass}>
                            <div className="h5 text-gold">{orderNo}</div>
                            <ViewLabelStatus
                                className="ml-3"
                                value={orderType}
                                dataSource={ORDER_TYPES}
                            />
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

const OrderItemStyled = styled.div`
    border-color: var(--color-gold) !important;
`;
