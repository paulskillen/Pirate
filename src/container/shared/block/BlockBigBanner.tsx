import {
    IBlockBaseProps,
    IBlockComponentBaseProps,
} from "@/common/interface/block";
import ButtonLink from "@/components/button/ButtonLink";
import styled from "@emotion/styled";
import React from "react";

export interface IBlockBigBannerProps
    extends IBlockComponentBaseProps<IBlockBaseProps<any>> {}

const BlockBigBanner: React.FC<IBlockBigBannerProps> = ({
    blockData,
    className,
}) => {
    const { title, subTitle, buttonText } = blockData || {};
    return (
        <BlockBigBannerStyled
            className={`text-white flex flex-col justify-center md:pr-10 md:pl-5 md:h-[650px] ${className}`}
            {...blockData}
        >
            {subTitle && (
                <h5 className="text-gold-light  sub-title z-10">
                    {subTitle.toUpperCase()}
                </h5>
            )}
            <h1 className="text-white pr-10 mt-4 title font-mont z-10">
                {title}
            </h1>
            {buttonText && (
                <ButtonLink className="mt-5 z-10">
                    {buttonText?.toUpperCase?.()}
                </ButtonLink>
            )}
            {/* <div className="over-lay_glass" /> */}
        </BlockBigBannerStyled>
    );
};

export default BlockBigBanner;

const BlockBigBannerStyled = styled.div`
    position: relative;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.023);
        box-shadow: inset 0 0 2000px rgba(5, 5, 5, 0.705);
        filter: blur(5px);
        background: inherit;
        z-index: 0;
        ${(props: IBlockBaseProps<any>) => {
            const { imageDesktop, imageMobile } = props || {};
            if (imageDesktop) {
                return {
                    backgroundImage: `url(${imageMobile || imageDesktop})`,
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100vw",
                    filter: "blur(3px)",
                };
            }
            return {};
        }}
        @meida (min-width: 768px) {
            ${(props: IBlockBaseProps<any>) => {
                const { imageDesktop } = props || {};
                if (imageDesktop) {
                    return {
                        backgroundImage: `url(${imageDesktop})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100vw",
                        filter: "blur(3px)",
                    };
                }
                return {};
            }}
        }
    }

    .title {
        font-size: 80px !important;
        font-weight: 700;
        line-height: 1.1em;
        @media (max-width: 1024px) {
            font-size: 65px !important;
            font-weight: 700;
            line-height: 1.1em;
        }
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

    .over-lay_glass {
        &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
            box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
            filter: blur(5px);
            background: inherit;
            z-index: 1;
        }
    }
`;
