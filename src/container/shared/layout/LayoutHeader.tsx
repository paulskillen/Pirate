import Path from "@/common/constant/path";
import { Button } from "d-react-components";
import { useRouter } from "next/router";
import React from "react";

export interface ILayoutHeaderProps {
    onBackClick?: () => any;
    title?: string;
    renderRight?: () => any;
}

const LayoutHeader: React.FC<ILayoutHeaderProps> = ({
    onBackClick,
    title,
    renderRight,
}) => {
    const router = useRouter();
    return (
        <div className="flex flex-row items-center justify-between py-2 px-4  rounded-b-3xl w-full">
            <Button
                onClick={() => (onBackClick ? onBackClick() : router.back())}
                variant="trans"
                iconName="arrow_back_ios_new"
                className="px-0"
                color="light"
            />
            <h5 className="font-semibold text-white">{title}</h5>
            {renderRight ? renderRight() : <div />}
        </div>
    );
};

export default LayoutHeader;
