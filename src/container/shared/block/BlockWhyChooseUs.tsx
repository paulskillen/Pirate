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
                <h4 className="text-white mt-1 text-center text-lg md:text-2xl">
                    {subTitle}
                </h4>
            )}
            <div className="grid grid-flow-row grid-cols-12 gap-5 md:gap-6 mt-3">
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
        <BlockWhyChooseUsItemStyled className={`col-span-6 lg:col-span-3 pb-[120%] md:pb-[100%] bg-yellow-200 rounded-2xl relative ${className}`}>
            <Image
                useNextImg={false}
                className="absolute w-full h-full top-0 bottom-0 left-0 right-0 rounded-2xl"
                alt="pirate-mobile-why-choose-us"
                src={image}
            />
        </BlockWhyChooseUsItemStyled>
    );
};

const BlockWhyChooseUsStyled = styled.div``;
const BlockWhyChooseUsItemStyled = styled.div``;
