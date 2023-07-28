import styled from "@emotion/styled";
import ClassNames from "classnames";
import React, { useState } from "react";

export interface ITabSwitchItem {
    id: string;
    label: string;
    [key: string]: any;
}

export interface ITabSwitchProps {
    leftText?: string;
    rightText?: string;
    className?: string;
    onChange?: (v: ITabSwitchItem) => void;
    value?: ITabSwitchItem;
    dataSource: [ITabSwitchItem, ITabSwitchItem];
}

export type TabSwitchType = "left" | "right";
const height = "40px";

const TabSwitch: React.FC<ITabSwitchProps> = ({
    className,
    value,
    onChange,
    dataSource,
}) => {
    const tabClass = "w-full text-center m-auto z-10 text-base";
    const [left, right] = dataSource;
    const activeTab = left?.id === value?.id ? "left" : "right";

    return (
        <TabSwitchStyle
            className={`tab-switch flex justify-between relative border w-full border-gold rounded-full hover:cursor-pointer ${className}`}
        >
            <div
                className={ClassNames(tabClass, {
                    "active-text font-semibold": activeTab === "left",
                })}
                onClick={() => onChange && onChange(left)}
            >
                {left?.label}
            </div>
            <div
                className={ClassNames(tabClass, {
                    "active-text font-semibold": activeTab === "right",
                })}
                onClick={() => onChange && onChange(right)}
            >
                {right?.label}
            </div>
            <div
                className={`tab-switch__indicator tab-switch__indicator-${activeTab} bg-gold rounded-full `}
            />
        </TabSwitchStyle>
    );
};

export default TabSwitch;

const TabSwitchStyle = styled.div`
    height: ${height};
    background-color: black;
    width: 100% !important;
    .tab-switch__indicator {
        position: absolute;
        height: ${height};
        bottom: 0;
        width: 50%;
        transition: 0.1s all linear;
    }
    .tab-switch__indicator-left {
        left: 0;
    }
    .tab-switch__indicator-right {
        transform: translateX(100%);
    }
`;
