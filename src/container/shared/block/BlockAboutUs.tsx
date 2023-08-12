import {
    IBlockBaseProps,
    IBlockComponentBaseProps,
} from "@/common/interface/block";
import ButtonLink from "@/components/button/ButtonLink";
import Image from "@/components/image/Image";
import styled from "@emotion/styled";
import React from "react";

export interface IBlockAboutUsProps
    extends IBlockComponentBaseProps<IBlockBaseProps<any>> {}

const BlockAboutUs: React.FC<IBlockAboutUsProps> = ({
    blockData,
    className,
}) => {
    const { title, subTitle, buttonText, description, imageDesktop } =
        blockData || {};

    return (
        <BlockAboutUsStyled className={`text-white ${className}`}>
            <div className="flex items-center">
                <div className="bg-gold h-[2px] w-full max-w-[100px] display-none md:block pr-10" />
                <h2 className="text-white title font-mont">{title}</h2>
            </div>
            {subTitle && (
                <div className="text-gold  sub-title mt-4">{subTitle}</div>
            )}
            {buttonText && (
                <ButtonLink className="mt-5">
                    {buttonText?.toUpperCase?.()}
                </ButtonLink>
            )}
            {(description || imageDesktop) && (
                <div className="mt-4 md:grid grid-flow-row grid-cols-12 items-center">
                    {imageDesktop && (
                        <div className="relative block-about-us__img-wrapper col-span-4 pb-[100%]">
                            <Image
                                useNextImg={false}
                                alt="about_us"
                                className="block-about-us__img-wrapper absolute w-full h-full"
                                // nextImageProps={{ width: 200, height: 200 }}
                                src={imageDesktop}
                            />
                        </div>
                    )}
                    {description && (
                        <p
                            className="col-span-8 py-3 md:pl-5 md:py-4"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    )}
                </div>
            )}
        </BlockAboutUsStyled>
    );
};

export default BlockAboutUs;

const BlockAboutUsStyled = styled.div`
    .title {
        font-size: 40px !important;
        font-weight: 700;
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
