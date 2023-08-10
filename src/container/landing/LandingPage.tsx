import styled from "@emotion/styled";
import React from "react";
import BlockBigBanner from "../block/BlockBigBanner";
import BlockBoxByBox from "../block/BlockBoxByBox";

export interface ILandingPageProps {
    [key: string]: any;
}

const BLOCK_BIG_BANNER = {
    title: "Pirate Mobile provides eSIM data packages to ensure you’re connected everywhere, anytime.",
    subTitle: "SEAMLESS CONNECTIVITY ANYWHERE IN THE WORLD",
    buttonText: "Get your data pack",
};

const BLOCK_BOX_BY_BOX_INTRO = {
    buttonText: "Get your data pack",
    dataSource: [
        {
            id: 1,
        },
    ],
};

const BLOCK_BOX_BY_BOX_STEPS = {
    title: "3 SIMPLE STEPS",
    subTitle: "TO ACTIVE YOUR ESIMS",
    buttonText: "Get your data pack",
};

const LandingPage: React.FC<ILandingPageProps> = ({ id }) => {
    return (
        <LandingPageStyled className="z-10 relative container">
            <BlockBigBanner blockData={BLOCK_BIG_BANNER} />
            <BlockBoxByBox blockData={BLOCK_BOX_BY_BOX_INTRO} />
            <BlockBoxByBox blockData={BLOCK_BOX_BY_BOX_STEPS} />
        </LandingPageStyled>
    );
};

export default LandingPage;

const LandingPageStyled = styled.main`
    position: relative;
`;
