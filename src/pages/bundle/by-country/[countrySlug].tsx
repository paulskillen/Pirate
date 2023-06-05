import BundleByCountryPage from "@/container/bundle/BundleByCountryPage";
import { LayoutClean } from "@/container/shared/layout/Layout";
import React from "react";
export interface IBundlesByCountryProps {
    [key: string]: any;
}

export const getServerSideProps: any = async (context: any) => {
    const countryCode = context?.query?.countrySlug;
    if (countryCode) {
        return {
            props: {
                countryCode,
            },
        };
    }
};

const BundlesByCountry: React.FC<IBundlesByCountryProps> = ({
    countryCode,
}) => {
    return <BundleByCountryPage countryCode={countryCode} />;
};

export default BundlesByCountry;

//@ts-ignore
BundlesByCountry.Layout = LayoutClean;
