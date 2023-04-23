import { gql } from "@apollo/client";
import { F_PAGINATE } from "../Fragment";

export const F_BUNDLE = gql`
    fragment F_BUNDLE on ProviderBundleDto {
        id
        updatedAt
        createdAt
        provider
        name
        description
        dataAmount
        duration
        price
        salePrice
        bundleData
    }
`;

export const F_BUNDLES = gql`
    ${F_BUNDLE}
    ${F_PAGINATE}
    fragment F_BUNDLES on ProviderBundlePaginateResponse {
        data {
            ...F_BUNDLE
        }
        pagination {
            ...F_PAGINATE
        }
    }
`;
