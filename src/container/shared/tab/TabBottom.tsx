import { TAB_BOTTOM_HEIGHT } from "@/common/constant/app";
import Icon from "@/components/icon/Icon";
import React from "react";

export interface ITabBottomProps {
    [key: string]: any;
}

const TabBottom: React.FC<ITabBottomProps> = ({ id }) => {
    return (
        <div
            className="tab-bottom bg-primary absolute flex items-center justify-center gap-x-24 -bottom-3 left-0 right-0 h-5 pb-3"
            style={{ height: `${TAB_BOTTOM_HEIGHT}px` }}
        >
            <div className="bg-gold p-2 rounded-full">
                <Icon icon="house" color="white" size={32} />
            </div>
            <Icon icon="sim" className="text-gold" size={36} />
            <Icon icon="person-circle" className="text-gold" size={36} />
        </div>
    );
};

export default TabBottom;
