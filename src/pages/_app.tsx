import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "../styles/global.css";
import "../styles/style.scss";
import DefaultLayout from "@/container/shared/layout/Layout";
import API from "@/apis/API";
import { ComponentType, useEffect, useState } from "react";
import {
    AppStateContext,
    loadStateContext,
    saveStateContext,
} from "@/common/context/app/app-context";
import LoadMetaComponent from "@/container/app/LoadMetaComponent";
import { NextComponentType, NextPageContext } from "next";
import { isEmpty } from "lodash";

export type MattressAppProps = AppProps & {
    Component: NextComponentType<NextPageContext, any> & {
        Layout: ComponentType;
    };
};

const initialOptions = {
    "client-id": "AZAkLax018bh39V5n1Vbp3QTsOIspCBQ8pvEU5OeNUA0k28EGj63lB9697sTlwbyTLI-T35Mfpya3Fm0",
    currency: "USD",
    intent: "capture",
    // "data-client-token": "EIRtY98U_vi2XBwZJxGU9n4-f0cu-xOqVaTjsqwouFCJAsh9lgQoySt1BNMRX-hdGUOE3h0ftHoxz_ex",
};

export default function App({ Component, pageProps }: MattressAppProps) {
    const Layout: ComponentType = Component.Layout || DefaultLayout;
    const [metaData, setMetaData] = useState([]);
    const [userCart, setUserCart] = useState([]);

    useEffect(() => {
        const preloader = document.querySelector(".site-preloader");

        if (!preloader) {
            return;
        }

        setTimeout(() => {
            const onTransitionEnd = (event: Event) => {
                if (
                    event instanceof TransitionEvent &&
                    event.propertyName === "opacity" &&
                    preloader.parentNode
                ) {
                    preloader.parentNode.removeChild(preloader);
                }
            };

            preloader.addEventListener("transitionend", onTransitionEnd);
            preloader.classList.add("site-preloader__fade");

            if (
                getComputedStyle(preloader).opacity === "0" &&
                preloader.parentNode
            ) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 100);
    }, []);

    useEffect(() => {
        const appStateContext = loadStateContext();
        if (appStateContext && !isEmpty(appStateContext?.cart)) {
            setUserCart({ ...(appStateContext?.cart ?? {}) });
        }
    }, []);

    useEffect(() => {
        const appStateContext = loadStateContext();
        saveStateContext({ ...appStateContext, cart: userCart });
    }, [userCart]);

    return (
        <PayPalScriptProvider options={initialOptions}>
            <ApolloProvider client={API.instance}>
                <AppStateContext.Provider
                    value={
                        { metaData, setMetaData, userCart, setUserCart } as any
                    }
                >
                    <LoadMetaComponent />
                    {/* @ts-ignore */}
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AppStateContext.Provider>
            </ApolloProvider>
        </PayPalScriptProvider>
    );
}
