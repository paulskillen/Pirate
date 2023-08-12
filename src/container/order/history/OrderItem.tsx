import { ORDER_TYPES } from "@/common/constant/order";
import Path from "@/common/constant/path";
import { AppStateContext } from "@/common/context/app/app-context";
import { IOrder, OrderType } from "@/common/interface/order";
import Icon from "@/components/icon/Icon";
import Image from "@/components/image/Image";
import ViewLabelStatus from "@/components/view/ViewLabelStatus";
import ProviderNameItem from "@/container/provider/shared/ProviderNameItem";
import PriceTag from "@/container/shared/items/PriceTag";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import ClassNames from "classnames";
import { Button, TimeUtils } from "d-react-components";
import { find, forEach, join, map, unionBy } from "lodash";
import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";

export interface IOrderItemProps {
    order: IOrder;
    [key: string]: any;
}

export const getCountriesFromProducts = (
    pros: Array<any>,
    allCountry?: Array<any>
) => {
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
        if (res?.length && allCountry?.length) {
            res = map(res, (item) => {
                return find(allCountry, (i) => i?.iso === item?.iso);
            });
        }
    }

    return res;
};

export const renderRow = (left: any, right?: any, rowClass?: string) => {
    return (
        <div className={`${rowClass} text-sm mt-2 `}>
            <div className="text-gold">{left}</div>
            {right && (
                <div className="ml-2 opacity-75 text-white font-semibold">
                    {right}
                </div>
            )}
        </div>
    );
};

export const OrderItem: React.FC<IOrderItemProps> = ({ order, onClick }) => {
    const { metaData } = useContext(AppStateContext);
    const { countryList } = metaData || {};
    const router = useRouter();
    const {
        provider,
        subTotal,
        total,
        orderNo,
        createdAt,
        products,
        orderType,
        eSimData,
    } = order || {};
    const { eSimId } = eSimData || {};
    const rowClass = ClassNames("flex flex-row items-center text-lg");
    const orderCountries = useMemo(
        () => getCountriesFromProducts(products || [], countryList),
        [products, countryList]
    );

    const countryView = (
        <div className="text mt-2 opacity-75">
            {map(orderCountries, (item, index) => {
                return (
                    <div
                        key={`${item?.iso}_${index}`}
                        className={`flex flex-row items-center text-gray-300 mt-3 ${ClassNames(
                            {}
                        )}`}
                    >
                        <Image
                            className="w-6 rounded border"
                            alt="flag"
                            src={`data:image/png;base64, ${item?.flag}`}
                        />
                        <div className="text-sm font-semibold ml-2 max-w-xs ">
                            {item?.name}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <OrderItemStyled
            className="flex flex-row mt-4 text-white border border-gold bg-black rounded-2xl p-3 px-4 text-xl z-10 relative w-full"
            // onClick={() => router.push(Path.orderDetail(order).as || "")}
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
                        {orderType === OrderType.BUY_NEW &&
                            eSimId &&
                            renderRow(Messages.yourEsimCode, eSimId, rowClass)}
                        {renderRow(
                            Messages.purchasedAt,
                            TimeUtils.convertMiliToDateTime(createdAt),
                            rowClass
                        )}
                    </div>
                    <div className="flex text">
                        <Icon icon="cart" color="" className="text-gold mr-2" />
                        <PriceTag price={subTotal} className="font-semibold" />
                    </div>
                </div>
                {countryView}
                <div className="w-full flex mt-3 gap-3 justify-end">
                    <Button
                        size="x-small"
                        className="border border-gold rounded-full text-gold-light"
                        variant="trans"
                        onClick={() =>
                            router.push(Path.orderDetail(order).as || "")
                        }
                    >
                        {Messages.seeDetail}
                    </Button>
                </div>
                {/* <div className="w-full flex justify-end text mt-3">
                    <div className="">{`${Messages.subTotal} \b \b`}</div>
                    <PriceTag price={subTotal} className="font-semibold" />
                </div> */}
            </div>
        </OrderItemStyled>
    );
};

const OrderItemStyled = styled.div`
    border-color: var(--color-gold) !important;
`;
