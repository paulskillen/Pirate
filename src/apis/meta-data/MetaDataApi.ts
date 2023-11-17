import { gql } from "@apollo/client";
import API from "../API";

const MetaDataApi = {
    listCountry: () =>
        API.instance.query({
            query: gql`
                query listCountry {
                    data: listCountryForCustomer
                }
            `,
            // fetchPolicy: "no-cache",
        }),

    currencyRates: () =>
        API.instance.query({
            query: gql`
                query getCurrencyRates {
                    data: getCurrencyRates
                }
            `,
        }),
};

export default MetaDataApi;
