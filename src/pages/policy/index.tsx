/* eslint-disable react/no-unescaped-entities */
import { LayoutClean } from "@/container/shared/layout/Layout";
import PolicyPage from "@/container/static/policy/PolicyPage";
import type { NextPage } from "next";

const Policy: NextPage = () => {
    return <PolicyPage />;
};

export default Policy;

//@ts-ignore
Policy.Layout = LayoutClean;
