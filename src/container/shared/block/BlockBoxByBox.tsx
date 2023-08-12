import Path from "@/common/constant/path";
import {
    IBlockBaseProps,
    IBlockComponentBaseProps,
} from "@/common/interface/block";
import ButtonLink from "@/components/button/ButtonLink";
import Icon from "@/components/icon/Icon";
import styled from "@emotion/styled";
// import { Icon } from "d-react-components";
import { map } from "lodash";
import React, { useMemo } from "react";

export interface IBlockBoxByBoxProps
    extends IBlockComponentBaseProps<IBlockBaseProps<IBlockBaseProps<any>>> {}

const BlockBoxByBox: React.FC<IBlockBoxByBoxProps> = ({
    className,
    blockData,
}) => {
    const { title, subTitle, dataSource } = blockData || {};
    return (
        <BlockBoxByBoxStyled className={`${className}`}>
            {title && (
                <div className="flex items-center w-full md:max-w-xl">
                    <div className="bg-gold display-none md:block w-28 h-[2px] max-w-xl mr-4" />
                    <h1 className="title text-white text-nowrap">{title}</h1>
                </div>
            )}
            {subTitle && (
                <h5 className="text-gold-light  sub-title mt-4 mb-4">
                    {subTitle.toUpperCase()}
                </h5>
            )}
            {dataSource?.length && (
                <div className="flex flex-col lg:flex-row  gap-5">
                    {map(dataSource, (item, index) => (
                        <BlockBoxItem key={index} data={item} />
                    ))}
                </div>
            )}
        </BlockBoxByBoxStyled>
    );
};

export default BlockBoxByBox;

const BlockBoxItem: React.FC<any> = ({ className, data }) => {
    const { title, description, icon, showDivider, buttonText, useIconSet } =
        data || {};

    const iconView = useMemo(() => {
        if (typeof icon === "string") {
            return (
                <Icon
                    icon={icon}
                    useIconSet={useIconSet}
                    size={50}
                    className="text-gold block-box-item__icon mb-12"
                />
            );
        }
        if (React.isValidElement(icon)) {
            return icon;
        }
        return null;
    }, [icon]);

    return (
        <BlockBoxItemStyled
            className={`${className} bg-blackTrans p-4 md:p-5 hover:bg-darken hover:border hover:border-gold-light flex-1`}
        >
            {icon && iconView}
            {title && (
                <h2 className="title text-white text-wrap min-h-fit">
                    {title}
                </h2>
            )}
            {showDivider && (
                <div className="bg-gold w-full h-[2px] display-none md:block max-w-[50px] my-4" />
            )}
            {description && (
                <div className="text-white text-lg  sub-title mt-3">
                    {description}
                </div>
            )}
            {buttonText && (
                <ButtonLink
                    href={Path.compatibleDevice().href}
                    className="mt-4 bg-transparent"
                >
                    {buttonText}
                </ButtonLink>
            )}
        </BlockBoxItemStyled>
    );
};

const BlockBoxByBoxStyled = styled.div``;
const BlockBoxItemStyled = styled.div`
    .block-box-item__icon {
        font-size: 60px;
    }
`;
