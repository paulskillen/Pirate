/* eslint-disable react/no-unescaped-entities */
import { LayoutClean } from "@/container/shared/layout/Layout";
import TermConditionsPage from "@/container/static/term-conditions/TermConditionsPage";
import type { NextPage } from "next";

const TermConditions: NextPage = () => {
    return <TermConditionsPage />;
};

export default TermConditions;

//@ts-ignore
TermConditions.Layout = LayoutClean;
