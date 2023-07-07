import React, { useMemo } from "react";
import ClassNames from "classnames";
import IcoMoon, { IconProps as IcoMoonProps } from "react-icomoon";
import bootstrap from "./collection/bootstrap.json";
import elegant from "./collection/elegant.json";
import carbon from "./collection/carbon.json";
import googleMaterial from "./collection/google-material.json";

export interface IconProps extends IcoMoonProps {
    useIconSet?: "bootstrap" | "elegant" | "carbon" | "google-material";
}

const Icon = ({
    size = 20,
    className,
    useIconSet = "bootstrap",
    color,
    style = {},
    ...props
}: IconProps) => {
    const getSet = useMemo(() => {
        switch (useIconSet) {
            case "elegant":
                return elegant;
            case "google-material":
                return googleMaterial;
            case "carbon":
                return carbon;

            default:
                return bootstrap;
        }
    }, [useIconSet]);
    return (
        <IcoMoon
            iconSet={getSet as any}
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
