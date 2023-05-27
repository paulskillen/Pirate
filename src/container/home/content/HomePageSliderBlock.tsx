import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "@emotion/styled";
import { Button } from "d-react-components";

export interface IHomePageSliderBlockProps {
    [key: string]: any;
}

const HOME_PAGE_COVERS = [
    {
        id: "1",
        label: "High",
        src: "/images/home-page-cover.jpeg",
    },
    {
        id: "3",
        label: "Low",
        src: "/images/home-page-cover-1.jpg",
    },
    {
        id: "4",
        label: "Low",
        src: "/images/home-page-cover-2.png",
    },
];

const HomePageSliderBlock: React.FC<IHomePageSliderBlockProps> = ({ id }) => {
    return (
        <HomePageSliderBlockStyled>
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
            >
                {HOME_PAGE_COVERS.map((item) => {
                    return (
                        <SwiperSlide key={item?.id}>
                            <div className="home-page__slider-image-wrapper rounded-2xl">
                                <Image
                                    alt="slider-homepage"
                                    src={item?.src}
                                    className="home-page__slider-image rounded-2xl"
                                    layout="fill"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </HomePageSliderBlockStyled>
    );
};

export default HomePageSliderBlock;

const HomePageSliderBlockStyled = styled.div`
    .home-page__slider-image-wrapper {
        position: relative;
        padding-bottom: 56.25%;
        .home-page__slider-image {
            position: absolute;
            width: 100%;
            height: auto;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        }
    }
`;
