import styled from "@emotion/styled";
import React from "react";
import BlockBigBanner from "../shared/block/BlockBigBanner";
import BlockBoxByBox from "../shared/block/BlockBoxByBox";
import Icon from "@/components/icon/Icon";
import BlockAboutUs from "../shared/block/BlockAboutUs";

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

const BLOCK_ABOUT_US = {
    title: "About.",
    subTitle:
        "Pirate Mobile provides eSIM data packages to ensure wherever you go, you are always connected.",
    description:
        "We are an international team of telecommunications professionals and digital experience experts spanning Thailand, Vietnam, Dubai, the United Kingdom, Spain and the US. Like you, we travel – for business and fun – and we know how important it is to stay connected while away from home. We’ve leveraged the latest technology to take the headache out of global connectivity, eliminating data roaming fees and awkward SIM swap outs. With Pirate Mobile you simply select your destination and the package that’s best for you. We’ll provide you a QR code to install and activate your eSIM data package. And if something goes wrong, please contact us. We want your experience with us to be as seamless as the connectivity we provide!",
};

const LandingPage: React.FC<ILandingPageProps> = ({ id }) => {
    return (
        <LandingPageStyled className="z-10 relative container">
            <BlockBigBanner className="mt-5" blockData={BLOCK_BIG_BANNER} />
            <BlockBoxByBox
                blockData={BLOCK_BOX_BY_BOX_INTRO}
                className="mt-5"
            />
            <BlockBoxByBox
                blockData={BLOCK_BOX_BY_BOX_STEPS}
                className="mt-5"
            />
            <BlockAboutUs blockData={BLOCK_ABOUT_US} className="mt-5" />
        </LandingPageStyled>
    );
};

export default LandingPage;

const LandingPageStyled = styled.main`
    position: relative;
    overflow-y: auto !important;
`;
