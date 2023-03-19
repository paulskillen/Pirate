import MetaDataApi from "@/apis/meta-data/MetaDataApi";
import { TAB_BOTTOM_HEIGHT } from "@/common/constant/app";
import { AppStateContext } from "@/common/context/app/app-context";
import React, { PropsWithChildren, useEffect, useState } from "react";
import TabBottom from "../tab/TabBottom";
export interface ILayoutProps extends PropsWithChildren<{}> {
    [key: string]: any;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    const [countryList, setCountryList] = useState([]);

    useEffect(() => {
        loadMetaData();
    }, []);

    const loadMetaData = async () => {
        const data = await MetaDataApi.listCountry();
        setCountryList(data?.data?.data ?? []);
    };

    return (
        <AppStateContext.Provider value={{ countryList } as any}>
            <div>
                {children}
                <TabBottom />
            </div>
        </AppStateContext.Provider>
    );
};

export default Layout;
