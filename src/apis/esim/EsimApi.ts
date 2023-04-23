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
};

export default EsimApi;
