import MetaDataApi from "@/apis/meta-data/MetaDataApi";
import { AppStateContext } from "@/common/context/app/app-context";
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
        const data = await MetaDataApi.listCountry();
        const countryList = data?.data?.data ?? [];
        const groupedBy = groupBy(countryList, (item) => item?.region);
        setMetaData({ ...metaData, countryList, countryByRegion: groupedBy });
    };

    return null;
};

export default LoadMetaComponent;
