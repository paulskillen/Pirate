/* eslint-disable @next/next/no-img-element */
import React, { ImgHTMLAttributes } from "react";
import ClassNames from "classnames";
import ImageNext, { ImageProps } from "next/image";

export interface IImageProps extends ImgHTMLAttributes<any> {
    nextImageProps?: Partial<ImageProps>;
    src: string;
    alt?: string;
    useNextImg?: boolean;
    className?: string;
}

const Image: React.FC<IImageProps> = (props) => {
    const {
        nextImageProps = {},
        src,
        alt = "img_default",
        useNextImg = true,
        className,
    } = props;
    const imgClass = ClassNames({}, className);
    if (!useNextImg) {
        return <img {...props} alt={alt} className={imgClass} />;
    }
    return (
        <ImageNext
            width={20}
            height={20}
            {...nextImageProps}
            src={src}
            alt={alt}
            className={imgClass}
        />
    );
};

export default Image;
