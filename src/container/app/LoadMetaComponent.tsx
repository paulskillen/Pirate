import MetaDataApi from "@/apis/meta-data/MetaDataApi";
import {
    AppStateContext,
    loadStateStorage,
    updateStateStorage,
} from "@/common/context/app/app.context";
import { groupBy, isEmpty } from "lodash";
import moment from "moment";
import React, { useContext, useEffect } from "react";

export interface ILoadMetaComponentProps {
    [key: string]: any;
}

const LoadMetaComponent: React.FC<ILoadMetaComponentProps> = ({ id }) => {
    const { setMetaData, metaData } = useContext(AppStateContext);
    useEffect(() => {
        loadMetaData();
    }, []);

    const loadMetaData = async () => {
        try {
            const appState = loadStateStorage();
            let { countryList, currencyDate, currencyRates } =
                appState?.metaData ?? {};
            const skipLoadingCurrencies =
                !isEmpty(currencyRates) &&
                currencyDate &&
                moment(currencyDate).isSame(moment(), "day");
            const resCountries = countryList
                ? null
                : await MetaDataApi.listCountry();
            const resRates = skipLoadingCurrencies
                ? null
                : await MetaDataApi.currencyRates();
            if (resCountries) {
                countryList = resCountries?.data?.data ?? [];
            }
            const groupedBy = groupBy(countryList, (item) => item?.region);
            if (resRates) {
                currencyRates = resRates?.data?.data?.conversion_rates;
            }

            setMetaData({
                ...metaData,
                countryList,
                countryByRegion: groupedBy,
                currencyRates,
                currencyDate: new Date(),
            });
            updateStateStorage("metaData", {
                countryList,
                currencyRates,
                currencyDate: new Date(),
            });
        } catch (error) {
            console.error({ error });
        }
    };

    return null;
};

export default LoadMetaComponent;
