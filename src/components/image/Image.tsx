/* eslint-disable @next/next/no-img-element */
import React from "react";
import ClassNames from "classnames";
import ImageNext, { ImageProps } from "next/image";

export interface IImageProps {
    nextImageProps?: ImageProps;
    src: string;
    alt?: string;
    useNextImg?: boolean;
    className?: string;
}

const Image: React.FC<IImageProps> = (props) => {
    const {
        nextImageProps = {},
        src,
        alt = "",
        useNextImg = true,
        className,
    } = props;
    const imgClass = ClassNames("w-24 h-auto", {}, className);
    if (!useNextImg) {
        return <img {...props} alt={alt} className={imgClass} />;
    }
    return (
        <ImageNext
            {...nextImageProps}
            src={src}
            alt={alt}
            className={imgClass}
            width={24}
            height={24}
        />
    );
};

export default Image;
