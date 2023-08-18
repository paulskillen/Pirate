import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "@emotion/styled";
import { COLOR_GOLD } from "@/common/constant/app-style";

export interface IBlockSwiperSlideProps {
    children?: any;
    className?: string;
    label?: string;
    swiperProps?: SwiperProps;
}

const BlockSwiperSlide: React.FC<IBlockSwiperSlideProps> = ({
    children,
    swiperProps = {},
    className,
    label,
}) => {
    return (
        <BlockSwiperSlideStyled className={className}>
            {label && <h5 className="">{label}</h5>}
            <Swiper
                loop
                spaceBetween={20}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                speed={3000}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                modules={[Autoplay, Pagination, Navigation]}
                {...swiperProps}
            >
                {/* {HOME_PAGE_COVERS.map((item) => {
                    return (
                        <SwiperSlide key={item?.id}>
                            <div className="home-page__slider-image-wrapper rounded-2xl">
                                <Image
                                    alt="slider-homepage"
                                    src={item?.src}
                                    className="home-page__slider-image rounded-2xl"
                                    fill
                                />
                            </div>
                        </SwiperSlide>
                    );
                })} */}
                {children}
            </Swiper>
        </BlockSwiperSlideStyled>
    );
};

export default BlockSwiperSlide;

const BlockSwiperSlideStyled = styled.div`
    .home-page__slider-image-wrapper {
        position: relative;
        padding-bottom: 80%;
        .home-page__slider-image {
            position: absolute;
            width: 100%;
            height: auto;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            object-fit: cover !important;
        }
        @media (min-width: 576px) {
            width: 100%;
            padding-bottom: 60%;
            .home-page__slider-image {
                object-fit: fill !important;
            }
        }
    }
    .swiper-pagination-bullets {
        .swiper-pagination-bullet {
            background-color: ${COLOR_GOLD};
        }
        bottom: 2px;
        text-align: end;
    }
`;
