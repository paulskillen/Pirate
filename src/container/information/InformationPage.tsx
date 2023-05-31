/* eslint-disable react/no-unescaped-entities */
import Path from "@/common/constant/path";
import ViewShowMore from "@/components/view/ViewShowMore";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { Button } from "d-react-components";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import BlockInformation from "../shared/block/BlockInformation";
import BlockSwiperSlide from "../shared/block/BlockSwiperSlide";

export interface IInformationPageProps {
    [key: string]: any;
}

const BLOCK_INFORMATION = [
    {
        id: "1",
        title: Messages.introduction,
        description:
            "At Pirate Mobile, we understand the importance of staying connected wherever you go. Introducing Pirate Mobile eSim, your passport to hassle-free global connectivity. Say goodbye to physical SIM cards and unlock a world of seamless communication and data access right from your device.",
        image: "/images/logo/logo.png",
    },
    {
        id: "2",
        title: Messages.whatIsPirateMobile,
        description:
            "Pirate Mobile eSim is a revolutionary technology that allows you to activate a mobile connection without the need for a physical SIM card. With a simple download and activation process, you can enjoy the benefits of a local mobile network wherever you travel. Say hello to convenience and flexibility like never before.",
        image: "/images/logo/logo.png",
    },
    {
        id: "3",
        title: Messages.keyFeatures,
        description:
            " Global Coverage: Enjoy coverage in over 180 countries, ensuring you're always connected, no matter where your adventures take you. Easy Activation: Activate your eSim with a few simple steps, eliminating the need to visit a physical store or wait for a SIM card to be shipped to you. Dual SIM Support: Seamlessly switch between your eSim and physical SIM card for ultimate convenience and flexibility. Cost-Effective: Say goodbye to expensive international roaming charges. Pirate Mobile eSim offers affordable plans that help you stay connected without breaking the bank. Data Plans: Choose from a range of data plans tailored to your specific needs, whether you're a frequent traveler or an occasional explorer. No Contract Required: Enjoy the freedom of a no-contract commitment. Activate and deactivate your eSim as needed without any long-term obligations.",
        image: "/images/logo/logo.png",
    },
];

const InformationPage: React.FC<IInformationPageProps> = ({ id }) => {
    const router = useRouter();

    const renderHeader = () => {
        return (
            <section className="flex flex-row justify-between items-center mt-2">
                <div className="flex-center-y py-4">
                    <Image
                        alt="logo"
                        src="/images/logo/logo.png"
                        // layout="fill"
                        style={{ objectFit: "cover" }}
                        width={50}
                        height={50}
                    />
                    <div className="text-white  font-semibold ml-3">
                        Pirate <span className="text-gold">Mobile</span>
                    </div>
                </div>
                {/* <div className="flex-center-y ">
                    <div className="mr-3 hover:cursor-pointer p-0 m-0">
                        <Icon
                            id="installApp"
                            name="cloud_download"
                            className="text-gold "
                            size="x-large"
                        />
                    </div>
                </div> */}
                <div className="flex-center-y w-">
                    {/* <div className="text-xl text-gold font-semibold w-100 text-end mb-2">
                        {Messages.selectDestination}
                    </div> */}
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
                </div>
            </section>
        );
    };

    const renderInformationBlocks = () => {
        return (
            <Fragment>
                {BLOCK_INFORMATION.map((block, index) => {
                    return (
                        <BlockInformation
                            key={block?.id}
                            item={block}
                            position={index % 2 === 0 ? "left" : "right"}
                        />
                    );
                })}
            </Fragment>
        );
    };

    return (
        <MainStyled className="home-page__container bg-transparent z-10 relative text-white ">
            {renderHeader()}
            <div className="h-screen overflow-y-scroll hide-scroll-bar-y">
                <BlockSwiperSlide />
                <div className="px-3">{renderInformationBlocks()}</div>

                <div className="h-96" />
                <div className="h-96" />
            </div>
        </MainStyled>
    );
};

export default InformationPage;

const MainStyled = styled.main`
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
