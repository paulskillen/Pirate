import React from "react";

export interface ISiteConfig {
    breadcrumb?: any[];
    label?: string;
}

export interface IAppState {
    me: any;
    // provinceList?: IProvince[];
    countryList?: any[];
    siteConfig: ISiteConfig;
    setSiteConfig: (values: any) => any;
}

export const appStateDefault: IAppState = {
    me: {},
    countryList: [],
    siteConfig: {} as any,
    setSiteConfig: () => {},
};

export const AppStateContext = React.createContext(appStateDefault);
