import React, { useMemo } from "react";
import ViewShowMore from "@/components/view/ViewShowMore";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { Button } from "d-react-components";
import Image from "next/image";
import { useRouter } from "next/router";
import Path from "@/common/constant/path";
import Square from "@/common/assets/svg/square.svg";
import { TAB_BOTTOM_HEIGHT } from "@/common/constant/app";
import { COLOR_GOLD, COLOR_GOLD_LIGHT } from "@/common/constant/app-style";
import Icon from "@/components/icon/Icon";
import AppLink from "@/components/link/AppLink";
import ClassNames from "classnames";
import SelectCurrency from "../items/SelectCurrency";

export interface IShowHideDesktopHeaderConfig {
    hideLogo?: boolean;
    hideMenuProfile?: boolean;
    hideSelectCurrency?: boolean;
    hideMenuHistory?: boolean;
    hideMenuHome?: boolean;
    hideListCountry?: boolean;
}

export const DESKTOP_HEADER_CURRENCY_CONFIG: IShowHideDesktopHeaderConfig = {
    hideMenuProfile: true,
    hideMenuHistory: true,
    hideMenuHome: true,
    hideListCountry: true,
    hideLogo: true,
};
export interface IDesktopHeaderProps {
    showHideConfig?: IShowHideDesktopHeaderConfig;
    [key: string]: any;
}

const ICON_SIZE = 28;
const LOGO_SIZE = 84;

const DesktopHeader: React.FC<IDesktopHeaderProps> = ({ showHideConfig }) => {
    const router = useRouter();
    const {
        hideLogo,
        hideMenuHistory,
        hideMenuHome,
        hideMenuProfile,
        hideSelectCurrency,
        hideListCountry,
    } = showHideConfig || {};
    const classItem = "py-3 rounded-full text-lg";
    const { pathname, query } = router || {};
    const activeClass = (isActive?: boolean) => {
        return ClassNames({
            "rounded-full bg- text-gold-light font-semibold": isActive,
        });
    };
    const iconClass = (isActive?: boolean) => {
        return ClassNames({
            "text-gold": !isActive,
            "text-gold-light": isActive,
        });
    };
    const isHome = pathname === Path.home().href;

    const renderMenus = useMemo(() => {
        return (
            <div className="flex-center-y pointer-events-auto gap-4">
                {!isHome && !hideListCountry ? (
                    <AppLink href={Path.listCountry().href}>
                        <div
                            className={`${activeClass(
                                pathname === Path.home().href
                            )}`}
                        >
                            <Icon
                                icon="search"
                                size={16}
                                className={` ${iconClass(
                                    pathname === Path.home().href
                                )}`}
                            />
                        </div>
                    </AppLink>
                ) : null}
                {hideMenuHome ? null : (
                    <AppLink href={Path.home()}>
                        <div
                            className={`ml-2 ${classItem} ${activeClass(
                                pathname === Path.home().href
                            )}`}
                        >
                            {Messages.home}
                        </div>
                    </AppLink>
                )}
                {hideMenuHistory ? null : (
                    <AppLink href={Path.esimsHistory()}>
                        <div
                            className={`${classItem} ${activeClass(
                                pathname === Path.esimsHistory().href
                            )}`}
                        >
                            {Messages.orderHistory}
                        </div>
                    </AppLink>
                )}
                <AppLink href={Path.blogs()}>
                    <div
                        className={`${classItem} ${activeClass(
                            pathname === Path.blogs().href
                        )}`}
                    >
                        {Messages.blogs}
                    </div>
                </AppLink>
                {/* <AppLink href={Path.landing()}>
                    <div
                        className={`${classItem} ${activeClass(
                            pathname === Path.landing().href
                        )}`}
                    >
                        {Messages.information}
                    </div>
                </AppLink> */}
                {hideSelectCurrency ? null : <SelectCurrency className="" />}

                {hideMenuProfile ? null : (
                    <AppLink href={Path.profile()}>
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
                    </AppLink>
                )}
            </div>
        );
    }, [pathname, isHome, showHideConfig]);

    const renderLogo = useMemo(() => {
        return (
            <AppLink href={Path.home()}>
                <div className="flex-center-y">
                    <Image
                        alt="logo"
                        src="/images/logo/logo.png"
                        style={{ objectFit: "cover" }}
                        width={LOGO_SIZE}
                        height={LOGO_SIZE}
                    />
                    {/* <h4 className="text-white  font-semibold ml-3">
                        Pirate <span className="text-gold">Mobile</span>
                    </h4> */}
                </div>
            </AppLink>
        );
    }, []);

    return (
        <section className="display-none md:flex container flex-row justify-between items-center px-3 pt-4 z-20">
            {!hideLogo ? renderLogo : null}
            {renderMenus}
        </section>
    );
};

export default DesktopHeader;
