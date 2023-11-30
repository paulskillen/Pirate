import { gql } from "@apollo/client";
import { F_PAGINATE } from "../Fragment";

export const F_BLOG = gql`
    fragment F_BLOG on BlogDto {
        id
        status
        title
        fullDesc
        shortDesc
        category
        homePageVisibility
        updatedAt
        createdAt
    }
`;

export const F_BLOGS = gql`
    ${F_BLOG}
    ${F_PAGINATE}
    fragment F_BLOGS on BlogPaginateResponse {
        data {
            ...F_BLOG
        }
        pagination {
            ...F_PAGINATE
        }
    }
`;
