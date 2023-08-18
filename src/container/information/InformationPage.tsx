/* eslint-disable react/no-unescaped-entities */
import Path from "@/common/constant/path";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import React from "react";
import BlockInformation from "../shared/block/BlockInformation";
import MobileHeader from "../shared/header/MobileHeader";

export interface IInformationPageProps {
    [key: string]: any;
}

const BLOCK_INFORMATION = [
    {
        id: "1",
        title: Messages.introduction,
        description:
            "At Pirate Mobile, we understand the importance of staying connected wherever you go. Introducing Pirate Mobile digital SIM card, your passport to hassle-free global connectivity. Say goodbye to physical SIM cards and unlock a world of seamless communication and data access right from your device.",
        image: "/images/information/1.jpeg",
    },
    {
        id: "2",
        title: Messages.whatIsPirateMobile,
        description:
            "Pirate Mobile digital SIM card is a revolutionary technology that allows you to activate a mobile connection without the need for a physical SIM card. With a simple download and activation process, you can enjoy the benefits of a local mobile network wherever you travel. Say hello to convenience and flexibility like never before.",
        image: "/images/logo/logo.png",
    },
    {
        id: "3",
        title: Messages.keyFeatures,
        description:
            " Global Coverage: Enjoy coverage in over 180 countries, ensuring you're always connected, no matter where your adventures take you. Easy Activation: Activate your digital SIM card with a few simple steps, eliminating the need to visit a physical store or wait for a SIM card to be shipped to you. Dual SIM Support: Seamlessly switch between your digital SIM card and physical SIM card for ultimate convenience and flexibility. Cost-Effective: Say goodbye to expensive international roaming charges. Pirate Mobile digital SIM card offers affordable plans that help you stay connected without breaking the bank. Data Plans: Choose from a range of data plans tailored to your specific needs, whether you're a frequent traveler or an occasional explorer. No Contract Required: Enjoy the freedom of a no-contract commitment. Activate and deactivate your digital SIM card as needed without any long-term obligations.",
        image: "/images/logo/logo.png",
    },
    {
        id: "4",
        title: Messages.howItWorks,
        description:
            "1. Navigate to the Pirate Mobile website. \n 2. Follow the simple setup process to create your Pirate Mobile account. \n 3. Choose your desired data plan and complete the activation process. \n 4. Voila! You're now connected to a local mobile network wherever you are.",
        image: "/images/logo/logo.png",
    },
    {
        id: "5",
        title: Messages.whyChoosePirateMobileEsims,
        description:
            "* Convenience: No more dealing with physical SIM cards, swapping or losing them while on the go. Pirate Mobile digital SIM card provides a hassle-free and convenient solution. \n * Flexibility: Seamlessly switch between your digital SIM card and physical SIM card based on your needs and preferences. \n * Reliability: Count on Pirate Mobile's extensive global network coverage and reliable connections for uninterrupted communication. \n * Cost Savings: Avoid expensive international roaming charges and enjoy affordable data plans tailored to your usage patterns. \n * Peace of Mind: Stay connected to your loved ones, access important information, and navigate with ease, knowing you have reliable connectivity wherever you travel.",
        image: "/images/logo/logo.png",
    },
    // {
    //     id: "6",
    //     title: Messages.testimonials,
    //     description: "",
    //     image: "/images/logo/logo.png",
    // },
    {
        id: "7",
        title: Messages.getStartedToday,
        description:
            "Get started with Pirate Mobile digital SIM card today and experience the freedom of seamless global connectivity. Activate your digital SIM card now and unlock a world of possibilities.",
        image: "/images/logo/logo.png",
    },
    {
        id: "7",
        title: Messages.compatibleDevices,
        link: Path.compatibleDevice().href,
        description:
            "See all the list of compatible device that support digital SIM card",
        image: "/images/logo/logo.png",
    },
];

const InformationPage: React.FC<IInformationPageProps> = ({ id }) => {
    const renderInformationBlocks = () => {
        return (
            <div className="grid grid-flow-row md:grid-flow-row md:grid-cols-12 gap-4 mt-4">
                {BLOCK_INFORMATION.map((block, index) => {
                    return (
                        <BlockInformation
                            key={block?.id}
                            item={block}
                            position={index % 2 === 0 ? "left" : "right"}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <MainStyled className="home-page__container container px-0 bg-transparent z-10 relative text-white ">
            <MobileHeader className="" />
            <div className="h-screen overflow-y-scroll hide-scroll-bar-y">
                <div className="px-3">{renderInformationBlocks()}</div>
                <div className="h-96" />
            </div>
        </MainStyled>
    );
};

export default InformationPage;

const MainStyled = styled.main`
    .information-page__header {
    }
    .home-page__button-search {
        margin-bottom: 5px;
        i {
            font-size: 28px;
        }
        &:active,
        &:hover {
            background-color: transparent !important;
        }
    }
    .home-page__slider-image-wrapper {
        padding-bottom: 67%;
        position: relative;
        .home-page__slider-image {
            position: absolute;
            width: 100%;
            height: auto;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        }
    }
`;
