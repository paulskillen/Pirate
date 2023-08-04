import Path from "@/common/constant/path";
import { ICountry } from "@/common/interface/location";
import Image from "@/components/image/Image";
import AppLink from "@/components/link/AppLink";
import styled from "@emotion/styled";
import ClassNames from "classnames";
import React from "react";

const CountryItem = (props: {
    country: ICountry;
    hoverColor?: any;
    loading?: boolean;
}) => {
    const { country, hoverColor = true, loading } = props;
    const { name, flag, iso } = country || {};
    if (loading) {
        return <CountrySkeleton />;
    }
    return (
        <AppLink href={Path.bundleByCountry(country?.iso ?? "")} id={iso}>
            <CountryListItemStyle
                className={`flex flex-row items-center text-gray-300 pt-3 pb-3 pl-3 ${ClassNames(
                    { "hover:bg-gold-trans": hoverColor }
                )}`}
                {...props}
            >
                <Image
                    className="w-12 rounded border"
                    alt="flag"
                    src={`data:image/png;base64, ${flag}`}
                />
                <div className="text-base font-semibold ml-3 max-w-xs ">
                    {name}
                </div>
            </CountryListItemStyle>
        </AppLink>
    );
};

export const CountrySkeleton = React.memo(function CountrySkeletonMemo() {
    return (
        <div
            role="status"
            className="animate-pulse flex items-center w-full py-3"
        >
            <div className="flex items-center justify-center w-20 h-16 bg-gray-400 rounded sm:w-52 dark:bg-gray-700 mx-3">
                <svg
                    className="w-10 h-10 text-gray-300 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>
            <div className="w-full pr-3">
                <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-48 mb-3"></div>
                <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
        </div>
    );
});

export default CountryItem;

const CountryListItemStyle = styled.div``;
