import {
    CURRENCY_LIST,
    CurrencyType,
    DEFAULT_CURRENCY,
} from "@/common/constant/currency";
import { AppStateContext } from "@/common/context/app/app.context";
import { useUpdateCurrency } from "@/common/context/app/hooks.context";
import Image from "@/components/image/Image";
import Select from "@/components/select/Select";
import React, { useContext, useMemo } from "react";

export interface ISelectCurrencyProps {
    [key: string]: any;
}

const SelectCurrency: React.FC<ISelectCurrencyProps> = ({ id }) => {
    const { updateCurrency } = useUpdateCurrency();
    const { metaData, userData } = useContext(AppStateContext);
    const { countryList } = metaData || {};
    const { currency } = userData || {};
    const currencySources = CURRENCY_LIST.map((currency) => {
        if (currency === CurrencyType.EUR) {
            return {
                id: currency,
                flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1599px-Flag_of_Europe.svg.png",
            };
        }
        const foundCountry = countryList?.find((item) => {
            if (currency === CurrencyType.USD) {
                return item?.iso === "US";
            }
            return item?.currency?.code === currency;
        });
        return {
            id: currency,
            flag: foundCountry?.flag,
        };
    });

    const value = useMemo(() => {
        if (!currency) {
            return DEFAULT_CURRENCY;
        }
        return currency;
    }, [currency]);

    return (
        <Select
            dataSource={currencySources}
            value={value}
            onChange={(value) => {
                updateCurrency(value);
            }}
            allowClear={false}
            getLabel={(item) => {
                return (
                    <div className="flex-center-y">
                        <Image
                            className="w-8 rounded border"
                            alt="flag"
                            src={
                                item?.id === CurrencyType.EUR
                                    ? item?.flag
                                    : `data:image/png;base64, ${item?.flag}`
                            }
                        />
                        <div className="text-base font-semibold ml-3 max-w-xs ">
                            {item?.id}
                        </div>
                    </div>
                );
            }}
        />
    );
};

export default SelectCurrency;
