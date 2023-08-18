import Path from "@/common/constant/path";
import Icon from "@/components/icon/Icon";
import AppLink from "@/components/link/AppLink";
import ClassNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export interface IShowHideMobileHeaderConfig {
    hideLogo?: boolean;
    hideSearchIcon?: boolean;
}

export interface IMobileHeaderProps {
    className?: string;
    showHideConfig?: IShowHideMobileHeaderConfig;
    [key: string]: any;
}

const ICON_SIZE = 20;

const MobileHeader: React.FC<IMobileHeaderProps> = ({
    className,
    showHideConfig,
}) => {
    const router = useRouter();
    const { hideLogo, hideSearchIcon } = showHideConfig || {};
    const classItem = "p-2 rounded-full";
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

    return (
        <section
            className={`d-flex d-md-none container flex-row justify-between items-center px-3 pt-3 pb-3 z-20 ${className}`}
        >
            {!hideLogo && (
                <AppLink href={Path.home().href}>
                    <div className="flex-center-y">
                        <Image
                            alt="logo"
                            src="/images/logo/logo.png"
                            // layout="fill"
                            style={{ objectFit: "cover" }}
                            width={50}
                            height={50}
                        />
                        <div className="text-white  font-semibold ml-3">
                            Pirate <span className="text-gold">Mobile</span>
                        </div>
                    </div>
                </AppLink>
            )}
            {!hideSearchIcon && (
                <div className="flex-center-y pointer-events-auto">
                    <AppLink href={Path.listCountry().href}>
                        <div
                            className={`ml-2 ${classItem} ${activeClass(
                                pathname === Path.home().href
                            )}`}
                        >
                            <Icon
                                icon="search"
                                size={ICON_SIZE}
                                className={` ${iconClass(
                                    pathname === Path.home().href
                                )}`}
                            />
                        </div>
                    </AppLink>
                </div>
            )}
        </section>
    );
};

export default MobileHeader;
