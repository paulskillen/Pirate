/* eslint-disable react/no-unescaped-entities */
// @ts-ignore
import Path from "@/common/constant/path";
import { AppStateContext } from "@/common/context/app/app-context";
import { CountryRegion } from "@/common/interface/location";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { Button } from "d-react-components";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo } from "react";
import SelectCountry from "../shared/input/SelectCountry";
import {
    IDS_OPEN_SELECT_COUNTRY,
    POPULAR_COUNTRIES,
} from "@/common/constant/app";
import DesktopHeader from "../shared/header/DesktopHeader";
import BlockPopularCountries from "../shared/block/BlockPopularCountries";
import { filter, map } from "lodash";
import BlockSwiperSlide from "../shared/block/BlockSwiperSlide";
import { SwiperSlide } from "swiper/react";
import Image from "@/components/image/Image";
import BlockWhyChooseUs from "../shared/block/BlockWhyChooseUs";
import {
    BLOCK_ABOUT_LATEST_NEWS,
    BLOCK_BOX_BY_BOX_STEPS,
    BLOCK_WHY_CHOOSE_US,
} from "@/common/constant/block";
import BlockLatestNews from "../shared/block/BlockLatestNews";
import BlockBoxByBox from "../shared/block/BlockBoxByBox";

export interface IHomePageProps {
    [key: string]: any;
}

const HOME_PAGE_DISPLAY_REGIONS = [
    CountryRegion.Europe,
    CountryRegion.Asia,
    CountryRegion.South_America,
    CountryRegion.North_America,
    CountryRegion.Middle_East,
];

const HOME_PAGE_COVERS = [
    {
        id: "1",
        title: "High",
        src: "/images/information/cover_1.jpeg",
    },
    {
        id: "3",
        title: "Join our affiliate program to get passive income !",
        subTitle: "Up to 20% commission !",
        src: "/images/information/cover_2.png",
        buttonText: "Click here",
    },
    {
        id: "4",
        title: "Low",
        src: "/images/information/cover_3.png",
    },
];

