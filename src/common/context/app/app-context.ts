import { IBundle } from "@/common/interface/bundle";
import { IOrder } from "@/common/interface/order";
import LocalStorage from "@/common/storage/LocalStorage";
import React, { Dispatch } from "react";

export const APP_STATE_CONTEXT = "APP_STATE_CONTEXT";

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
    activeOrder: IOrder;
    setSiteConfig: (values: any) => any;
    setMetaData: Dispatch<IMetaData>;
    setUserCart: Dispatch<IBundle[]>;
    setActiveOrder: Dispatch<IOrder>;
}

export const appStateDefault: IAppState = {
    me: {},
    metaData: {},
    siteConfig: {} as any,
    userCart: [] as any,
    activeOrder: {} as any,
    setSiteConfig: () => {},
    setMetaData: () => {},
    setUserCart: () => {},
    setActiveOrder: () => {},
};

export const AppStateContext = React.createContext(appStateDefault);

export const loadStateContext = (): any => {
    return LocalStorage.get(APP_STATE_CONTEXT);
};

export const saveStateContext = (state: any) => {
    return LocalStorage.set(APP_STATE_CONTEXT, state);
};
