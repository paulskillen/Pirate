import { gql } from "@apollo/client";
import { F_PAGINATE } from "../Fragment";

export const F_CUSTOMER_BASIC = gql`
    fragment F_CUSTOMER_BASIC on CustomerBasicDto {
        id
        customerNo
        avatar
        firstName
        lastName
        fullName
        nickname
        gender
        phone
        email
    }
`;
