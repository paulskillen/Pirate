import {
    IBlockBaseProps,
    IBlockComponentBaseProps,
} from "@/common/interface/block";
import ButtonLink from "@/components/button/ButtonLink";
import Image from "@/components/image/Image";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { map } from "lodash";
import React from "react";

export interface IBlockLatestNewsProps
    extends IBlockComponentBaseProps<IBlockBaseProps<any>> {
    [key: string]: any;
}

const BlockLatestNews: React.FC<IBlockLatestNewsProps> = ({
    className,
    blockData,
}) => {
    const {
        title,
        subTitle,
        buttonText,
        description,
        imageDesktop,
        dataSource,
    } = blockData || {};
    return (
        <BlockLatestNewsStyled className={`${className}`}>
            <h2 className="text-white block-title font-mont text-center">
                {title}
            </h2>
            {subTitle && (
                <div className="text-gold  block-sub-title mt-2 text-center">
                    {subTitle?.toUpperCase?.()}
                </div>
            )}
            {dataSource?.length && (
                <div
                    className="grid grid-flow-row md:grid-flow-col md:grid-cols-6 lg:grid-cols-12 mt-5 gap-5"
                >
                    {map(dataSource, (item, index) => {
                        return <NewsItem className="md:col-span-3" data={item} />;
                    })}
                </div>
            )}
        </BlockLatestNewsStyled>
    );
};

export default BlockLatestNews;

const NewsItem: React.FC<any> = ({ className, data }) => {
    const { title, description, icon, image, showDivider, buttonText, link } =
        data || {};

    return (
        <NewsItemStyled
            className={`bg-blackTrans  border-[0.5px] border-gray-700 hover:bg-darken hover:border hover:border-gold-light ${className}`}
        >
            {image && (
                <div className="relative pb-[100%]">
                    <Image
                        alt="news_image"
                        className="absolute top-0 bottom-0 right-0 left-0 w-full h-full"
                        src={image}
                        nextImageProps={{ width: 200, height: 200 }}
                    />
                </div>
            )}
            <div className="p-4 lg:p-5 flex flex-col">
                {title && (
                    <h4 className="text-white text-wrap min-h-fit h-[100px] overflow-hidden break-all text-ellipsis">{title}</h4>
                )}
                {description && (
                    <div className="text-white text-lg  sub-title mt-3 h-[100px] overflow-hidden text-ellipsis">
                        {description}
                    </div>
                )}
                <ButtonLink
                    href={link}
                    target="_blank"
                    className="mt-4 bg-transparent w-full"
                >
                    {Messages.readMore}
                </ButtonLink>
            </div>
        </NewsItemStyled>
    );
};

const BlockLatestNewsStyled = styled.div``;
const NewsItemStyled = styled.div``;
