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
            <Script
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
            />
            <Script id="banners" type="text/javascript">
                <iframe
                    name="banner"
                    src='https://piratemobile.postaffiliatepro.com/scripts/d4dvubx?a_aid=2023004&amp;a_bid=549b1693&amp;w=1&refx2s6d="+encodeURIComponent(encodeURIComponent(document.URL))+"'
                    // framespacing="0"
                    // frameborder="no"
                    scrolling="no"
                    width="125"
                    height="125"
                    // allowtransparency="true"
                >
                    <a
                        href="https://www.piratemobile.gg/bundle/by-country/2023004"
                        target="_top"
                    >
                        Pirate Mobile
                    </a>
                </iframe>
            </Script>
            <noscript>
                <h2>
                    <a href="https://www.piratemobile.gg/bundle/by-country/2023004">
                        Pirate Mobile
                    </a>
                </h2>
            </noscript>
            <BundleByCountryPage countryCode={countryCode} />;
        </Fragment>
    );
};

export default BundlesByCountry;

//@ts-ignore
BundlesByCountry.Layout = LayoutClean;
