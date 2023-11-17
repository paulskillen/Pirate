import { IBundle } from "@/common/interface/bundle";
import { ICountry, CountryRegion } from "@/common/interface/location";
import { IOrder } from "@/common/interface/order";
import LocalStorage from "@/common/storage/LocalStorage";
import React, { Dispatch } from "react";

export const APP_STATE_CONTEXT = "APP_STATE_CONTEXT";

export interface IUserData {
    profile?: any;
    currency?: string;
}

export interface ISiteConfig {
    breadcrumb?: any[];
    label?: string;
}

export interface IMetaData {
    countryList?: ICountry[];
    countryByRegion?: {
        [key in CountryRegion]?: ICountry[];
    };
    currencyRates?: any;
}

export interface IAppState {
    userData: IUserData;
    openSelectCountry?: boolean;
    metaData?: IMetaData;
    siteConfig?: ISiteConfig;
    userCart: IBundle[];
    activeOrder: IOrder;
    setSiteConfig?: (values: any) => any;
    setMetaData: Dispatch<IMetaData>;
    setUserCart: Dispatch<IBundle[]>;
    setUserData: Dispatch<IUserData>;
    setActiveOrder: Dispatch<IOrder>;
    setOpenSelectCountry: Dispatch<boolean | undefined>;
}

export const appStateDefault: IAppState = {
    userData: {},
    metaData: {},
    siteConfig: {} as any,
    userCart: [] as any,
    activeOrder: {} as any,
    setSiteConfig: () => {},
    setMetaData: () => {},
    setUserCart: () => {},
    setUserData: () => {},
    setActiveOrder: () => {},
    setOpenSelectCountry: () => {},
};

export const AppStateContext = React.createContext(appStateDefault);

export const loadStateContext = (): any => {
    return LocalStorage.get(APP_STATE_CONTEXT);
};

export const saveStateContext = (state: any) => {
    return LocalStorage.set(APP_STATE_CONTEXT, state);
};

export const updateStateContext = (key: keyof IAppState, value: any) => {
    const state = loadStateContext();
    return LocalStorage.set(APP_STATE_CONTEXT, {
        ...(state || {}),
        [key]: value,
    });
};
