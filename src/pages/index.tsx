import type { NextPage } from "next";
import HomePage from "../content/home/HomePage";

declare const VALID_LAYOUT_VALUES: readonly [
    "fill",
    "fixed",
    "intrinsic",
    "responsive",
    undefined
];

const type: typeof VALID_LAYOUT_VALUES[number] = "fill";

const Home: NextPage = () => {
    return <HomePage />;
};

export default Home;
