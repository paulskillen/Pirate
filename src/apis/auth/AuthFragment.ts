import { gql } from "@apollo/client";
import { F_CUSTOMER } from "../customer/CustomerFragment";
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
        bundleData
    }
`;

export const F_LOGIN_SOCIAL = gql`
    ${F_CUSTOMER}
    fragment F_LOGIN_SOCIAL on LoginSocialResponseDto {
        accessToken
        isRegistered
        profile {
            ...F_CUSTOMER
        }
    }
`;

export const F_LOGIN = gql`
    ${F_CUSTOMER}
    fragment F_LOGIN on LoginResponseDto {
        accessToken
        isVerified
        isRegistered
        profile {
            ...F_CUSTOMER
        }
    }
`;
