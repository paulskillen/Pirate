import BlogApi from "@/apis/blog/BlogApi";
import BlogDetail, { IBlogDetailProps } from "@/container/blog/BlogDetail";
import { LayoutClean } from "@/container/shared/layout/Layout";
import React from "react";

export interface IBundlesByCountryProps extends IBlogDetailProps {}

export const getServerSideProps: any = async (context: any) => {
    const blogId = context?.query?.blogSlug;
    if (blogId) {
        const res = await BlogApi.detail(blogId);
        const detail = res?.data?.data?.data ?? [];
        return {
            props: {
                blog: detail,
            },
        };
    }
};

const BlogPage: React.FC<IBundlesByCountryProps> = ({ blog }) => {
    return <BlogDetail blog={blog} />;
};

export default BlogPage;

//@ts-ignore
BlogPage.Layout = LayoutClean;
