import PostAffiliatePro, {
    PAPTrackingClick,
} from "@/components/third-party/PostAffiliatePro";
import BundleByCountryPage from "@/container/bundle/BundleByCountryPage";
import { LayoutClean } from "@/container/shared/layout/Layout";
import Script from "next/script";
import React, { Fragment } from "react";

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
    return (
        <Fragment>
            {/* <Script
                type="text/javascript"
                id="pap_x2s6df8d"
                src="https://piratemobile.postaffiliatepro.com/scripts/d4dvujx"
            />
            <Script
                type="text/javascript"
                onLoad={() => {
                    try {
                        //@ts-ignore
                        PostAffTracker.setAccountId("default1");
                        //@ts-ignore
                        PostAffTracker.track();
                    } catch (err) {}
                }}
            /> */}
            {/* <PostAffiliatePro /> */}
            <PAPTrackingClick />
            <BundleByCountryPage countryCode={countryCode} />;
        </Fragment>
    );
};

export default BundlesByCountry;

//@ts-ignore
BundlesByCountry.Layout = LayoutClean;
