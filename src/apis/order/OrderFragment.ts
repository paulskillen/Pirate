import { gql } from "@apollo/client";
import { F_BUNDLE } from "../bundle/BundleFragment";
import { F_CUSTOMER_BASIC } from "../customer/CustomerFragment";
import { F_PAGINATE } from "../Fragment";

export const F_ORDER = gql`
    ${F_CUSTOMER_BASIC}
    ${F_BUNDLE}
    fragment F_ORDER on CustomerOrderDto {
        id
        createdAt
        orderNo
        status
        products {
            quantity
            product {
                ...F_BUNDLE
            }
        }
        customer {
            ...F_CUSTOMER_BASIC
        }
        payment {
            paymentData
            updatedAt
            createdAt
            method
            status
        }
        remark
        total
        subTotal
        provider
        refOrder
        providerOrder
        eSimData
    }
`;

export const F_ORDERS = gql`
    ${F_ORDER}
    ${F_PAGINATE}
    fragment F_ORDERS on CustomerOrderPaginateResponse {
        data {
            ...F_ORDER
        }
        pagination {
            ...F_PAGINATE
        }
    }
`;
