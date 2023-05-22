import Path from "@/common/constant/path";
import Slick, { Settings } from "react-slick";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { Button } from "d-react-components";
import { useRouter } from "next/router";
import React from "react";
import SlickSlider from "@/components/slider/SlickSlider";

export interface IHomePageProps {
    [key: string]: any;
}

const slickSettings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 2,
    slidesToScroll: 1,
};

const HOMEPAGE_BLOCK = [
    {
        id: "1",
        label: "High",
    },
    {
        id: "2",
        label: "Medium",
    },
    {
        id: "3",
        label: "Low",
    },
    {
        id: "4",
        label: "test",
    },
    {
        id: "5",
        label: "test-2",
    },
];

const HomePage: React.FC<IHomePageProps> = ({ id }) => {
    const router = useRouter();

    const renderContent = () => {
        return (
            <SlickSlider setting={slickSettings}>
                {HOMEPAGE_BLOCK.map((item) => {
                    return <div key={item?.id}>{item?.label}</div>;
                })}
            </SlickSlider>
        );
    };

    return (
        <MainStyled className="home-page_container bg-transparent z-10 relative text-white overflow-y-scroll px-4">
            <section className="flex flex-row justify-between items-center mt-4">
                <div className="text h4">{Messages.selectDestination}</div>
                <Button
                    iconName="search"
                    className="rounded px-3"
                    onClick={() => {
                        router.push({ pathname: Path.listCountry().href });
                    }}
                />
            </section>
            {/* {renderContent()} */}
        </MainStyled>
    );
};

export default HomePage;

const MainStyled = styled.main``;
