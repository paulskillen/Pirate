import PageHeader from "@/container/shared/header/PageHeader";
import Messages from "@/languages/Messages";
import Image from "next/image";
import React from "react";
import * as Yup from "yup";

export interface IAboutUsPageProps {
    [key: string]: any;
}

const IMG_MOBILE = 250;
const IMG_DESKTOP = 600;

const AboutUsPage: React.FC<IAboutUsPageProps> = ({ id }) => {
    return (
        <div className="home-page_container w-screen h-screen bg-black text-white overflow-y-scroll">
            <PageHeader
                title={Messages.aboutUs}
            />
            <section className="container w-full px-3 flex-col lg:flex-row flex justify-center items-center">
                <Image
                    className="none lg:block"
                    alt="logo"
                    src="/images/logo/logo.png"
                    width={IMG_DESKTOP}
                    height={IMG_DESKTOP}
                />
                <Image
                    className="block lg:hidden"
                    alt="logo"
                    src="/images/logo/logo.png"
                    width={IMG_MOBILE}
                    height={IMG_MOBILE}
                />
                <div className="flex flex-col text-center mt-9">
                    <h2 className="text-6xl text-white">Save 90%</h2>
                    <h3 className="text-4xl mt-9 text-wrap max-w-lg text-white">
                        of Mobile Data cost
                    </h3>
                    <h3 className="text-4xl mt-9 text-wrap max-w-lg text-white">
                        when traveling
                    </h3>
                    <p className="max-w-lg mt-9 leading-10">
                        Forget Roaming bills Improve Convenience, Reduce Cost
                        and Expand Coverage Join more than 1,000,000 People
                        using eSims & our service when traveling.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;
