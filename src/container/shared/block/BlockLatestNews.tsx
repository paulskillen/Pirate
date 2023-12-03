import {
    IBlockBaseProps,
    IBlockComponentBaseProps,
} from "@/common/interface/block";
import ButtonLink from "@/components/button/ButtonLink";
import Slick, { Settings } from "react-slick";
import Image from "@/components/image/Image";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { map } from "lodash";
import React, { useRef } from "react";
import Icon from "@/components/icon/Icon";
import Path from "@/common/constant/path";
import { IBlog } from "@/common/interface/blog";

export interface IBlockLatestNewsProps
    extends IBlockComponentBaseProps<IBlockBaseProps<any>> {
    [key: string]: any;
}

const SamplePrevArrow = (props: any) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="block-header__arrow block-header__arrow-left"
            type="button"
        >
            <Icon icon="arrow-left-circle" useIconSet="bootstrap" />
        </button>
    );
};

export const SampleNextArrow = (props: any) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="block-header__arrow block-header__arrow-right"
            type="button"
        >
            <Icon icon="arrow-right-circle" useIconSet="bootstrap" />
        </button>
    );
};

const settings: Settings = {
    dots: true,
    speed: 500,
    autoplay: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    infinite: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    lazyLoad: "ondemand",
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 479,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
    ],
};

const BlockLatestNews: React.FC<IBlockLatestNewsProps> = ({
    className,
    blockData,
}) => {
    const title = "Latest News";
    const subTitle = "Check out some of our news";
    const stickRef = useRef<Slick>(null);
    const { buttonText, description, imageDesktop, dataSource } =
        blockData || {};
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
                <Slick
                    {...settings}
                    ref={stickRef}
                    className="mt-4"
                    key="hotspot-slider"
                >
                    {map(dataSource, (item, index) => {
                        return (
                            <NewsItem
                                data={item}
                                key={`${item?.id}_${index}`}
                            />
                        );
                    })}
                </Slick>
            )}
        </BlockLatestNewsStyled>
    );
};

export default BlockLatestNews;

const NewsItem: React.FC<any> = ({ className, data }) => {
    const { title, shortDesc, thumbnail, cover } = (data as IBlog) || {};

    return (
        <NewsItemStyled
            className={`bg-blackTrans  border-[0.5px] border-gray-700 hover:bg-darken hover:border hover:border-gold-light ${className}`}
        >
            {thumbnail && (
                <div className="relative pb-[100%]">
                    <img
                        alt="news_image"
                        className="absolute top-0 bottom-0 right-0 left-0 w-full h-full"
                        src={thumbnail}
                    />
                </div>
            )}
            <div className="p-4 lg:p-5 flex flex-col h-[250px] relative">
                <div className="flex-1">
                    {title && (
                        <h4
                            className="text-white text-wrap min-h-fit overflow-hidden break-all text-ellipsis"
                            style={{}}
                        >
                            {title}
                        </h4>
                    )}
                    {shortDesc && (
                        <div
                            className="text-white text-lg   overflow-hidden text-ellipsis max-h-[100px]"
                            dangerouslySetInnerHTML={{ __html: shortDesc }}
                        />
                    )}
                </div>

                <ButtonLink
                    href={Path.blogDetail(data).as as any}
                    target="_blank"
                    className="mt-4 bg-transparent w-full"
                >
                    {Messages.readMore}
                </ButtonLink>
            </div>
        </NewsItemStyled>
    );
};

const BlockLatestNewsStyled = styled.div`
    .slick-slider {
        position: relative;
        .slick-list {
            .slick-track {
                display: flex;
                gap: 8px;
            }
        }
        .slick-slide {
        }
        .block-header__arrow {
            position: absolute;
            z-index: 10;
        }
        .block-header__arrow-left {
            left: 0;
            top: 0%;
            opacity: 100% !important;
        }
        .block-header__arrow-right {
            right: 0;
            top: 0%;
            opacity: 100% !important;
        }
    }
`;
const NewsItemStyled = styled.div``;
