import React from "react";
import Slick, { Settings } from "react-slick";
import Icon from "../icon/Icon";
import styled from "@emotion/styled";

export interface ISlickSliderProps {
    setting?: Settings;
    className?: string;
    classNameContainer?: string;
    children?: any;
}

const SamplePrevArrow = (props: any) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="slick-slider__arrow slick-slider__arrow-left"
            type="button"
        >
            <Icon icon="arrow-left-circle" useIconSet="bootstrap" />
        </button>
    );
};

const SampleNextArrow = (props: any) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="slick-slider__arrow slick-slider__arrow-right"
            type="button"
        >
            <Icon icon="arrow-right-circle" useIconSet="bootstrap" />
        </button>
    );
};

const defaultSetting: Settings = {
    arrows: false,
    dots: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    lazyLoad: "ondemand",
};

const SlickSlider: React.FC<ISlickSliderProps> = ({
    setting = {},
    className,
    classNameContainer,
    children,
}) => {
    const slickSetting = { ...defaultSetting, ...setting };

    return (
        <SlickSliderStyled className={`relative w-full ${classNameContainer}`}>
            <Slick
                {...slickSetting}
                className={`c-slick-slider relative ${className}`}
            >
                {children}
            </Slick>
        </SlickSliderStyled>
    );
};

export default SlickSlider;

const SlickSliderStyled = styled.div`
    .slick-slider__arrow {
        position: absolute;
        z-index: 10;
    }
    .slick-slider__arrow-left {
        left: 0;
        top: 50%;
        opacity: 100% !important;
    }
    .slick-slider__arrow-right {
        right: 0;
        top: 50%;
        opacity: 100% !important;
    }
`;
