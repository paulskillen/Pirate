import Square from "@/common/assets/svg/square.svg";
import { TAB_BOTTOM_HEIGHT } from "@/common/constant/app";
import { COLOR_GOLD, COLOR_GOLD_LIGHT } from "@/common/constant/app-style";
import Icon from "@/components/icon/Icon";
import AppLink from "@/components/link/AppLink";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import ClassNames from "classnames";
import { useRouter } from "next/router";
import React from "react";
import Path from "../../../common/constant/path";

export interface ITabBottomProps {
    [key: string]: any;
}

export interface ITabBottomItemProps {
    icon?: string;
    link?: string;
}

const ICON_SIZE = 24;

const TabBottom: React.FC<ITabBottomProps> = ({ id }) => {
    const classItem = "p-3 rounded-full";
    const classWrapper = "flex flex-col items-center";
    const router = useRouter();
    const { pathname, query } = router || {};
    const activeClass = (isActive?: boolean) => {
        return ClassNames({ "rounded-full bg-darken": isActive });
    };
    const iconClass = (isActive?: boolean) => {
        return ClassNames({
            "text-gold": !isActive,
            "text-gold-light": isActive,
        });
    };

    const textClass = "small ml-2 mb-2";

    return (
        <div
            className="tab-bottom backdrop-blur-sm bg-black bg-opacity-70  z-20 fixed flex items-center justify-between md:justify-center md:gap-32 gap-8 -bottom-3 left-0 right-0 h-5 pb-3 rounded-tl-3xl rounded-tr-3xl pt-3 border-t border-t-gold"
            style={{ height: `${TAB_BOTTOM_HEIGHT}px` }}
        >
            <AppLink className={classWrapper} href={Path.home()}>
                <div
                    className={`ml-2 ${classItem} ${activeClass(
                        pathname === Path.home().href
                    )}`}
                >
                    <Icon
                        icon="house"
                        size={ICON_SIZE}
                        className={` ${iconClass(
                            pathname === Path.home().href
                        )}`}
                    />
                </div>
                <div className={`${textClass} ml-2`}>{Messages.home}</div>
            </AppLink>
            <AppLink className={classWrapper} href={Path.esimsHistory()}>
                <div
                    className={`${classItem} ${activeClass(
                        pathname === Path.esimsHistory().href
                    )}`}
                >
                    <Icon
                        icon="sim"
                        className={`${iconClass(
                            pathname === Path.esimsHistory().href
                        )}`}
                        size={ICON_SIZE}
                    />
                </div>
                <div className={textClass}>{Messages.yourEsim}</div>
            </AppLink>
            <AppLink className={classWrapper} href={Path.landing()}>
                <div
                    className={`${classItem} ${activeClass(
                        pathname === Path.landing().href
                    )}`}
                >
                    <Square
                        fill={
                            pathname === Path.landing().href
                                ? COLOR_GOLD_LIGHT
                                : COLOR_GOLD
                        }
                        width={ICON_SIZE}
                        height={ICON_SIZE}
                    />
                </div>
                <div className={textClass}>{Messages.information}</div>
            </AppLink>

            <AppLink className={classWrapper} href={Path.profile()}>
                <div
                    className={`mr-2 ${classItem} ${activeClass(
                        pathname === Path.profile().href
                    )}`}
                >
                    <Icon
                        icon="person-circle"
                        className={`${iconClass(
                            pathname === Path.profile().href
                        )}`}
                        size={ICON_SIZE}
                    />
                </div>
                <div className={`${textClass} mr-2`}>{Messages.profile}</div>
            </AppLink>
        </div>
    );
};

export default TabBottom;

const TabBottomItem: React.FC<ITabBottomProps> = ({ id }) => {
    return (
        <AppLink>
            <TabBottomItemStyled></TabBottomItemStyled>
        </AppLink>
    );
};

const TabBottomItemStyled = styled.div``;
