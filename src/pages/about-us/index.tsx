import { LayoutClean, LayoutAuth } from "@/container/shared/layout/Layout";
import PromosPage from "@/container/static/about-us/AboutUsPage";
import type { NextPage } from "next";
import React from "react";

const AboutUs: NextPage = () => {
    return <PromosPage />;
};

export default AboutUs;

//@ts-ignore
AboutUs.getLayout = function getLayout(page) {
    return <LayoutClean hideLogo>{page}</LayoutClean>;
};
