import { AppStateContext } from "@/common/context/app/app-context";
import React, { useContext, useMemo } from "react";

export interface IPriceTagProps {
    price: any;
    className?: string;
}

const PriceTag: React.FC<IPriceTagProps> = ({ price, className }) => {
    const { metaData } = useContext(AppStateContext);
    const { currencyRates } = metaData || {};

    console.log(
        "🚀 >>>>>> file: PriceTag.tsx:13 >>>>>> currencyRates:",
        currencyRates
    );
    const displayPrice = useMemo(() => {
        return price?.toLocaleString?.();
    }, [price]);
    return <div className={className}>${displayPrice}</div>;
};

export default PriceTag;
