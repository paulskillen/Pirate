import React, { useMemo } from "react";

export interface IPriceTagProps {
    price: string;
}

const PriceTag: React.FC<IPriceTagProps> = ({ price }) => {
    const displayPrice = useMemo(() => {
        return price?.toLocaleString?.();
    }, [price]);
    return <div>${displayPrice}</div>;
};

export default PriceTag;
