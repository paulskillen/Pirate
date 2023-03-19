import { map } from "lodash";
import React from "react";

export interface IBundleByCountryPageProps {
    [key: string]: any;
}

const BundleByCountryPage: React.FC<IBundleByCountryPageProps> = ({
    bundles = [],
}) => {
    return (
        <div>
            {map(bundles, (item, index) => {
                return <div>{item?.name ?? "N/A"}</div>;
            })}
        </div>
    );
};

export default BundleByCountryPage;
