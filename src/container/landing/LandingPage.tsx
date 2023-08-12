import styled from "@emotion/styled";
import React from "react";
import BlockBigBanner from "../shared/block/BlockBigBanner";
import BlockBoxByBox from "../shared/block/BlockBoxByBox";
import Icon from "@/components/icon/Icon";
import BlockAboutUs from "../shared/block/BlockAboutUs";
import BlockLatestNews from "../shared/block/BlockLatestNews";

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

const BLOCK_BOX_BY_BOX_STEPS = {
    title: "3 SIMPLE STEPS",
    subTitle: "TO ACTIVE YOUR ESIMS",
    dataSource: [
        {
            id: 1,
            icon: "world-o",
            useIconSet: "fontisto",
            title: "Choose your destination and package that suits your needs",
            description:
                "Choose the package based on your data needs for a perfect match of data usage and cost-effectiveness.",
        },
        {
            id: 2,
            icon: "phone",
            title: "Confirm compatibility and click on check out to complete the purchase",
            description: "Not sure if your phone is eSIM compatible?",
            buttonText: "Click here",
        },
        {
            id: 3,
            icon: "qr-code-scan",
            title: "Use the QR code provided to install and activate your eSIM",
            description:
                "After successful payment, activate your eSIM by scanning the QR code or check your email for the QR code sent to you.",
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

const BLOCK_ABOUT_LATEST_NEWS = {
    title: "Latest News.",
    subTitle: "Check out some of our news",
    dataSource: [
        {
            id: 1,
            link: "https://rhq.6db.myftpupload.com/2023/07/unlocking-your-adventure-monetizing-your-social-media-influence-with-pirate-mobile/",
            title: "Unlocking Your Adventure: Monetizing Your Social Media Influence with Pirate Mobile",
            description:
                "Are you an adventure enthusiast with a growing social media following? Are you constantly exploring new travel destinations and capturing breathtaking moments to share with your audience? If so, you have an incredible opportunity to turn your passion for adventure and travel into a lucrative income stream by becoming a Pirate Mobile affiliate! The Power of Social Media Influencers In the age of digital connectivity, social media influencers have become the new storytellers, ins",
            image: "https://rhq6db.n3cdn1.secureserver.net/wp-content/uploads/2023/07/windows-YzLMmxDTrvI-unsplash-768x512.jpg",
        },
        {
            id: 2,
            link: "https://rhq.6db.myftpupload.com/2023/07/disrupting-the-mobile-roaming-market-with-esims/",
            title: "Disrupting the Mobile Roaming Market with eSims",
            description:
                "🚀 Pirate Mobile: Disrupting the Mobile Roaming Market with eSims Ahoy, community! As the Director of Pirate Mobile, I'm thrilled to share some exciting news with you. This week, we are celebrating a remarkable milestone—the record-breaking sales to travelers attending",
            buttonText: "Click here",
            image: "https://rhq6db.n3cdn1.secureserver.net/wp-content/uploads/2023/07/jessey-bijl-5Rt5KhbUp5g-unsplash-768x512.jpg",
        },
    ],
};

const LandingPage: React.FC<ILandingPageProps> = ({ id }) => {
    return (
        <LandingPageStyled className="z-10 relative">
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
