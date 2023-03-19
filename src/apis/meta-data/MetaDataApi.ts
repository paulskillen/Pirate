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
};

export default MetaDataApi;