const HomePage: React.FC<IHomePageProps> = ({ id }) => {
    const router = useRouter();
    const { metaData, setOpenSelectCountry } = useContext(AppStateContext);
    const { countryList } = metaData || {};

    useEffect(() => {
        function handleOnClick(e: any) {
            const eventTargetId: any = e?.target?.id;
            if (!IDS_OPEN_SELECT_COUNTRY.includes(eventTargetId)) {
                setOpenSelectCountry(false);
                return e;
            }
        }
        document.addEventListener("click", handleOnClick as any);
        return () =>
            document.removeEventListener("click", handleOnClick as any);
    }, []);

    const renderHeader = () => {
        return (
            <section
                className="flex flex-row justify-between items-center mt-2"
                onClick={() => {
                    router.push({ pathname: Path.listCountry().href });
                }}
            >
                <div className="flex-center-y py-4">
                    <div className="text-gold  h4  font-semibold ml-3">
                        {Messages.selectDestination}
                    </div>
                </div>
                <div className="flex-center-y w-">
                    <Button
                        iconName="search"
                        className="rounded px-0 home-page__button-search ml-3"
                        classNameIcon="text-gold"
                        size="large"
                        variant="trans"
                    />
                </div>
            </section>
        );
    };

    const renderNewHeader = () => {
        return <SelectCountry />;
    };

    const renderGrids = () => {
        return (
            <div className="h-screen grid grid-flow-row grid-rows-5 gap-x-4 gap-y-1 bg-slate-500">
                {/* {renderBlocks()} */}
                <div className="bg-red-400 col-span-2 grid grid-flow-row gap-y-3 gap-x-3">
                    <div className="bg-yellow-400 col-span-4 text-center my-auto mx-auto">
                        Grid Item Inside
                    </div>
                    <div className="bg-yellow-400 col-span-2">
                        Grid Item Inside
                    </div>
                    <div className="bg-yellow-400 col-span-2">
                        Grid Item Inside
                    </div>
                </div>
                <div className="bg-red-400 col-span-3">Grid Item</div>
                <div className="bg-red-400 col-span-4">Grid Item</div>
            </div>
        );
        // return (
        //     <div className="h-screen grid grid-flow-col gap-x-4 gap-y-1 bg-slate-500">
        //         {/* {renderBlocks()} */}
        //         <div className="bg-red-400 col-span-2 grid grid-flow-row gap-y-3 gap-x-3">
        //             <div className="bg-yellow-400 col-span-4">
        //                 Grid Item Inside
        //             </div>
        //             <div className="bg-yellow-400 col-span-2">
        //                 Grid Item Inside
        //             </div>
        //             <div className="bg-yellow-400 col-span-2">
        //                 Grid Item Inside
        //             </div>
        //         </div>
        //         <div className="bg-red-400 col-span-3">Grid Item</div>
        //         <div className="bg-red-400 col-span-4">Grid Item</div>
        //     </div>
        // );
    };

    const blockWhyUs = useMemo(() => {
        return (
            <BlockWhyChooseUs
                className="mt-3 md:mt-5"
                blockData={BLOCK_WHY_CHOOSE_US}
            />
        );
    }, []);

    const blockBySteps = useMemo(() => {
        return (
            <BlockBoxByBox
                blockData={BLOCK_BOX_BY_BOX_STEPS}
                className="mt-5 container"
            />
        );
    }, []);

    const blockLatestNews = useMemo(() => {
        return (
            <BlockLatestNews
                blockData={BLOCK_ABOUT_LATEST_NEWS}
                className="py-20 px-3"
            />
        );
    }, []);

    return (
        <MainStyled
            id="home-page__container"
            className="home-page__container container bg-transparent min-h-screen z-10 relative text-white px-3 bg-red-400 "
        >
            {renderNewHeader()}
            {useMemo(() => {
                return (
                    <BlockPopularCountries
                        dataSource={filter(countryList, (item) =>
                            POPULAR_COUNTRIES.includes(item?.iso ?? "")
                        )}
                        className="mt-4"
                        label={Messages.popularDestinations}
                    />
                );
            }, [countryList])}
            {useMemo(() => {
                return (
                    <BlockSwiperSlide
                        className="mt-4 md:pt-10 md:mb-10 md:px-[10rem]"
                        swiperProps={{ pagination: true, slidesPerView: 1 }}
                    >
                        {map(HOME_PAGE_COVERS, (item, index) => {
                            const { title, subTitle } = item || {};
                            return (
                                <SwiperSlide
                                    className="rounded-2xl"
                                    key={`${item?.id}_${index}`}
                                >
                                    <div className="w-full bg-black grid grid-flow-row grid-cols-12 bg-gradient-to-r from-gold-trans dark:from-black rounded-3xl">
                                        <div className="home-page__block-slider-image-wrapper col-span-4 relative pb-[100%] rounded-2xl items-center">
                                            <Image
                                                useNextImg={false}
                                                alt="slider-homepage"
                                                src={item?.src}
                                                className="absolute w-full h-full rounded-l-2xl"
                                            />
                                        </div>
                                        <div className="col-span-8 my-auto pl-4">
                                            {subTitle && (
                                                <div className="text-white mb-2">
                                                    {subTitle}
                                                </div>
                                            )}
                                            <h5 className="text-white">
                                                {title}
                                            </h5>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </BlockSwiperSlide>
                );
            }, [])}
            {blockWhyUs}
            {blockBySteps}
            {blockLatestNews}
            {/* {renderGrids()} */}
            <div
                onClick={() =>
                    setOpenSelectCountry && setOpenSelectCountry(true)
                }
                className="logo-click-mask"
                id="logo-click-mask"
            />
        </MainStyled>
    );
};

export default HomePage;

const MainStyled = styled.main`
    position: relative;
    overflow-y: auto !important;
    .home-page__button-search {
        margin-bottom: 5px;
        i {
            font-size: 28px;
        }
        &:active,
        &:hover {
            background-color: transparent !important;
        }
    }
    .home-page__block-slider-image-wrapper {
        position: relative;
        /* &::after {
            content: "";
            position: absolute;
            right: -30px;
            top: 0;
            bottom: 0;
            left: 100px;
            pointer-events: none;
            height: 100%;
            opacity: 0.5;
            background-image: linear-gradient(
                to left,
                rgba(192, 157, 94, 0.25),
                rgba(255, 255, 255, 0)
            );
        } */
    }
    .logo-click-mask {
        position: absolute;
        width: 150px;
        height: 150px;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }
`;
