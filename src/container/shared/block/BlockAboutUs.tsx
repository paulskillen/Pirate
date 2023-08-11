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
    const { title, subTitle, buttonText, description, image } = blockData || {};
    return (
        <BlockAboutUsStyled className={`text-white ${className}`}>
            <div className="flex items-center">
                <div className="bg-gold h-[2px] w-full max-w-[100px]" />
                <h2 className="text-white pl-10 title font-mont">{title}</h2>
            </div>
            {subTitle && (
                <div className="text-gold  sub-title mt-4">{subTitle}</div>
            )}
            {buttonText && (
                <ButtonLink className="mt-5">
                    {buttonText?.toUpperCase?.()}
                </ButtonLink>
            )}
            {(description || image) && (
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center">
                    {image && (
                        <Image
                            alt="about_us"
                            nextImageProps={{ width: 200, height: 200 }}
                            src={image}
                        />
                    )}
                    {description && <p>{description}</p>}
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
