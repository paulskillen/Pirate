import React, { useMemo } from "react";

export interface IPriceTagProps {
    price: any;
    className?: string;
}

const PriceTag: React.FC<IPriceTagProps> = ({ price, className }) => {
    const displayPrice = useMemo(() => {
        return price?.toLocaleString?.();
    }, [price]);
    return <div className={className}>${displayPrice}</div>;
};

export default PriceTag;
