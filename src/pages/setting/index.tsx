import type { NextPage } from "next";

declare const VALID_LAYOUT_VALUES: readonly [
    "fill",
    "fixed",
    "intrinsic",
    "responsive",
    undefined
];

const type: typeof VALID_LAYOUT_VALUES[number] = "intrinsic";

const Setting: NextPage = () => {
    return <div />;
};

export default Setting;
