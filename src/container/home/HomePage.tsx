/* eslint-disable react/no-unescaped-entities */
// @ts-ignore
import Path from "@/common/constant/path";
import { AppStateContext } from "@/common/context/app/app-context";
import { CountryRegion } from "@/common/interface/location";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { Button } from "d-react-components";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import SelectCountry from "../shared/input/SelectCountry";
import { IDS_OPEN_SELECT_COUNTRY } from "@/common/constant/app";
import DesktopHeader from "../shared/header/DesktopHeader";

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

const HomePage: React.FC<IHomePageProps> = ({ id }) => {
    const router = useRouter();
    const { metaData, setOpenSelectCountry } = useContext(AppStateContext);
    const { countryByRegion } = metaData || {};

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

    useEffect(() => {
        // function handleOnTouchMove(e: any) {
        //     const eventTargetId: any = e?.target?.id;
        //     if (eventTargetId == "home-page__container") {
        //         e?.preventDefault?.();
        //     }
        // }
        // document.addEventListener("touchmove", handleOnTouchMove as any);
        // return () =>
        //     document.removeEventListener("touchmove", handleOnTouchMove as any);
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

    return (
        <MainStyled
            id="home-page__container"
            className="home-page__container container bg-transparent h-screen z-10 relative text-white px-3 bg-red-400 "
        >
            {renderNewHeader()}
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
    .home-page__slider-image-wrapper {
        padding-bottom: 67%;
        position: relative;
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
