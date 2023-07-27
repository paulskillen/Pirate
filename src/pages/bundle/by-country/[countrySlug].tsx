import BundleApi from "@/apis/bundle/BundleApi";
import { IBundle } from "@/common/interface/bundle";
import BundleByCountryPage from "@/container/bundle/BundleByCountryPage";
import { LayoutClean } from "@/container/shared/layout/Layout";
import React, { Fragment } from "react";

export interface IBundlesByCountryProps {
    bundles: IBundle[];
    countryCode: any;
}

export const getServerSideProps: any = async (context: any) => {
    const countryCode = context?.query?.countrySlug;
    if (countryCode) {
        const res = await BundleApi.listBundleFromCountry(countryCode);
        const resBundles = res?.data?.data?.data ?? [];
        return {
            props: {
                countryCode,
                bundles: resBundles,
            },
        };
    }
};

const BundlesByCountry: React.FC<IBundlesByCountryProps> = ({
    countryCode,
    bundles,
}) => {
    return <BundleByCountryPage countryCode={countryCode} bundles={bundles} />;
};

export default BundlesByCountry;

//@ts-ignore
BundlesByCountry.Layout = LayoutClean;
