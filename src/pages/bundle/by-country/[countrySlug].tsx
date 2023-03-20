import BundleApi from "@/apis/bundle/BundleApi";
import BundleByCountryPage from "@/container/bundle/BundleByCountryPage";
import ListCountryPage from "@/container/list-country/ListCountryPage";
import Messages from "@/languages/Messages";
import { Button, InputTextSearch } from "d-react-components";
import React from "react";

export interface IBundlesByCountryProps {
    [key: string]: any;
}

export const getServerSideProps: any = async (context: any) => {
    const countryCode = context?.query?.countrySlug;
    if (countryCode) {
        const bundles = await BundleApi.listBundleFromCountry(countryCode);
        return {
            props: {
                bundles: bundles?.data?.data?.data ?? [],
                countryCode,
            },
        };
    }
};

const BundlesByCountry: React.FC<IBundlesByCountryProps> = ({
    bundles,
    countryCode,
}) => {
    return <BundleByCountryPage bundles={bundles} countryCode={countryCode} />;
};

export default BundlesByCountry;
