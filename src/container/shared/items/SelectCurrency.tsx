import {
    CURRENCY_LIST,
    CurrencyType,
    DEFAULT_CURRENCY,
} from "@/common/constant/currency";
import { AppStateContext } from "@/common/context/app/app.context";
import { useUpdateCurrency } from "@/common/context/app/hooks.context";
import Image from "@/components/image/Image";
import Select from "@/components/select/Select";
import styled from "@emotion/styled";
import { find } from "lodash";
import React, { useContext, useMemo } from "react";

export interface ISelectCurrencyProps {
    className?: string;
}

const SelectCurrency: React.FC<ISelectCurrencyProps> = ({ className }) => {
    const { updateCurrency } = useUpdateCurrency();
    const { metaData, userData } = useContext(AppStateContext);
    const { countryList } = metaData || {};
    const { currency } = userData || {};

    const currencySources = CURRENCY_LIST.map((currency) => {
        if (currency === CurrencyType.EUR) {
            return {
                id: currency,
                flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1599px-Flag_of_Europe.svg.png",
                currency: {
                    code: CurrencyType.EUR,
                    name: "Euro",
                    symbol: "€",
                },
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
            currency: foundCountry?.currency,
        };
    });

    const value = useMemo(() => {
        if (!currency?.code) {
            return DEFAULT_CURRENCY;
        }
        return currency?.code;
    }, [currency]);

    return (
        <SelectCurrencyStyled className={`${className}`}>
            <Select
                dataSource={currencySources}
                value={value}
                onChange={(id) => {
                    const value = find(
                        currencySources,
                        (i) => i?.id === id
                    )?.currency;
                    updateCurrency(value as any);
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
        </SelectCurrencyStyled>
    );
};

export default SelectCurrency;

const SelectCurrencyStyled = styled.div`
    .d-select__select .ant-select-selector {
        min-height: 30px !important;
        height: 35px !important;
        .ant-select-item-option-selected {
        }
    }
    .d-select__container
        .ant-select-single
        .ant-select-selector
        .ant-select-selection-item,
    .d-select__container
        .ant-select-single
        .ant-select-selector
        .ant-select-selection-placeholder {
        height: 35px !important;
    }

    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
        background-color: rgba(192, 157, 94, 1) !important;
    }
`;
