import { gql } from "@apollo/client";
import API from "../API";
import { F_ORDER, F_ORDERS } from "./OrderFragment";

const OrderApi = {
    history: () =>
        API.instance.query({
            query: gql`
                ${F_ORDERS}
                query historyOrder {
                    data: historyOrderForCustomer {
                        ...F_ORDERS
                    }
                }
            `,
            fetchPolicy: "no-cache",
        }),

    detail: (id: string) =>
        API.instance.query({
            query: gql`
                ${F_ORDER}
                query detailOrder($id: String!) {
                    data: detailOrderForCustomer(id: $id) {
                        data {
                            ...F_ORDER
                        }
                    }
                }
            `,
            variables: { id },
            fetchPolicy: "no-cache",
        }),

    create: (input: any) =>
        API.instance.mutate({
            mutation: gql`
                ${F_ORDER}
                mutation createOrder($input: OrderCreateInput!) {
                    data: createOrderForCustomer(input: $input) {
                        data {
                            ...F_ORDER
                        }
                    }
                }
            `,
            variables: { input },
            fetchPolicy: "no-cache",
        }),

    process: (payload: any) =>
        API.instance.mutate({
            mutation: gql`
                ${F_ORDER}
                mutation processOrder(
                    $orderId: String!
                    $input: OrderProcessInput!
                ) {
                    data: processOrderForCustomer(
                        orderId: $orderId
                        input: $input
                    ) {
                        data {
                            ...F_ORDER
                        }
                    }
                }
            `,
            variables: { ...payload },
            fetchPolicy: "no-cache",
        }),

    sentEmail: (input: any) =>
        API.instance.mutate({
            mutation: gql`
                mutation sentEmail($input: CustomerSendEmailAfterOrderInput!) {
                    data: sendEmailAfterOrderForCustomer(input: $input)
                }
            `,
            variables: { input },
            fetchPolicy: "no-cache",
        }),

    // update: (id: string, input: any) =>
    //     API.withConverter(detailConvertor).mutate({
    //         mutation: gql`
    //             ${F_BANNER}
    //             mutation updateBanner($id: ID!, $input: BannerInput) {
    //                 banner: updateBanner(id: $id, input: $input) {
    //                     ...F_BANNER
    //                 }
    //             }
    //         `,
    //         variables: { input, id },
    //     }),
};

export default OrderApi;
