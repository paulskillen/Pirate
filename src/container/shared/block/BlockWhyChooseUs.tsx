import {
    IBlockBaseProps,
    IBlockComponentBaseProps,
} from "@/common/interface/block";
import Image from "@/components/image/Image";
import styled from "@emotion/styled";
import { map } from "lodash";
import React from "react";

export interface IBlockWhyChooseUsProp
    extends IBlockComponentBaseProps<IBlockBaseProps<any>> {
    [key: string]: any;
}

const BlockWhyChooseUs: React.FC<IBlockWhyChooseUsProp> = ({
    className,
    blockData,
}) => {
    const { title, subTitle, dataSource } = blockData || {};
    return (
        <BlockWhyChooseUsStyled className={`text-white  ${className}`}>
            {title && (
                <h2 className="text-white text-center text-xl md:text-3xl">
                    {title}
                </h2>
            )}
            {subTitle && (
                <h4 className="text-white mt-2 text-center text-lg md:text-2xl">
                    {subTitle}
                </h4>
            )}
            <div className="grid grid-flow-row grid-cols-12 gap-5 md:gap-6 mt-4">
                {map(dataSource, (item, index) => {
                    return (
                        <BlockWhyChooseUsItem
                            key={`${item?.id}_${index}`}
                            data={item}
                        />
                    );
                })}
            </div>
        </BlockWhyChooseUsStyled>
    );
};

export default BlockWhyChooseUs;

const BlockWhyChooseUsItem: React.FC<any> = ({ className, data }) => {
    const { image, title, subTitle } = data;

    return (
        <BlockWhyChooseUsItemStyled
            className={`col-span-6 lg:col-span-3 pb-[120%] md:pb-[100%] rounded-2xl relative ${className}`}
        >
            {title && (
                <h4 className="text-white z-20 relative text-center mt-4">
                    {title}
                </h4>
            )}
            <Image
                useNextImg={false}
                className="absolute w-full h-full top-0 bottom-0 left-0 right-0 rounded-2xl"
                alt="pirate-mobile-why-choose-us"
                src={image}
                style={{ objectFit: "cover" }}
            />
        </BlockWhyChooseUsItemStyled>
    );
};

const BlockWhyChooseUsStyled = styled.div``;
const BlockWhyChooseUsItemStyled = styled.div`
    &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        opacity: 0.5;
        height: 100px;
        background-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.91),
            rgba(255, 255, 255, 0)
        );
    }
`;
