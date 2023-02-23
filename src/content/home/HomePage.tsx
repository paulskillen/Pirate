import { InputText, Button } from "d-react-components";
import Image from "next/image";
import React from "react";

export interface IHomePageProps {
    [key: string]: any;
}

const HomePage: React.FC<IHomePageProps> = ({ id }) => {
    return (
        <div className="flex flex-col w-screen h-screen bg-primary text-white overflow-y-scroll">
            <section className=" bg-black flex-col lg:flex-row flex justify-center items-center">
                <Image
                    alt="logo"
                    src="/images/logo/logo.png"
                    width={600}
                    height={600}
                />
                <div className="flex flex-col text-center">
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
            <section className=" bg-black flex-col lg:flex-row flex justify-center items-center mt-10">
                <Image
                    alt="logo"
                    src="/images/logo/logo.png"
                    width={150}
                    height={150}
                />
                <div className="flex flex-col text-center">
                    <h3 className="text-4xl mt-9 text-wrap max-w-lg text-white">
                        Get to Know Pirate Mobile
                    </h3>
                    <p className="max-w-lg mt-9 leading-10">
                        When we love to keep track, connectivity is super
                        important for you, we understand you, therefor we offer
                        you different possibilities to stay connected in the
                        place you travel to, weather it is for business or
                        leisure. we're here to help you. we work transparent, we
                        have a costumer support 24/7 and easy guiding for your
                        convience.
                    </p>
                </div>
            </section>
            <section className=" bg-black flex-col  flex justify-center items-center mt-10">
                <h3 className="text-2xl mt-9 text-wrap max-w-lg text-center text-white">
                    Get Your eSim: Our Customer Team will assist you all the way
                </h3>
                <div className="flex items-end h-12 w-100">
                    <InputText
                        classNameLabel="text-white"
                        label="Your Email"
                        placeholder=""
                        classNameInput="border-2 border-gray-500"
                    />
                    <Button color="light">Join</Button>
                </div>
                <div className="text-base">Thanks for subscribing!</div>
            </section>
        </div>
    );
};

export default HomePage;
