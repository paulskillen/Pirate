import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import "../styles/global.css";
import "../styles/style.scss";
import Layout from "@/container/shared/layout/Layout";
import API from "@/apis/API";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={API.instance}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    );
}
