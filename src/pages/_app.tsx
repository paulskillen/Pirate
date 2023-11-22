import API from "@/apis/API";
import AppSateProvider from "@/common/context/app/app.context";
import { CONFIG } from "@/configuration/AppConfig";
import LoadMetaComponent from "@/container/app/LoadMetaComponent";
import InitComponent from "@/container/app/content/InitComponent";
import AppSeo from "@/container/seo/app-seo/AppSeo";
import SocialSeo from "@/container/seo/social-seo/SocialSeo";
import DefaultLayout from "@/container/shared/layout/Layout";
import { wrapper } from "@/store/store";
import { ApolloProvider } from "@apollo/client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { NextComponentType, NextPageContext } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ComponentType, Fragment, useEffect } from "react";
import "../styles/global.css";
import "../styles/style.scss";

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

    // useEffect(() => {
    //     const preloader = document.querySelector(".site-preloader");

    //     if (!preloader) {
    //         return;
    //     }

    //     setTimeout(() => {
    //         const onTransitionEnd = (event: Event) => {
    //             if (
    //                 event instanceof TransitionEvent &&
    //                 event.propertyName === "opacity" &&
    //                 preloader.parentNode
    //             ) {
    //                 preloader.parentNode.removeChild(preloader);
    //             }
    //         };

    //         preloader.addEventListener("transitionend", onTransitionEnd);
    //         preloader.classList.add("site-preloader__fade");

    //         if (
    //             getComputedStyle(preloader).opacity === "0" &&
    //             preloader.parentNode
    //         ) {
    //             preloader.parentNode.removeChild(preloader);
    //         }
    //     }, 100);
    // }, []);

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
                    <AppSateProvider>
                        <LoadMetaComponent />
                        <InitComponent />
                        {renderMainContent()}
                    </AppSateProvider>
                </ApolloProvider>
            </PayPalScriptProvider>
        </SessionProvider>
    );
}

export default wrapper.withRedux(App);
