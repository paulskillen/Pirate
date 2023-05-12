import LandingPage from "@/container/home/LandingPage";
import { LayoutClean, LayoutAuth } from "@/container/shared/layout/Layout";
import type { NextPage } from "next";

const AboutUs: NextPage = () => {
    return <LandingPage />;
};

export default AboutUs;

//@ts-ignore
AboutUs.Layout = LayoutClean;
