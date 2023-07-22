import { COLOR_GOLD } from "@/common/constant/app-style";
import Path from "@/common/constant/path";
import { AppStateContext } from "@/common/context/app/app-context";
import Icon from "@/components/icon/Icon";
import AppLink from "@/components/link/AppLink";
import Select from "@/components/select/Select";
import { CountryItem } from "@/container/list-country/ListCountryPage";
import Messages from "@/languages/Messages";
import React, { useContext } from "react";

export interface ISelectCountryProps {
    [key: string]: any;
}

const SelectCountry: React.FC<ISelectCountryProps> = ({ id }) => {
    const { metaData } = useContext(AppStateContext);
    const { countryList = [] } = metaData || {};

    const renderCountryItem = (country: any) => {
        return <CountryItem country={country} />;
    };

    return (
        <Select
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
            dataSource={countryList}
            showSearch
            renderFooterDropdown={() => {
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
