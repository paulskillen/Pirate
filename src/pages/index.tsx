import Layout from "@/container/shared/layout/Layout";
import type { NextPage } from "next";
import HomePage, { IHomePageProps } from "../container/home/HomePage";
import BlogApi from "@/apis/blog/BlogApi";

declare const VALID_LAYOUT_VALUES: readonly [
    "fill",
    "fixed",
    "intrinsic",
    "responsive",
    undefined
];

const type: (typeof VALID_LAYOUT_VALUES)[number] = "fill";

export const getServerSideProps: any = async (context: any) => {
    const res = await BlogApi.homepageBlogs();
    const blogs = res?.data?.data?.data ?? [];
    return {
        props: {
            latestNews: blogs,
        },
    };
};

export interface IHomeProps extends IHomePageProps {}

const Home: NextPage<IHomeProps> = ({ latestNews }) => {
    return <HomePage latestNews={latestNews} />;
};

//@ts-ignore
Home.getLayout = function getLayout(page) {
    return <Layout showHideConfig={{ hideLogo: true }}>{page}</Layout>;
};

export default Home;
