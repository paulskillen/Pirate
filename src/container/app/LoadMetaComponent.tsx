import MetaDataApi from "@/apis/meta-data/MetaDataApi";
import { AppStateContext } from "@/common/context/app/app.context";
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
            const resCountries = await MetaDataApi.listCountry();
            const resRates = await MetaDataApi.currencyRates();
            const countryList = resCountries?.data?.data ?? [];
            const groupedBy = groupBy(countryList, (item) => item?.region);
            setMetaData({
                ...metaData,
                countryList,
                countryByRegion: groupedBy,
                currencyRates: resRates?.data?.data?.conversion_rates,
            });
        } catch (error) {
            console.error({ error });
        }
    };

    return null;
};

export default LoadMetaComponent;
