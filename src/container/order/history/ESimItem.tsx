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
import { getCountriesFromProducts, renderRow } from "./OrderItem";

export interface IESimItemProps {
    eSimItem: IOrder;
}

const ESimItem: React.FC<IESimItemProps> = ({ eSimItem }) => {
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
    } = eSimItem || {};
    const { eSimId } = eSimData || {};
    const rowClass = ClassNames("flex flex-row items-center");
    const orderCountries = useMemo(
        () => getCountriesFromProducts(products || [], countryList),
        [products, countryList]
    );

    console.log(
        "🚀 >>>>>> file: ESimItem.tsx:44 >>>>>> orderCountries:",
        orderCountries
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
        <ESimItemStyled className=" mt-4 text-white border bg-black rounded-2xl p-3 px-4 text-xl z-10 relative w-full">
            <div
                className="w-full"
                onClick={() => router.push(Path.orderDetail(eSimItem).as || "")}
            >
                <div className="flex flex-row">
                    <div className="flex flex-col w-full">
                        <div className={rowClass}>
                            <div className="h5 text-gold">Iccid :</div>
                            <div className="h5 text-white ml-1 opacity-75">
                                {eSimId}
                            </div>
                            {/* <ViewLabelStatus
                                className="ml-3"
                                value={orderType}
                                dataSource={ORDER_TYPES}
                            /> */}
                        </div>
                        {renderRow(
                            Messages.purchasedAt,
                            TimeUtils.convertMiliToDateTime(createdAt),
                            rowClass
                        )}
                    </div>
                    <Icon
                        icon="sim"
                        color=""
                        className="text-gold -rotate-90"
                    />
                </div>
                {countryView}
            </div>
            <div className="w-full flex">
                <div
                    className="flex-1"
                    onClick={() =>
                        router.push(Path.orderDetail(eSimItem).as || "")
                    }
                />
                <Button
                    iconName="add_circle"
                    size="x-small"
                    className="border rounded-full"
                    variant="trans"
                    onClick={() => {
                        router.push({
                            pathname: Path.bundleByCountry(
                                orderCountries?.[0]?.iso ?? ""
                            ).as as any,
                            query: { topup: eSimId },
                        });
                    }}
                >
                    {Messages.topUp}
                </Button>
            </div>
        </ESimItemStyled>
    );
};

export default ESimItem;

const ESimItemStyled = styled.div`
    border-color: var(--color-gold) !important;
`;
