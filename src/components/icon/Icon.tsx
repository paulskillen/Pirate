import React, { useMemo } from "react";
import IcoMoon, { IconProps as IcoMoonProps } from "react-icomoon";
import bootstrap from "./collection/bootstrap.json";
import elegant from "./collection/elegant.json";
import carbon from "./collection/carbon.json";
import ion from "./collection/ion.json";
import feather from "./collection/feather.json";
import fontisto from "./collection/fontisto.json";
import fluentUI from "./collection/fluent-ui.json";
import googleMaterial from "./collection/google-material.json";

declare const ICON_SET: readonly [
    "bootstrap",
    "elegant",
    "carbon",
    "google-material",
    "ion",
    "fontisto",
    "fluent-ui",
    "feather"
];

export interface IconProps extends IcoMoonProps {
    useIconSet?: (typeof ICON_SET)[number];
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
            case "ion":
                return ion;
            case "feather":
                return feather;
            case "fontisto":
                return fontisto;
            case "fluent-ui":
                return fluentUI;

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
