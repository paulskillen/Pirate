import {
    COLOR_DARKEN,
    COLOR_GOLD,
    COLOR_GOLD_TRANS,
    COLOR_INPUT_CONTENT,
} from "@/common/constant/app-style";
import ClassNames from "classnames";
import Path from "@/common/constant/path";
import { AppStateContext } from "@/common/context/app/app-context";
import Icon from "@/components/icon/Icon";
import InputSearch from "@/components/input/InputSearch";
import InputText from "@/components/input/InputText";
import AppLink from "@/components/link/AppLink";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { map } from "lodash";
import React, { useContext, useEffect, useMemo, useState } from "react";
import CountryItem from "@/container/list-country/CountryItem";

export interface ISelectCountryProps {
    className?: string;
    [key: string]: any;
}

const placeholder = [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
];

// const SelectCountry: React.FC<ISelectCountryProps> = ({ id }) => {
//     const { metaData, openSelectCountry } = useContext(AppStateContext);
//     const { countryList = [] } = metaData || {};
//     const isLoading = useMemo(() => {
//         return countryList?.length === 0;
//     }, [countryList]);
//     const renderCountryItem = (country: any) => {
//         return (
//             <CountryItem
//                 key={`${country}_${country?.id}_${isLoading}`}
//                 country={country}
//                 hoverColor={false}
//                 loading={isLoading}
//             />
//         );
//     };

//     return (
//         <Select
//             // open={openSelectCountry}
//             filterOption={(input: any, option: any) => {
//                 const { children, value } = option.props;
//                 const country = children?.props?.country ?? {};
//                 return (
//                     (country &&
//                         country?.name
//                             ?.toLowerCase?.()
//                             ?.indexOf?.(input?.toLowerCase()) >= 0) ||
//                     (country &&
//                         country?.iso
//                             ?.toLowerCase?.()
//                             ?.indexOf?.(input?.toLowerCase()) >= 0) ||
//                     (value &&
//                         `${value}`
//                             ?.toLowerCase?.()
//                             ?.indexOf?.(input?.toLowerCase()) >= 0)
//                 );
//             }}
//             optionLabelProp="name"
//             allowClear={false}
//             classNameSelect="select-country"
//             suffixIcon={<Icon icon="search" color={COLOR_GOLD} />}
//             getLabel={renderCountryItem}
//             placeholder={Messages.selectDestination}
//             className="mt-3"
//             dataSource={isLoading ? placeholder : countryList}
//             showSearch
//             renderFooterDropdown={() => {
//                 if (isLoading) {
//                     return (
//                         <div
//                             role="status"
//                             className="animate-pulse flex items-center justify-end w-full  pr-3"
//                         >
//                             <div className="w-1/12">
//                                 <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
//                             </div>
//                         </div>
//                     );
//                 }
//                 return (
//                     <AppLink href={Path.listCountry().href}>
//                         <div
//                             className="text-gold text-end px-3 mb-1 bg-transparent underline "
//                             style={{ zIndex: 0 }}
//                         >
//                             {Messages.seeAllCountries}
//                         </div>
//                     </AppLink>
//                 );
//             }}
//             onFocus={() => {
//                 console.log("GET IN FOCUS");
//             }}
//         />
//     );
// };

const filterCountry = (text: string, country: any) => {
    const { name, iso } = country;
    return (
        name?.toLocaleLowerCase?.().indexOf(text?.toLocaleLowerCase?.()) !==
            -1 ||
        iso?.toLocaleLowerCase?.().indexOf(text?.toLocaleLowerCase?.()) !== -1
    );
};

const SelectCountry: React.FC<ISelectCountryProps> = ({ className }) => {
    const { metaData, openSelectCountry, setOpenSelectCountry } =
        useContext(AppStateContext);
    const { countryList = [] } = metaData || {};
    const isLoading = useMemo(() => {
        return countryList?.length === 0;
    }, [countryList]);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [inputTextSearch, setInputTextSearch] = useState<string>("");
    const renderCountryItem = (country: any, index: number) => {
        return (
            <CountryItem
                key={`${country}_${country?.id}_${isLoading}_${index}`}
                country={country}
                loading={isLoading}
            />
        );
    };

    const renderDropdown = () => {
        const dataSource = isLoading ? placeholder : countryList;
        return (
            <div
                id="select-country__dropdown"
                className={ClassNames("select-country__dropdown", {
                    "select-country__dropdown-visible": openDropdown,
                })}
            >
                <div className="overflow-y-scroll" style={{ height: "300px" }}>
                    {map(dataSource, (item, index) => {
                        if (inputTextSearch) {
                            const isPass = filterCountry(inputTextSearch, item);
                            if (!isPass) {
                                return null;
                            }
                        }
                        return renderCountryItem(item, index as any);
                    })}
                </div>
                {renderFooterDropdown()}
            </div>
        );
    };

    const renderFooterDropdown = () => {
        if (isLoading) {
            return (
                <div
                    role="status"
                    className="animate-pulse flex items-center justify-end w-full  pr-3"
                >
                    <div className="w-1/12">
                        <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    </div>
                </div>
            );
        }
        return (
            <AppLink key="all" className="" href={Path.listCountry().href}>
                <div
                    className="text-gold text-end px-3 mb-1 bg-transparent underline"
                    style={{ zIndex: 0 }}
                >
                    {Messages.seeAllCountries}
                </div>
            </AppLink>
        );
    };

    useEffect(() => {
        if (openSelectCountry) {
            setOpenDropdown(true);
        } else {
            setOpenDropdown(false);
        }
    }, [openSelectCountry]);

    return (
        <SelectCountryStyled className={`${className}`}>
            <InputSearch
                id="select-country__input"
                onChange={(v) => {
                    setInputTextSearch(v);
                }}
                value={inputTextSearch}
                onFocus={() => {
                    setOpenSelectCountry(true);
                    setOpenDropdown(true);
                }}
                placeholder={Messages.selectDestination}
            />
            {openDropdown && renderDropdown()}
        </SelectCountryStyled>
    );
};

export default SelectCountry;

const SelectCountryStyled = styled.div`
    z-index: 10;
    position: relative;
    .select-country__dropdown {
        position: absolute;
        left: 0;
        right: 0;
        top: 54px;
        visibility: hidden;
        opacity: 0;

        background-color: ${COLOR_DARKEN};
        border-top: 1px solid ${COLOR_GOLD};
        border-bottom: 1px solid ${COLOR_GOLD};
        border-left: 1px solid ${COLOR_GOLD};
        border-right: 1px solid ${COLOR_GOLD};
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;

        min-height: 250px;
        max-height: 350px;
        overflow-y: hidden;
        transition: 0.5s all linear;
        .ant-select-item-option {
            color: ${COLOR_INPUT_CONTENT};
        }

        .ant-select-item-option-active {
            background-color: ${COLOR_GOLD_TRANS} !important;
        }

        @media (max-width: 576px) {
            max-height: 450px;
        }
    }
    .select-country__dropdown-visible {
        visibility: visible;
        opacity: 1;
    }
`;
