import { IBundle } from "@/common/interface/bundle";
import { IOrder } from "@/common/interface/order";
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

export const loadStateContext = () => {
    if (!process.browser) {
        return undefined;
    }
    let state;
    try {
        state = localStorage.getItem(APP_STATE_CONTEXT);
        if (typeof state === "string") {
            state = JSON.parse(state);
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    return state || undefined;
};

export const saveStateContext = (state: any) => {
    if (!process.browser) {
        return undefined;
    }
    try {
        localStorage.setItem(APP_STATE_CONTEXT, JSON.stringify(state));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};
