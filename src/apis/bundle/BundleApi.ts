import { gql } from "@apollo/client";
import API from "../API";
import { F_BUNDLES } from "./BundleFragment";

const BundleApi = {
    listBundleFromCountry: (country: string) =>
        API.instance.query({
            query: gql`
                ${F_BUNDLES}
                query listBundleFromCountry($country: String!) {
                    data: listBundleFromCountryForCustomer(country: $country) {
                        ...F_BUNDLES
                    }
                }
            `,
            variables: { country },
            fetchPolicy: "no-cache",
        }),

    // detail: (id: string) =>
    //     API.withConverter(detailConvertor).query({
    //         query: gql`
    //             ${F_BANNER}
    //             query banner($id: ID!) {
    //                 banner(id: $id) {
    //                     ...F_BANNER
    //                 }
    //             }
    //         `,
    //         variables: { id },
    //     }),

    // create: (input: any) =>
    //     API.withConverter(detailConvertor).mutate({
    //         mutation: gql`
    //             ${F_BANNER}
    //             mutation createBanner($input: BannerInput) {
    //                 banner: createBanner(input: $input) {
    //                     ...F_BANNER
    //                 }
    //             }
    //         `,
    //         variables: { input },
    //     }),

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

export default BundleApi;
