import { IBundle } from "@/common/interface/bundle";
import React, { Dispatch } from "react";

export interface ISiteConfig {
    breadcrumb?: any[];
    label?: string;
}

export interface IMetaData {
    countryList?: any[];
}

export interface IAppState {
    me: any;
    metaData?: IMetaData;
    siteConfig: ISiteConfig;
    userCart: IBundle[];
    setSiteConfig: (values: any) => any;
    setMetaData: Dispatch<IMetaData>;
    setUserCart: Dispatch<IBundle[]>;
}

export const appStateDefault: IAppState = {
    me: {},
    metaData: {},
    siteConfig: {} as any,
    userCart: [] as any,
    setSiteConfig: () => {},
    setMetaData: () => {},
    setUserCart: () => {},
};

export const AppStateContext = React.createContext(appStateDefault);
