import styled from "@emotion/styled";
import React from "react";
import BlockBigBanner from "../block/BlockBigBanner";
import BlockBoxByBox from "../block/BlockBoxByBox";
import Icon from "@/components/icon/Icon";

export interface ILandingPageProps {
    [key: string]: any;
}

const BLOCK_BIG_BANNER = {
    title: "Pirate Mobile provides eSIM data packages to ensure you’re connected everywhere, anytime.",
    subTitle: "SEAMLESS CONNECTIVITY ANYWHERE IN THE WORLD",
    buttonText: "Get your data pack",
};

const BLOCK_BOX_BY_BOX_INTRO = {
    dataSource: [
        {
            id: 1,
            icon: "timer",
            title: "Instant Connectivity",
            showDivider: true,
            description: "Get your eSIM from anywhere at anytime",
        },
        {
            id: 2,
            icon: "public",
            title: "Global Coverage",
            showDivider: true,
            description:
                "Get connected in 178+ countries and regions around the world",
        },
        {
            id: 3,
            icon: "currency_exchange",
            title: "Affordable and Transparent",
            showDivider: true,
            description: "No hidden fees and entirely prepaid",
        },
    ],
};

const BLOCK_BOX_BY_BOX_STEPS = {
    title: "3 SIMPLE STEPS",
    subTitle: "TO ACTIVE YOUR ESIMS",
    dataSource: [
        {
            id: 1,
            icon: "language",
            title: "Choose your destination and package that suits your needs",
            description:
                "Choose the package based on your data needs for a perfect match of data usage and cost-effectiveness.",
        },
        {
            id: 2,
            icon: "phone_iphone",
            title: "Confirm compatibility and click on check out to complete the purchase",
            description: "Not sure if your phone is eSIM compatible?",
            buttonText: "Click here",
        },
        {
            id: 3,
            icon: "qr_code_2",
            title: "Use the QR code provided to install and activate your eSIM",
            description:
                "After successful payment, activate your eSIM by scanning the QR code or check your email for the QR code sent to you.",
        },
    ],
};

const LandingPage: React.FC<ILandingPageProps> = ({ id }) => {
    return (
        <LandingPageStyled className="z-10 relative container">
            <BlockBigBanner blockData={BLOCK_BIG_BANNER} />
            <BlockBoxByBox
                blockData={BLOCK_BOX_BY_BOX_INTRO}
                className="mt-5"
            />
            <BlockBoxByBox
                blockData={BLOCK_BOX_BY_BOX_STEPS}
                className="mt-5"
            />
        </LandingPageStyled>
    );
};

export default LandingPage;

const LandingPageStyled = styled.main`
    position: relative;
    overflow-y: auto !important;
`;
