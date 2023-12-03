import Blogs from "@/container/blog/Blogs";
import Layout from "@/container/shared/layout/Layout";
import type { NextPage } from "next";

const BlogsPage: NextPage = () => {
    return <Blogs />;
};

export default BlogsPage;

//@ts-ignore
BlogsPage.getLayout = function getLayout(page) {
    return <Layout showHideConfig={{ hideLogo: true }}>{page}</Layout>;
};
