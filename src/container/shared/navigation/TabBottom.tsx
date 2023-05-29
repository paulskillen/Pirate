import { TAB_BOTTOM_HEIGHT } from "@/common/constant/app";
import ClassNames from "classnames";
import Icon from "@/components/icon/Icon";
import AppLink from "@/components/link/AppLink";
import { useRouter } from "next/router";
import React from "react";
import Path from "../../../common/constant/path";

export interface ITabBottomProps {
    [key: string]: any;
}

const ICON_SIZE = 28;

const TabBottom: React.FC<ITabBottomProps> = ({ id }) => {
    const classItem = "p-3 rounded-full";
    const router = useRouter();
    const { pathname, query } = router || {};
    const activeClass = (isActive?: boolean) => {
        return ClassNames({ "rounded-full bg-primary-dark": isActive });
    };
    const iconClass = (isActive?: boolean) => {
        return ClassNames({ "text-gold": !isActive, "text-white": isActive });
    };

    return (
        <div
            className="tab-bottom bg-primary  z-20 fixed flex items-center justify-center gap-x-16 -bottom-3 left-0 right-0 h-5 pb-3 rounded-tl-3xl rounded-tr-3xl pt-1 border-t-2 border-t-slate-500"
            style={{ height: `${TAB_BOTTOM_HEIGHT}px` }}
        >
            <AppLink href={Path.home()}>
                <div
                    className={`${classItem} ${activeClass(
                        pathname === Path.home().href
                    )}`}
                >
                    <Icon
                        icon="house"
                        size={ICON_SIZE}
                        className={`${iconClass(
                            pathname === Path.home().href
                        )}`}
                    />
                </div>
            </AppLink>
            <AppLink href={Path.esimsHistory()}>
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
            </AppLink>
            <AppLink href={Path.information()}>
                <div
                    className={`${classItem} ${activeClass(
                        pathname === Path.information().href
                    )}`}
                >
                    <Icon
                        icon="list-ul"
                        className={`${iconClass(
                            pathname === Path.information().href
                        )}`}
                        size={ICON_SIZE}
                    />
                </div>
            </AppLink>

            <AppLink href={Path.profile()}>
                <div
                    className={`${classItem} ${activeClass(
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
            </AppLink>
        </div>
    );
};

export default TabBottom;
