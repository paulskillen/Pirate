import ClassNames from "classnames";
import { Button } from "d-react-components";
import { useRouter } from "next/router";
import React from "react";

export interface ILayoutHeaderProps {
    onBackClick?: () => any;
    title?: string;
    renderRight?: () => any;
    bgColor?: "primary" | "transparent";
    textColor?: "white" | "black";
}

const LayoutHeader: React.FC<ILayoutHeaderProps> = ({
    onBackClick,
    title,
    renderRight,
    bgColor = "transparent",
    textColor = "white",
}) => {
    const router = useRouter();
    return (
        <div
            className={`flex flex-row items-center justify-between py-2 px-4  rounded-b-3xl w-full bg-${bgColor} text-${textColor} ${ClassNames()}`}
        >
            <Button
                onClick={() => (onBackClick ? onBackClick() : router.back())}
                variant="trans"
                iconName="arrow_back_ios_new"
                className="px-0"
                color={textColor as any}
            />
            <h5 className={`font-semibold text-${textColor}`}>{title}</h5>
            {renderRight ? renderRight() : <div />}
        </div>
    );
};

export default LayoutHeader;
