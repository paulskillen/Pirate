import { IBlockComponentBaseProps } from "@/common/interface/block";
import ButtonLink from "@/components/button/ButtonLink";
import styled from "@emotion/styled";
import React from "react";

export interface IBlockBigBannerProps extends IBlockComponentBaseProps<any> {}

const BlockBigBanner: React.FC<IBlockBigBannerProps> = ({
    blockData,
    className,
}) => {
    const { title, subTitle, buttonText } = blockData || {};
    return (
        <BlockBigBannerStyled className="text-white">
            {subTitle && (
                <h5 className="text-gold-light  sub-title">
                    {subTitle.toUpperCase()}
                </h5>
            )}
            <h1 className="text-white pr-10 mt-4 title">{title}</h1>
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
        font-weight: 500;
        font-size: 16px !important;
    }
`;
