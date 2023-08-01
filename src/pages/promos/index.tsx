import { LayoutClean } from "@/container/shared/layout/Layout";
import PromosPage from "@/container/static/promos/AboutUsPage";
import type { NextPage } from "next";

const Promos: NextPage = () => {
    return <PromosPage />;
};

export default Promos;

//@ts-ignore
Promos.getLayout = function getLayout(page) {
    return (
        <LayoutClean showHideConfig={{ hideLogo: true }}>{page}</LayoutClean>
    );
};
