import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "../styles/global.css";
import "../styles/style.scss";
import DefaultLayout from "@/container/shared/layout/Layout";
import API from "@/apis/API";
import { ComponentType, Fragment, useEffect, useState } from "react";
import {
    AppStateContext,
    loadStateContext,
    saveStateContext,
} from "@/common/context/app/app-context";
import LoadMetaComponent from "@/container/app/LoadMetaComponent";
import { NextComponentType, NextPageContext } from "next";
import { isEmpty } from "lodash";
import { wrapper } from "@/store/store";
import InitComponent from "@/container/app/content/InitComponent";
import AppSeo from "@/container/seo/app-seo/AppSeo";
import SocialSeo from "@/container/seo/social-seo/SocialSeo";
import { CONFIG } from "@/configuration/AppConfig";

export type MattressAppProps = AppProps & {
    Component: NextComponentType<NextPageContext, any> & {
        Layout: ComponentType;
        getLayout?: (props: any) => any;
    };
};

const initialOptions = {
    "client-id": CONFIG.PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
    // "data-client-token": "EIRtY98U_vi2XBwZJxGU9n4-f0cu-xOqVaTjsqwouFCJAsh9lgQoySt1BNMRX-hdGUOE3h0ftHoxz_ex",
};

function App({ Component, pageProps }: MattressAppProps) {
    const Layout: ComponentType = Component.Layout || DefaultLayout;
    const [metaData, setMetaData] = useState([]);
    const [userCart, setUserCart] = useState({});
    const [activeOrder, setActiveOrder] = useState({});
    const [openSelectCountry, setOpenSelectCountry] = useState<
        boolean | undefined
    >(undefined);

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

    const renderMainContent = () => {
        const getLayout = Component.getLayout;

        const content = (
            <Fragment>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, maximum-scale=1"
                    />
                </Head>
                <AppSeo />
                <SocialSeo />
                <Component {...pageProps} />
            </Fragment>
        );
        if (getLayout) {
            return getLayout(content);
        }

        return (
            //@ts-ignore
            <Layout>{content}</Layout>
        );
    };

    return (
        <SessionProvider session={pageProps?.session}>
            <PayPalScriptProvider options={initialOptions}>
                <ApolloProvider client={API.instance}>
                    <AppStateContext.Provider
                        value={
                            {
                                metaData,
                                setMetaData,
                                userCart,
                                setUserCart,
                                activeOrder,
                                setActiveOrder,
                                openSelectCountry,
                                setOpenSelectCountry,
                            } as any
                        }
                    >
                        <LoadMetaComponent />
                        <InitComponent />
                        {renderMainContent()}
                    </AppStateContext.Provider>
                </ApolloProvider>
            </PayPalScriptProvider>
        </SessionProvider>
    );
}

export default wrapper.withRedux(App);
