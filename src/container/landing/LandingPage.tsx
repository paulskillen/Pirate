import styled from "@emotion/styled";
import React from "react";
import BlockBigBanner from "../block/BlockBigBanner";

export interface ILandingPageProps {
    [key: string]: any;
}

const LandingPage: React.FC<ILandingPageProps> = ({ id }) => {
    return (
        <LandingPageStyled className="z-10 relative container">
            <BlockBigBanner />
        </LandingPageStyled>
    );
};

export default LandingPage;

const LandingPageStyled = styled.main`
    position: relative;
   
`;
