import { IBlockComponentBaseProps } from "@/common/interface/block";
import styled from "@emotion/styled";
import { map } from "lodash";
import React from "react";

export interface IBlockBoxByBoxProps extends IBlockComponentBaseProps<any> {}

const BlockBoxByBox: React.FC<IBlockBoxByBoxProps> = ({
    className,
    blockData,
}) => {
    const { title, subTitle, dataSource } = blockData || {};
    return (
        <BlockBoxByBoxStyled className={className}>
            {title && (
                <div className="flex items-center w-full md:max-w-xl">
                    <div className="bg-gold display-none md:block w-28 h-[2px] max-w-xl mr-4" />
                    <h1 className="title text-white text-nowrap">{title}</h1>
                </div>
            )}
            {subTitle && (
                <h5 className="text-gold-light  sub-title mt-3">
                    {subTitle.toUpperCase()}
                </h5>
            )}
            {dataSource?.length &&
                map(dataSource, (item, index) => (
                    <BlockBoxItem key={index} data={item} />
                ))}
        </BlockBoxByBoxStyled>
    );
};

export default BlockBoxByBox;

const BlockBoxItem: React.FC<any> = ({ className, data }) => {
    const { title, description, dataSource } = data || {};
    return (
        <BlockBoxByBoxStyled className={className}>
            {title && (
                <div className="flex items-center w-full md:max-w-xl">
                    <div className="bg-gold w-full h-[2px] max-w-xl mr-4" />
                    <h1 className="title text-white text-nowrap">{title}</h1>
                </div>
            )}
            {description && (
                <div className="text-white  sub-title mt-3">{description}</div>
            )}
        </BlockBoxByBoxStyled>
    );
};

const BlockBoxByBoxStyled = styled.div``;
