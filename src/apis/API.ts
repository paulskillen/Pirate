/* eslint-disable no-unused-vars */
import { GOOGLE_API_KEY } from "@/common/constant/app";
import {
    ApolloClient,
    from,
    gql,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import axios from "axios";
import { CONFIG } from "../configuration/AppConfig";
import {
    AuthMiddleware,
    LangMiddleware,
    UnauthorizeMiddleware,
} from "./Interceptor";

interface IConverter {
    fromServer?: (params: any) => any;
    toServer?: (params: any) => any;
}

const httpLink = new HttpLink({
    uri: CONFIG.API_BASE_URL,
});

const httpUploadLink = createUploadLink({
    uri: CONFIG.API_BASE_URL,
});

export const getInstance = () =>
    new ApolloClient({
        cache: new InMemoryCache(),
        link: from([
            LangMiddleware,
            AuthMiddleware,
            UnauthorizeMiddleware,
            httpLink,
        ]),
        connectToDevTools: true,
    });

const getInstanceUpload = () =>
    new ApolloClient({
        cache: new InMemoryCache(),
        link: from([
            LangMiddleware,
            AuthMiddleware,
            UnauthorizeMiddleware,
            httpUploadLink,
        ]),
    });

const API = {
    instance: getInstance(),

    instanceUpload: getInstanceUpload(),

    stripTypeName: (data: any) => {
        const omitTypename = (key: string, value: any) =>
            key === "__typename" ? undefined : value;
        const strippedData = JSON.parse(JSON.stringify(data), omitTypename);
        return strippedData;
    },

    // withConverter: (converter: IConverter) => {
    //     const { fromServer, toServer } = converter;
    //     return {
    //         query: (params: any) => API.query(params, fromServer, toServer),
    //         mutate: (params: any) => API.mutate(params, fromServer, toServer),
    //     };
    // },

    // query: async (
    //     param: any,
    //     fromServer: IConverter["fromServer"] = (param) => param,
    //     toServer: IConverter["toServer"] = (param) => param
    // ) =>
    //     API.instance
    //         .query(toServer(param))
    //         .then((res) => fromServer(API.stripTypeName(res))),

    // mutate: async (
    //     param: any,
    //     fromServer: IConverter["fromServer"] = (param) => param,
    //     toServer: IConverter["toServer"] = (param) => param
    // ) =>
    //     API.instance
    //         .mutate({ ...param, variables: toServer(param?.variables) })
    //         .then((res) => fromServer(API.stripTypeName(res))),

    // // wrap method
    // delete: (method: string, id: string, idKey = "id") =>
    //     API.mutate({
    //         mutation: gql`
    //             mutation delete($id: ID!) {
    //                 ${method}(${idKey}: $id) {
    //                     status
    //                     messages
    //                 }
    //             }
    //         `,
    //         variables: { id },
    //     }),
    getLocationFromAddress: (address: string) => {
        return axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`
        );
    },
};

export default API;
