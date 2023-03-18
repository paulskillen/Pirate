import { gql } from "@apollo/client";

export const F_PAGINATE = gql`
    fragment F_PAGINATE on PaginateResponse {
        page
        total
        items
    }
`;
