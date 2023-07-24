/* eslint-disable react/no-unescaped-entities */
// @ts-ignore
import Path from "@/common/constant/path";
import { AppStateContext } from "@/common/context/app/app-context";
import { CountryRegion, REGIONS } from "@/common/interface/location";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { Button } from "d-react-components";
import { isEmpty, map } from "lodash";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import SelectCountry from "../shared/input/SelectCountry";

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
    const { metaData } = useContext(AppStateContext);
    const { countryByRegion } = metaData || {};

    useEffect(() => {
        document &&
            document?.getElementById &&
            document
                .getElementById("select__dropdown-pirate-mobile")
                ?.addEventListener?.(
                    "touchstart",
                    function (ev: any) {
                        //@ts-ignore
                        const e = document.getElementById?.(
                            "select__dropdown-pirate-mobile"
                        );
                        if (e) {
                            Object.assign(e, { innerHTML: ev?.target?.id });
                            ev?.preventDefault?.();
                            Object.assign(ev, { bubbles: false });
                        }
                    },
                    { passive: true }
                );
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
            <div className="h-screen grid grid-flow-col gap-x-4 gap-y-1 bg-slate-500">
                {/* {renderBlocks()} */}
                <div className="bg-red-400 col-span-2 grid grid-flow-row gap-y-3 gap-x-3">
                    <div className="bg-yellow-400 col-span-4">
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
    };

    return (
        <MainStyled className="home-page__container container bg-transparent z-10 relative text-white px-3 ">
            {renderNewHeader()}
            {/* <div className="h-screen overflow-y-scroll hide-scroll-bar-y">
                <div className="h-52" />
            </div> */}
            {/* {renderGrids()} */}
        </MainStyled>
    );
};

export default HomePage;

const MainStyled = styled.main`
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
`;
