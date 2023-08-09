import ButtonLink from "@/components/button/ButtonLink";
import styled from "@emotion/styled";
import React from "react";

export interface IBlockBigBannerProps {
    [key: string]: any;
}

const BlockBigBanner: React.FC<IBlockBigBannerProps> = ({ blockData }) => {
    const {
        title = "Pirate Mobile provides eSIM data packages to ensure you’re connected everywhere, anytime.",
        subTitle = "SEAMLESS CONNECTIVITY ANYWHERE IN THE WORLD",
        buttonText = "Get your data pack",
    } = blockData || {};
    return (
        <BlockBigBannerStyled className="text-white" >
            {subTitle && (
                <h5 className="text-gold  mb-5 sub-title">
                    {subTitle.toUpperCase()}
                </h5>
            )}
            <h1 className="text-white pr-10 mt-5 title">{title}</h1>
            {buttonText && (
                <ButtonLink className="mt-5">
                    {buttonText?.toUpperCase?.()}
                </ButtonLink>
            )}
        </BlockBigBannerStyled>
    );
};

export default BlockBigBanner;

const BlockBigBannerStyled = styled.div`
    .title {
        font-size: 80px !important;
        font-weight: 500;
        line-height: 1.1em;
        @media (max-width: 768px) {
            font-size: 34px !important;
            font-weight: 500;
            line-height: 1.1em;
        }
    }
    .sub-title {
        font-weight: 300;
    }
`;
