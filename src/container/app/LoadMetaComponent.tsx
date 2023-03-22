import MetaDataApi from "@/apis/meta-data/MetaDataApi";
import { AppStateContext } from "@/common/context/app/app-context";
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
        setMetaData({ ...metaData, countryList: data?.data?.data ?? [] });
    };

    return null;
};

export default LoadMetaComponent;
