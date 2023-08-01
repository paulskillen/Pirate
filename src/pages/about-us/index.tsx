import { LayoutClean, LayoutAuth } from "@/container/shared/layout/Layout";
import AboutUsPage from "@/container/static/about-us/AboutUsPage";
import type { NextPage } from "next";
import React from "react";

const AboutUs: NextPage = () => {
    return <AboutUsPage />;
};

export default AboutUs;

//@ts-ignore
AboutUs.getLayout = function getLayout(page) {
    return (
        <LayoutClean showHideConfig={{ hideLogo: true }}>{page}</LayoutClean>
    );
};
