import { gql } from "@apollo/client";
import { F_PAGINATE } from "../Fragment";

export const F_BLOG = gql`
    fragment F_BLOG on BlogDto {
        id
        status
        title
        cover
        thumbnail
        fullDesc
        shortDesc
        category
        homePageVisibility
        updatedAt
        createdAt
    }
`;

export const F_BLOG_ITEM = gql`
    fragment F_BLOG_ITEM on BlogDto {
        id
        title
        cover
        thumbnail
        shortDesc
        category
        updatedAt
        createdAt
    }
`;

export const F_BLOGS = gql`
    ${F_BLOG_ITEM}
    ${F_PAGINATE}
    fragment F_BLOGS on BlogPaginateResponse {
        data {
            ...F_BLOG_ITEM
        }
        pagination {
            ...F_PAGINATE
        }
    }
`;
