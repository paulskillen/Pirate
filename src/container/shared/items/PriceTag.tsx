import CurrencyFormat from "react-currency-format";
import { CurrencyType } from "@/common/constant/currency";
import { AppStateContext } from "@/common/context/app/app.context";
import React, { useContext, useMemo } from "react";

export interface IPriceTagProps {
    price: any;
    className?: string;
    classNameText?: string;
    colorText?: string;
}

const PriceTag: React.FC<IPriceTagProps> = ({
    price,
    className,
    classNameText,
    colorText = "light",
}) => {
    const { metaData, userData } = useContext(AppStateContext);
    const { currencyRates } = metaData || {};
    const { currency: userCurrency } = userData || {};
    const { code: codeCurrency, symbol = "$" } = userCurrency || {};
    const displayPrice = useMemo(() => {
        if (!codeCurrency || codeCurrency === CurrencyType.USD) {
            return price?.toLocaleString?.();
        }
        const exchangeRate = currencyRates?.[codeCurrency];
        if (exchangeRate) {
            const converted = +price * exchangeRate;
            return converted.toLocaleString?.();
        }
        return price?.toLocaleString?.();
    }, [price, userCurrency, currencyRates]);

    return (
        <div className={className}>
            <CurrencyFormat
                thousandSeparator
                className={`label text-${colorText} ${classNameText}`}
                value={displayPrice}
                displayType="text"
                prefix={`${symbol} `}
                decimalScale={1}
            />
        </div>
    );
};

export default PriceTag;
