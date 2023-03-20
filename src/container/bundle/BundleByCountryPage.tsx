import { map } from "lodash";
import ClassNames from "classnames";
import React from "react";
import { IBundle } from "@/common/interface/bundle";
import { Checkbox } from "d-react-components";
import ProviderNameItem from "../provider/shared/ProviderNameItem";
import Messages from "@/languages/Messages";

export interface IBundleByCountryPageProps {
    bundles: IBundle[];
    [key: string]: any;
}

export interface IBundleItemProps {
    bundle: IBundle;
    [key: string]: any;
}

const BundleByCountryPage: React.FC<IBundleByCountryPageProps> = ({
    bundles = [],
}) => {
    return (
        <div>
            {map(bundles, (item, index) => {
                return <BundleItem bundle={item} />;
            })}
        </div>
    );
};

export default BundleByCountryPage;

export const BundleItem: React.FC<IBundleItemProps> = ({ bundle }) => {
    const { provider, name, dataAmount, duration, description, price, id } =
        bundle || {};

    const rowClass = ClassNames("flex flex-row items-center");

    return (
        <div className="flex flex-row">
            <Checkbox variant="radio" />
            <div>
                <div className={rowClass}>
                    <div>{dataAmount}</div>
                    <div>{price}</div>
                </div>
                <div className={rowClass}>
                    <label>{duration}</label>
                    <div>{parseInt(Math.floor(price / dataAmount) as any)}</div>
                </div>
                <div className={rowClass}>
                    <div>{Messages.provider}</div>
                    <ProviderNameItem providerId={provider} />
                </div>
            </div>
        </div>
    );
};
