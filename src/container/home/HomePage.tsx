/* eslint-disable react/no-unescaped-entities */
import Path from "@/common/constant/path";
import { AppStateContext } from "@/common/context/app/app-context";
import { CountryRegion, REGIONS } from "@/common/interface/location";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { Button } from "d-react-components";
import { isEmpty, map } from "lodash";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import BlockCountryByRegion from "../shared/block/BlockCountryByRegion";

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

    const renderHeader = () => {
        return (
            <section
                className="flex flex-row justify-between items-center mt-2"
                onClick={() => {
                    router.push({ pathname: Path.listCountry().href });
                }}
            >
                <div className="flex-center-y py-4">
                    {/* <Image
                        alt="logo"
                        src="/images/logo/logo.png"
                        // layout="fill"
                        style={{ objectFit: "cover" }}
                        width={50}
                        height={50}
                    /> */}
                    <div className="text-gold  h4  font-semibold ml-3">
                        {Messages.selectDestination}
                    </div>
                </div>
                <div className="flex-center-y w-">
                    {/* <div className="text-xl text-gold font-semibold w-100 text-end mb-2">
                        {Messages.selectDestination}
                    </div> */}
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

    const renderBlocks = () => {
        if (isEmpty(countryByRegion)) {
            return null;
        }
        return (
            <div>
                {map(REGIONS, (item, key) => {
                    const { id, label } = item || {};
                    const isDisplay = HOME_PAGE_DISPLAY_REGIONS.includes(
                        id as any
                    );
                    if (!isDisplay) {
                        return null;
                    }
                    return <BlockCountryByRegion region={id} />;
                })}
            </div>
        );
    };

    return (
        <MainStyled className="home-page__container container bg-transparent z-10 relative text-white px-3 ">
            {renderHeader()}
            <div className="h-screen overflow-y-scroll hide-scroll-bar-y">
                {renderBlocks()}
                <div className="h-52" />
            </div>
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
