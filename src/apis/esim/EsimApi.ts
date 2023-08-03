import { gql } from "@apollo/client";
import API from "../API";
import { F_ORDER, F_ORDERS } from "./EsimFragment";

const EsimApi = {
    // history: () =>
    //     API.instance.query({
    //         query: gql`
    //             ${F_ORDERS}
    //             query historyOrder {
    //                 data: historyOrderForCustomer {
    //                     ...F_ORDERS
    //                 }
    //             }
    //         `,
    //         fetchPolicy: "no-cache",
    //     }),

    getQrCode: (code: string) =>
        API.instance.query({
            query: gql`
                query getQrCode($code: String!) {
                    data: getESimQrCodeForCustomer(code: $code)
                }
            `,
            variables: { code },
            fetchPolicy: "no-cache",
        }),

    getBundlesApplied: (iccid: string) =>
        API.instance.query({
            query: gql`
                query getBundlesApplied($iccid: String!) {
                    data: getListBundlesAppliedToESimForCustomer(iccid: $iccid)
                }
            `,
            variables: { iccid },
            fetchPolicy: "no-cache",
        }),

    sendSms: (iccid: string) =>
        API.instance.mutate({
            mutation: gql`
                mutation sendSms($iccid: String!) {
                    data: sendSmsToESimForCustomer(iccid: $iccid)
                }
            `,
            variables: { iccid },
            fetchPolicy: "no-cache",
        }),
};

export default EsimApi;
