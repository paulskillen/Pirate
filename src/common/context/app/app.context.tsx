import { CurrencyType, ICurrency } from "@/common/constant/currency";
import { IBundle } from "@/common/interface/bundle";
import { ICountry, CountryRegion } from "@/common/interface/location";
import { IOrder } from "@/common/interface/order";
import LocalStorage from "@/common/storage/LocalStorage";
import { isEmpty } from "lodash";
import React, { Dispatch, useEffect, useState } from "react";

export const APP_STATE_CONTEXT = "APP_STATE_CONTEXT";

export interface IUserData {
    profile?: any;
    currency?: ICurrency;
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
    currencyDate?: Date;
}

export interface IAppState {
    userData: IUserData;
    openSelectCountry?: boolean;
    metaData?: IMetaData;
    siteConfig?: ISiteConfig;
    userCart: IBundle[];
    activeOrder: IOrder;
    successOrder?: IOrder;
    setSiteConfig?: (values: any) => any;
    setMetaData: Dispatch<IMetaData>;
    setUserCart: Dispatch<IBundle[]>;
    setUserData: Dispatch<IUserData>;
    setActiveOrder: Dispatch<IOrder>;
    setSuccessOrder: Dispatch<IOrder>;
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
    setSuccessOrder: () => {},
    setOpenSelectCountry: () => {},
};

export const AppStateContext = React.createContext(appStateDefault);

export const loadStateStorage = (): IAppState & { cart: any } => {
    return LocalStorage.get(APP_STATE_CONTEXT);
};

export const saveStateStorage = (state: any) => {
    return LocalStorage.set(APP_STATE_CONTEXT, state);
};

export const updateStateStorage = (key: keyof IAppState, value: any) => {
    const state = loadStateStorage();
    return LocalStorage.set(APP_STATE_CONTEXT, {
        ...(state || {}),
        [key]: value,
    });
};

export default function AppSateProvider({ children }: any) {
    const [metaData, setMetaData] = useState<IAppState["metaData"]>({});
    const [userCart, setUserCart] = useState<any>({});
    const [activeOrder, setActiveOrder] = useState<any>({});
    const [successOrder, setSuccessOrder] = useState<IOrder>();
    const [userData, setUserData] = useState<IUserData>({});
    const [openSelectCountry, setOpenSelectCountry] = useState<
        boolean | undefined
    >(undefined);

    useEffect(() => {
        const appStateContext = loadStateStorage();
        if (appStateContext) {
            if (!isEmpty(appStateContext?.cart)) {
                setUserCart({ ...(appStateContext?.cart ?? {}) });
            }
            if (!isEmpty(appStateContext?.userData)) {
                setUserData(appStateContext?.userData);
            }
        }
    }, []);

    useEffect(() => {
        const appStateContext = loadStateStorage();
        saveStateStorage({ ...appStateContext, cart: userCart });
    }, [userCart]);

    return (
        <AppStateContext.Provider
            value={{
                metaData,
                setMetaData,
                userCart,
                setUserCart,
                activeOrder,
                setActiveOrder,
                openSelectCountry,
                setOpenSelectCountry,
                userData,
                setUserData,
                successOrder,
                setSuccessOrder,
            }}
        >
            {children}
        </AppStateContext.Provider>
    );
}
