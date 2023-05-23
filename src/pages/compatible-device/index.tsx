/* eslint-disable react/no-unescaped-entities */
import PageHeader from "@/container/shared/header/PageHeader";
import { LayoutClean } from "@/container/shared/layout/Layout";
import Messages from "@/languages/Messages";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const CompatibleDevice: NextPage = () => {
    const router = useRouter();
    return (
        <div className="">
            <PageHeader title={Messages.compatibleDevices} />
            <p className="bg-black h-screen text-white relative z-20 px-4 pt-4 pb-20 overflow-y-scroll">
                <h5 className="font-semibold mb-3 text-white">
                    Below is a list of some of the most popular eSIM compatible
                    smartphones:
                </h5>
                <section className="mt-2">
                    - iPhone 12, iPhone 12 Mini, iPhone 12 Pro, and iPhone 12
                    Pro Max.
                </section>
                <section className="mt-2">
                    - iPhone 11, iPhone 11 Pro, and iPhone 11 Pro Max.
                </section>
                <section className="mt-2">
                    - iPhone XS, iPhone XS Max, and iPhone XR.
                </section>
                <section className="mt-2">
                    - Google Pixel 3, Pixel 3 XL, Pixel 3a, Pixel 3a XL, Pixel
                    4, Pixel 4 XL, Pixel 4a, and Pixel 5.
                </section>
                <section className="mt-2">
                    - Samsung Galaxy S20, S20+, S20 Ultra, Z Flip, Z Fold and
                    Note 20, Note 20 Ultra.
                </section>
                <section className="mt-2">
                    - Motorola Razr 5G and Moto G Stylus.
                </section>
                <section className="mt-2">
                    - LG Wing, LG G8, LG G8S, and LG V50S.
                </section>
                <section className="mt-2">- Microsoft Surface Duo.</section>
                <section className="mt-2">
                    It's worth noting that although these phones are eSIM
                    compatible, there may be restrictions on which networks and
                    carriers support eSIM technology on these devices, depending
                    on your location and mobile service provider.
                </section>
            </p>
        </div>
    );
};

export default CompatibleDevice;

//@ts-ignore
CompatibleDevice.Layout = LayoutClean;