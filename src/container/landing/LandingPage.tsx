import styled from "@emotion/styled";
import React from "react";
import BlockBigBanner from "../shared/block/BlockBigBanner";
import BlockBoxByBox from "../shared/block/BlockBoxByBox";
import Icon from "@/components/icon/Icon";
import BlockAboutUs from "../shared/block/BlockAboutUs";
import BlockLatestNews from "../shared/block/BlockLatestNews";
import MobileHeader from "../shared/header/MobileHeader";
import { BLOCK_ABOUT_LATEST_NEWS, BLOCK_BOX_BY_BOX_STEPS } from "@/common/constant/block";

export interface ILandingPageProps {
    [key: string]: any;
}

const BLOCK_BIG_BANNER = {
    title: "Pirate Mobile provides eSIM data packages to ensure you’re connected everywhere, anytime.",
    subTitle: "SEAMLESS CONNECTIVITY ANYWHERE IN THE WORLD",
    buttonText: "Get your data pack",
    imageDesktop:
        "https://images.unsplash.com/photo-1530160919432-dbafb33e32e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",
};

const BLOCK_BOX_BY_BOX_INTRO = {
    dataSource: [
        {
            id: 1,
            icon: "connection-signal",
            useIconSet: "carbon",
            title: "Instant Connectivity",
            showDivider: true,
            description: "Get your eSIM from anywhere at anytime",
        },
        {
            id: 2,
            icon: "earth-filled",
            useIconSet: "carbon",
            title: "Global Coverage",
            showDivider: true,
            description:
                "Get connected in 178+ countries and regions around the world",
        },
        {
            id: 3,
            icon: "money-symbol",
            useIconSet: "fontisto",
            title: "Affordable and Transparent",
            showDivider: true,
            description: "No hidden fees and entirely prepaid",
        },
    ],
};

const BLOCK_ABOUT_US = {
    title: "About.",
    imageDesktop:
        "https://rhq6db.n3cdn1.secureserver.net/wp-content/uploads/2023/07/carol-magalhaes-dSsXm15D9hg-unsplash-scaled-e1690453708887.jpg",
    subTitle:
        "Pirate Mobile provides eSIM data packages to ensure wherever you go, you are always connected.",
    description:
        "<div>We are an international team of telecommunications professionals and digital experience experts spanning Thailand, Vietnam, Dubai, the United Kingdom, Spain and the US.\n</div><div class='my-3'>Like you, we travel – for business and fun – and we know how important it is to stay connected while away from home. We’ve leveraged the latest technology to take the headache out of global connectivity, eliminating data roaming fees and awkward SIM swap outs. With Pirate Mobile you simply select your destination and the package that’s best for you. We’ll provide you a QR code to install and activate your eSIM data package.</div>And if something goes wrong, please contact us. We want your experience with us to be as seamless as the connectivity we provide!",
};

const LandingPage: React.FC<ILandingPageProps> = ({ id }) => {
    return (
        <LandingPageStyled className="z-10 relative">
            <MobileHeader />
            <BlockBigBanner
                className="mt-3 md:mt-5 container"
                blockData={BLOCK_BIG_BANNER}
            />
            <BlockBoxByBox
                blockData={BLOCK_BOX_BY_BOX_INTRO}
                className="mt-5 container"
            />
            <BlockBoxByBox
                blockData={BLOCK_BOX_BY_BOX_STEPS}
                className="mt-5 container"
            />
            <BlockAboutUs
                blockData={BLOCK_ABOUT_US}
                className="mt-5 container"
            />
            <BlockLatestNews
                blockData={BLOCK_ABOUT_LATEST_NEWS}
                className="py-20 px-3"
            />
        </LandingPageStyled>
    );
};

export default LandingPage;

const LandingPageStyled = styled.main`
    position: relative;
    overflow-y: auto !important;
`;
