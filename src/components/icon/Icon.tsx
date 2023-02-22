import React from "react";
import ClassNames from "classnames";
import IcoMoon, { IconProps as IcoMoonProps } from "react-icomoon";
import iconSet from "./collection/bootstrap.json";
import iconSetElegant from "./collection/elegant.json";

export interface IconProps extends IcoMoonProps {}

const Icon = ({
    size = 24,
    className,
    color,
    style = {},
    ...props
}: IconProps) => {
    return (
        <IcoMoon
            iconSet={iconSet}
            {...props}
            size={size}
            color={color}
            className={className}
            removeInlineStyle
            style={{ stroke: "currentColor", fill: "currentColor", ...style }}
        />
    );
};

export default Icon;
