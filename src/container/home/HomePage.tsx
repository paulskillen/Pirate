/* eslint-disable react/no-unescaped-entities */
import Path from "@/common/constant/path";
import SlickSlider from "@/components/slider/SlickSlider";
import ViewShowMore from "@/components/view/ViewShowMore";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { Button, Icon, ViewTextarea } from "d-react-components";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";

export interface IHomePageProps {
    [key: string]: any;
}

const IMG_MOBILE = 250;
const IMG_DESKTOP = 600;

enum TypeOfData {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW",
}
const HOME_PAGE_COVERS = [
    {
        id: TypeOfData.HIGH,
        label: "High",
        src: "/images/home-page-cover.jpeg",
    },
    {
        id: TypeOfData.MEDIUM,
        label: "Medium",
        src: "/images/home-page-cover.jpeg",
    },
    {
        id: TypeOfData.LOW,
        label: "Low",
        src: "/images/home-page-cover.jpeg",
    },
];

const validationSchema = Yup.object().shape({
    dataType: Yup.string().required("Required field!"),
    location: Yup.string().required("Required field!"),
    email: Yup.string()
        .email("Email must be a valid email!")
        .required("Required field!"),
});

const HomePage: React.FC<IHomePageProps> = ({ id }) => {
    const router = useRouter();

    const renderHeader = () => {
        return (
            <section className="flex flex-row justify-between items-center mt-2">
                <div className="flex-center-y ">
                    <div className="mr-3 hover:cursor-pointer p-0 m-0">
                        <Icon
                            id="installApp"
                            name="cloud_download"
                            className="text-gold "
                            size="x-large"
                        />
                    </div>
                </div>
                <div className="text-xl text-gold font-semibold w-100 text-center mb-2">
                    {Messages.selectDestination}
                </div>
                <Button
                    iconName="search"
                    className="rounded px-0 home-page__button-search ml-3"
                    classNameIcon="text-gold"
                    size="large"
                    variant="trans"
                    onClick={() => {
                        router.push({ pathname: Path.listCountry().href });
                    }}
                />
            </section>
        );
    };

    const renderHomepageSlider = () => {
        return (
            <SlickSlider>
                {HOME_PAGE_COVERS.map((item) => {
                    return (
                        <div
                            key={item?.id}
                            className="home-page__slider-image-wrapper"
                        >
                            <img
                                alt="slider-homepage"
                                src={item?.src}
                                className="home-page__slider-image"
                            />
                        </div>
                    );
                })}
            </SlickSlider>
        );
    };

    return (
        <MainStyled className="home-page__container container bg-transparent z-10 relative text-white px-3 ">
            {renderHeader()}
            <div className="h-screen overflow-y-scroll hide-scroll-bar-y">
                {renderHomepageSlider()}
                <section className=" mt-4">
                    <label className="text-gold text-center w-100 mb-2">
                        {Messages.introduction}
                    </label>
                    <ViewShowMore className="text-gold" limitLength={100}>
                        At Pirate Mobile, we understand the importance of
                        staying connected wherever you go. Introducing Pirate
                        Mobile eSim, your passport to hassle-free global
                        connectivity. Say goodbye to physical SIM cards and
                        unlock a world of seamless communication and data access
                        right from your device.
                    </ViewShowMore>
                </section>
                <section className=" mt-4">
                    <label className="text-gold text-center w-100 mb-2">
                        {Messages.whatIsPirateMobile}
                    </label>
                    <ViewShowMore className="text-gold" limitLength={100}>
                        Pirate Mobile eSim is a revolutionary technology that
                        allows you to activate a mobile connection without the
                        need for a physical SIM card. With a simple download and
                        activation process, you can enjoy the benefits of a
                        local mobile network wherever you travel. Say hello to
                        convenience and flexibility like never before.
                    </ViewShowMore>
                </section>
                <section className=" mt-4">
                    <label className="text-gold text-center w-100 mb-2">
                        {Messages.keyFeatures}
                    </label>
                    <ViewShowMore className="text-gold" limitLength={150}>
                        Global Coverage: Enjoy coverage in over 180 countries,
                        ensuring you're always connected, no matter where your
                        adventures take you. Easy Activation: Activate your eSim
                        with a few simple steps, eliminating the need to visit a
                        physical store or wait for a SIM card to be shipped to
                        you. Dual SIM Support: Seamlessly switch between your
                        eSim and physical SIM card for ultimate convenience and
                        flexibility. Cost-Effective: Say goodbye to expensive
                        international roaming charges. Pirate Mobile eSim offers
                        affordable plans that help you stay connected without
                        breaking the bank. Data Plans: Choose from a range of
                        data plans tailored to your specific needs, whether
                        you're a frequent traveler or an occasional explorer. No
                        Contract Required: Enjoy the freedom of a no-contract
                        commitment. Activate and deactivate your eSim as needed
                        without any long-term obligations.
                    </ViewShowMore>
                </section>
                <div className="h-52" />
            </div>
        </MainStyled>
    );
};

export default HomePage;

const MainStyled = styled.main`
    .home-page__button-search {
        margin-bottom: 5px;
        i {
            font-size: 24px;
        }
    }
    .home-page__slider-image-wrapper {
        padding-bottom: 67%;
        position: relative;
        .home-page__slider-image {
            position: absolute;
        }
    }
`;
