import React from "react";
import Slick, { Settings } from "react-slick";

export interface ISlickSliderProps {
    setting?: Settings;
    className?: string;
    classNameContainer?: string;
    children?: any;
}

const defaultSetting: Settings = {
    arrows: false,
    dots: true,
};

const SlickSlider: React.FC<ISlickSliderProps> = ({
    setting = {},
    className,
    classNameContainer,
    children,
}) => {
    const slickSetting = { ...defaultSetting, ...setting };

    return (
        <div className={`relative w-full ${classNameContainer}`}>
            <Slick {...slickSetting} className={`c-slick-slider ${className}`}>
                {children}
            </Slick>
        </div>
    );
};

export default SlickSlider;
