import React from "react";
import Slick, { Settings } from "react-slick";

export interface ISlickSliderProps {
    setting?: Settings;
    className?: string;
    children?: any;
}

const SlickSlider: React.FC<ISlickSliderProps> = ({
    setting = {},
    className,
    children,
}) => {
    return (
        <Slick {...setting} className={`c-slick-slider ${className}`}>
            {children}
        </Slick>
    );
};

export default SlickSlider;
