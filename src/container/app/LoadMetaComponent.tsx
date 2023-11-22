import MetaDataApi from "@/apis/meta-data/MetaDataApi";
import {
    AppStateContext,
    loadStateStorage,
    updateStateStorage,
} from "@/common/context/app/app.context";
import { groupBy } from "lodash";
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
            let countryList = appState?.metaData?.countryList;
            const resCountries = countryList
                ? null
                : await MetaDataApi.listCountry();
            const resRates = await MetaDataApi.currencyRates();
            if (resCountries) {
                countryList = resCountries?.data?.data ?? [];
            }
            const groupedBy = groupBy(countryList, (item) => item?.region);
            setMetaData({
                ...metaData,
                countryList,
                countryByRegion: groupedBy,
                currencyRates: resRates?.data?.data?.conversion_rates,
            });
            updateStateStorage("metaData", { countryList });
        } catch (error) {
            console.error({ error });
        }
    };

    return null;
};

export default LoadMetaComponent;
