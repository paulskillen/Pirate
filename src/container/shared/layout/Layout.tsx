import MetaDataApi from "@/apis/meta-data/MetaDataApi";
import { AppStateContext } from "@/common/context/app/app-context";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect, useState } from "react";
import TabBottom from "../tab/TabBottom";
export interface ILayoutProps extends PropsWithChildren<{}> {
    [key: string]: any;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    const router = useRouter();
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
            <div className="layout_container bg-black">
                {children}
                <TabBottom />
            </div>
        </AppStateContext.Provider>
    );
};

export default Layout;
