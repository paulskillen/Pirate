import { COLOR_GOLD } from "@/common/constant/app-style";
import Path from "@/common/constant/path";
import { AppStateContext } from "@/common/context/app/app-context";
import Icon from "@/components/icon/Icon";
import AppLink from "@/components/link/AppLink";
import Select from "@/components/select/Select";
import { CountryItem } from "@/container/list-country/ListCountryPage";
import Messages from "@/languages/Messages";
import React, { useContext, useMemo } from "react";

export interface ISelectCountryProps {
    [key: string]: any;
}

const placeholder = [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
];

const SelectCountry: React.FC<ISelectCountryProps> = ({ id }) => {
    const { metaData, openSelectCountry } = useContext(AppStateContext);
    const { countryList = [] } = metaData || {};
    const isLoading = useMemo(() => {
        return countryList?.length === 0;
    }, [countryList]);
    const renderCountryItem = (country: any) => {
        return (
            <CountryItem
                key={`${country}_${country?.id}_${isLoading}`}
                country={country}
                hoverColor={false}
                loading={isLoading}
            />
        );
    };

    return (
        <Select
            open={openSelectCountry}
            filterOption={(input: any, option: any) => {
                const { children, value } = option.props;
                const country = children?.props?.country ?? {};
                return (
                    (country &&
                        country?.name
                            ?.toLowerCase?.()
                            ?.indexOf?.(input?.toLowerCase()) >= 0) ||
                    (country &&
                        country?.iso
                            ?.toLowerCase?.()
                            ?.indexOf?.(input?.toLowerCase()) >= 0) ||
                    (value &&
                        `${value}`
                            ?.toLowerCase?.()
                            ?.indexOf?.(input?.toLowerCase()) >= 0)
                );
            }}
            optionLabelProp="name"
            allowClear={false}
            classNameSelect="select-country"
            suffixIcon={<Icon icon="search" color={COLOR_GOLD} />}
            getLabel={renderCountryItem}
            placeholder={Messages.selectDestination}
            className="mt-3"
            dataSource={isLoading ? placeholder : countryList}
            showSearch
            renderFooterDropdown={() => {
                if (isLoading) {
                    return (
                        <div
                            role="status"
                            className="animate-pulse flex items-center justify-end w-full  pr-3"
                        >
                            <div className="w-1/12">
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            </div>
                        </div>
                    );
                }
                return (
                    <AppLink href={Path.listCountry().href}>
                        <div
                            className="text-gold text-end px-3 mb-1 bg-transparent underline "
                            style={{ zIndex: 0 }}
                        >
                            {Messages.seeAllCountries}
                        </div>
                    </AppLink>
                );
            }}
        />
    );
};

export default SelectCountry;
