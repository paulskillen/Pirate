import Path from "@/common/constant/path";
import {
    IBlockBaseProps,
    IBlockComponentBaseProps,
} from "@/common/interface/block";
import { IBlog } from "@/common/interface/blog";
import ButtonLink from "@/components/button/ButtonLink";
import SlickSlider from "@/components/slider/SlickSlider";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { map } from "lodash";
import React from "react";
import { Settings } from "react-slick";

export interface IBlockLatestNewsProps
    extends IBlockComponentBaseProps<IBlockBaseProps<any>> {
    [key: string]: any;
}

const settings: Settings = {
    dots: true,
    speed: 500,
    autoplay: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    infinite: true,
    variableWidth: false,
    responsive: [
        {
            breakpoint: 576,
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
    const { dataSource } = blockData || {};
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
                <SlickSlider
                    // ref={stickRef}
                    className="mt-4"
                    key="hotspot-slider"
                    setting={settings}
                >
                    {map(dataSource, (item, index) => {
                        return (
                            <NewsItem
                                data={item}
                                key={`${item?.id}_${index}`}
                            />
                        );
                    })}
                </SlickSlider>
            )}
            <div className="w-100 flex justify-center items-center">
                <ButtonLink
                    className="rounded-full h-[60px] px-[30px] mt-5"
                    href={Path.blogs().href}
                >
                    {Messages.allBlogs}
                </ButtonLink>
            </div>
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
                            className="text-white text-nowrap min-h-fit overflow-hidden break-all text-ellipsis"
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
                @media (max-width: 576px) {
                    display: flex;
                    gap: 4px;
                }
            }
        }
        .slick-slide {
        }
    }
`;
const NewsItemStyled = styled.div`
    .button-link {
        display: none;
    }
    &:hover {
        .button-link {
            display: block;
        }
    }
`;
