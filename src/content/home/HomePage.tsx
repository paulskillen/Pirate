import { InputText, Button } from "d-react-components";
import { isEmpty } from "lodash";
import Image from "next/image";
import React, { useState } from "react";

export interface IHomePageProps {
    [key: string]: any;
}

const IMG_MOBILE = 250;
const IMG_DESKTOP = 600;

const HomePage: React.FC<IHomePageProps> = ({ id }) => {
    const [userEmail, setUserEmail] = useState<string>();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const renderSubscribeForm = () => {
        return (
            <section className="h-auto w-full px-3 bg-primary flex flex-col justify-start items-center">
                <h3 className="block text-2xl  text-center text-white mt-6">
                    Get Your eSim: Our Customer Team will assist you all the way
                </h3>
                <div className="w-full mt-6 flex flex-col justify-center md:flex-row  md:items-end">
                    <InputText
                        classNameLabel="text-white"
                        label="Your Email"
                        placeholder="e.g., email@example.com"
                        classNameInput="border-2 border-red-500"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e?.target?.value)}
                    />
                    <div className="flex-center w-full mt-6 md:w-auto md:mt-0">
                        <Button
                            color="light"
                            onClick={() => {
                                if (isEmpty(userEmail)) return;
                                setUserEmail("");
                                setIsSubscribed(true);
                            }}
                        >
                            Join
                        </Button>
                    </div>
                </div>
                {isSubscribed && (
                    <div className="text-lg mt-6">Thanks for subscribing!</div>
                )}
                <div className="h-20" />
            </section>
        );
    };

    return (
        <main className="home-page_container w-screen h-screen bg-black text-white overflow-y-scroll">
            <section className="h-screen w-full px-3 flex-col lg:flex-row flex justify-center items-center ">
                <Image
                    className="none md:block"
                    alt="logo"
                    src="/images/logo/logo.png"
                    width={IMG_DESKTOP}
                    height={IMG_DESKTOP}
                />
                <Image
                    className="block md:hidden"
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
            <section className="h-screen w-full px-3 flex-col  flex justify-center items-center">
                <Image
                    className="none md:block"
                    alt="logo"
                    src="/images/logo/logo.png"
                    width={IMG_DESKTOP}
                    height={IMG_DESKTOP}
                />
                <Image
                    className="block md:hidden"
                    alt="logo"
                    src="/images/logo/logo.png"
                    width={IMG_MOBILE}
                    height={IMG_MOBILE}
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
                        convenience.
                    </p>
                </div>
            </section>
            {renderSubscribeForm()}
        </main>
    );
};

export default HomePage;
