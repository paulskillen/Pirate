import { gql } from "@apollo/client";
import API from "../API";
import { F_BLOGS, F_BLOG } from "./BlogFragment";

const BlogApi = {
    list: async (paginate: any) =>
        API.instance.query({
            query: gql`
                ${F_BLOGS}
                query listBlogForCustomer($paginate: BlogPaginateRequest!) {
                    data: listBlogForCustomer(paginate: $paginate) {
                        ...F_BLOGS
                    }
                }
            `,
            variables: { paginate },
            fetchPolicy: "no-cache",
        }),

    homepageList: async (paginate: any) =>
        API.instance.query({
            query: gql`
                ${F_BLOGS}
                query getHomePageBlogForCustomer(
                    $paginate: BlogPaginateRequest!
                ) {
                    data: getHomePageBlogForCustomer(paginate: $paginate) {
                        ...F_BLOGS
                    }
                }
            `,
            variables: { paginate },
            fetchPolicy: "no-cache",
        }),

    detail: async (id: string) =>
        API.instance.query({
            query: gql`
                ${F_BLOG}
                query detailBlogForCustomer($id: String!) {
                    data: detailBlogForCustomer(id: $id) {
                        data {
                            ...F_BLOG
                        }
                    }
                }
            `,
            variables: { id },
            fetchPolicy: "no-cache",
        }),
};

export default BlogApi;
